import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface VerificationResult {
    verified: boolean;
    country: string;
    businessName?: string;
    verificationType: string;
    reason?: string;
    note?: string;
    nextStep?: string;
    error?: string;
}

@Injectable()
export class VerificationService {
    private readonly logger = new Logger(VerificationService.name);

    constructor(private readonly httpService: HttpService) { }

    /**
     * Main verification endpoint
     */
    async verifyBusiness(country: string, businessId: string): Promise<VerificationResult> {
        if (!country || !businessId) {
            return {
                verified: false,
                country: country || 'Unknown',
                verificationType: 'Unknown',
                reason: 'country and businessId required',
            };
        }

        try {
            let result: VerificationResult;

            switch (country.toUpperCase()) {
                case 'INDIA':
                    result = await this.verifyGST(businessId);
                    break;

                case 'GERMANY':
                case 'FRANCE':
                case 'ITALY':
                case 'SPAIN':
                case 'NETHERLANDS':
                case 'POLAND':
                case 'BELGIUM':
                case 'AUSTRIA':
                case 'EU':
                    result = await this.verifyEUVAT(businessId);
                    break;

                case 'USA':
                    result = await this.verifyEIN(businessId);
                    break;

                case 'UK':
                case 'UNITED KINGDOM':
                    result = await this.verifyUKCompany(businessId);
                    break;

                case 'UAE':
                case 'UNITED ARAB EMIRATES':
                    result = await this.verifyUAE(businessId);
                    break;

                case 'CANADA':
                    result = await this.verifyCanadaBN(businessId);
                    break;

                case 'AUSTRALIA':
                    result = await this.verifyAustraliaABN(businessId);
                    break;

                default:
                    result = await this.manualVerification(country);
            }

            this.logger.log(`Verification for ${country}: ${result.verified ? 'SUCCESS' : 'FAILED'}`);
            return result;
        } catch (err) {
            this.logger.error(`Verification error for ${country}:`, err);
            return {
                verified: false,
                country,
                verificationType: 'Error',
                error: err.message,
            };
        }
    }

    /**
     * INDIA – GST (FORMAT + MOCK)
     * Real API requires paid provider like MasterGST or GST API
     */
    private async verifyGST(gstin: string): Promise<VerificationResult> {
        // Sanitize: Remove all non-alphanumeric, uppercase
        const cleanGST = gstin.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

        if (!gstRegex.test(cleanGST)) {
            return {
                verified: false,
                country: 'India',
                verificationType: 'GST',
                reason: 'Invalid GST format. Expected format: 22AAAAA0000A1Z5',
            };
        }

        // 🔹 Real API integration would go here
        // For MVP, we simulate success for valid format
        return {
            verified: true,
            country: 'India',
            businessName: `Business ${cleanGST.substring(2, 7)}`,
            verificationType: 'GST',
            note: 'Format validated. Full verification requires GST API integration.',
        };
    }

    /**
     * EU – REAL VAT VERIFICATION (FREE)
     * Uses official EU VIES API
     */
    private async verifyEUVAT(vat: string): Promise<VerificationResult> {
        try {
            const cleanVAT = vat.replace(/[^A-Z0-9]/gi, '').toUpperCase();

            // Extract country code and number
            const countryCode = cleanVAT.slice(0, 2);
            const number = cleanVAT.slice(2);

            // Validate EU country codes
            const validEUCodes = ['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'];

            if (!validEUCodes.includes(countryCode)) {
                return {
                    verified: false,
                    country: 'EU',
                    verificationType: 'VAT',
                    reason: 'Invalid EU country code',
                };
            }

            const url = `https://ec.europa.eu/taxation_customs/vies/rest-api/ms/${countryCode}/vat/${number}`;

            const response = await firstValueFrom(
                this.httpService.get(url, { timeout: 5000 })
            );

            const data = response.data;

            return {
                verified: data.isValid || false,
                country: 'EU',
                businessName: data.name || null,
                verificationType: 'VAT',
                note: data.isValid ? 'Verified via EU VIES system' : 'Not found in EU VIES system',
            };
        } catch (error) {
            this.logger.error('EU VAT verification error:', error.message);
            return {
                verified: false,
                country: 'EU',
                verificationType: 'VAT',
                reason: 'Unable to verify with EU VIES system. Please try again later.',
                error: error.message,
            };
        }
    }

    /**
     * USA – EIN (FORMAT CHECK)
     * Real verification requires IRS API or paid service
     */
    private verifyEIN(ein: string): Promise<VerificationResult> {
        // Sanitize: Digits only
        const cleanEIN = ein.replace(/[^0-9]/g, '');
        const isValid = cleanEIN.length === 9;

        return Promise.resolve({
            verified: isValid,
            country: 'USA',
            verificationType: 'EIN',
            note: 'Format validation only. Expected format: 9 digits',
            reason: !isValid ? 'Invalid EIN format (must be 9 digits)' : undefined,
        });
    }

    /**
     * UK – Company Number (FORMAT)
     * Real verification available via Companies House API (free)
     */
    private verifyUKCompany(number: string): Promise<VerificationResult> {
        const cleanNumber = number.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        // UK Company numbers are 8 chars (alphanumeric)
        const ukRegex = /^[A-Z0-9]{8}$/;

        return Promise.resolve({
            verified: ukRegex.test(cleanNumber),
            country: 'UK',
            verificationType: 'Company Number',
            note: 'Format validation only. Expected format: 8 alphanumeric characters',
            reason: !ukRegex.test(cleanNumber) ? 'Invalid UK Company Number format' : undefined,
        });
    }

    /**
     * UAE – Trade License (FORMAT)
     */
    private verifyUAE(license: string): Promise<VerificationResult> {
        const cleanLicense = license.replace(/[^0-9]/g, '');
        const isValid = cleanLicense.length >= 6;

        return Promise.resolve({
            verified: isValid,
            country: 'UAE',
            verificationType: 'Trade License',
            note: 'Manual or document-based verification required',
            reason: !isValid ? 'Invalid Trade License format. Must be at least 6 digits' : undefined,
        });
    }

    /**
     * CANADA – Business Number (FORMAT)
     */
    private verifyCanadaBN(bn: string): Promise<VerificationResult> {
        const cleanBN = bn.replace(/[^0-9]/g, '');
        const isValid = cleanBN.length === 9;

        return Promise.resolve({
            verified: isValid,
            country: 'Canada',
            verificationType: 'Business Number',
            note: 'Format validation only. Expected format: 9 digits',
            reason: !isValid ? 'Invalid Business Number format' : undefined,
        });
    }

    /**
     * AUSTRALIA – ABN (FORMAT + CHECKSUM)
     */
    private verifyAustraliaABN(abn: string): Promise<VerificationResult> {
        // Remove spaces and validate format
        const cleanABN = abn.replace(/[^0-9]/g, '');
        const abnRegex = /^\d{11}$/;

        if (!abnRegex.test(cleanABN)) {
            return Promise.resolve({
                verified: false,
                country: 'Australia',
                verificationType: 'ABN',
                reason: 'Invalid ABN format. Expected format: 11 digits',
            });
        }

        // Validate ABN checksum
        const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
        const digits = cleanABN.split('').map(Number);
        digits[0] -= 1; // Subtract 1 from first digit

        const sum = digits.reduce((acc, digit, index) => acc + digit * weights[index], 0);
        const isValid = sum % 89 === 0;

        return Promise.resolve({
            verified: isValid,
            country: 'Australia',
            verificationType: 'ABN',
            note: isValid ? 'ABN checksum validated' : 'ABN checksum validation failed',
            reason: !isValid ? 'Invalid ABN checksum' : undefined,
        });
    }

    /**
     * FALLBACK – MANUAL VERIFICATION
     */
    private manualVerification(country: string): Promise<VerificationResult> {
        return Promise.resolve({
            verified: false,
            country,
            verificationType: 'Manual',
            nextStep: 'Upload business registration document for manual review',
            note: 'Automated verification not available for this country',
        });
    }
}
