import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: "Message Sent Successfully",
            description: "We'll get back to you within 24 hours.",
            variant: "default",
        });

        form.reset();
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-background pt-20 font-sans antialiased text-primary">
            <Navigation />

            {/* Header */}
            <section className="py-20 bg-background border-b border-border relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-primary text-[9px] font-bold uppercase tracking-widest mb-8 border border-border rounded-sm"
                    >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Get in Touch
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter"
                    >
                        Contact <span className="font-serif italic font-light opacity-80">Us.</span>
                    </motion.h1>
                    <p className="text-primary/60 text-lg font-medium max-w-xl mx-auto">
                        Have a question about sourcing or need a custom quote? Our team is ready to help you navigate global trade.
                    </p>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2">
                {/* Contact Info */}
                <div className="bg-secondary/30 p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-border">
                    <h2 className="text-2xl font-bold text-primary mb-12 uppercase tracking-tight">Contact Information</h2>

                    <div className="space-y-12">
                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-sm shrink-0 group-hover:border-primary/50 transition-colors">
                                <MapPin className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Global Headquarters</h3>
                                <p className="text-primary/70 font-medium leading-relaxed">
                                    1204, Trade Centre Towers<br />
                                    Bandra Kurla Complex<br />
                                    Mumbai, MH 400051, India
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-sm shrink-0 group-hover:border-primary/50 transition-colors">
                                <Mail className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Email Us</h3>
                                <a href="mailto:export@panora.global" className="text-primary/70 font-medium hover:text-primary transition-colors">export@panora.global</a>
                                <br />
                                <a href="mailto:support@panora.global" className="text-primary/70 font-medium hover:text-primary transition-colors">support@panora.global</a>
                            </div>
                        </div>

                        <div className="flex gap-6 group">
                            <div className="w-12 h-12 bg-background border border-border flex items-center justify-center rounded-sm shrink-0 group-hover:border-primary/50 transition-colors">
                                <Phone className="w-5 h-5 text-primary" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Call Us</h3>
                                <p className="text-primary/70 font-medium">+91 22 4567 8900 (Mon-Fri)</p>
                                <p className="text-primary/70 font-medium text-sm mt-1 text-muted-foreground flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" /> 9:00 AM - 6:00 PM IST
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 pt-12 border-t border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe className="w-4 h-4 text-primary" />
                            <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest">Global Offices</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-background border border-border rounded-sm">
                                <p className="font-bold text-primary text-sm mb-1">Dubai, UAE</p>
                                <p className="text-[10px] text-primary/50 uppercase tracking-wider font-bold">Middle East Hub</p>
                            </div>
                            <div className="p-4 bg-background border border-border rounded-sm">
                                <p className="font-bold text-primary text-sm mb-1">London, UK</p>
                                <p className="text-[10px] text-primary/50 uppercase tracking-wider font-bold">European Sales</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-12 lg:p-20 bg-background">
                    <h2 className="text-2xl font-bold text-primary mb-2 uppercase tracking-tight">Send a Message</h2>
                    <p className="text-primary/60 mb-12 font-medium">Fill out the form below and we'll route your inquiry to the relevant department.</p>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Name</label>
                                <input
                                    {...form.register('name')}
                                    className="w-full bg-secondary/30 border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="John Doe"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-destructive text-xs font-medium">{form.formState.errors.name.message}</p>
                                )}
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Email</label>
                                <input
                                    {...form.register('email')}
                                    className="w-full bg-secondary/30 border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                    placeholder="john@company.com"
                                />
                                {form.formState.errors.email && (
                                    <p className="text-destructive text-xs font-medium">{form.formState.errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Subject</label>
                            <input
                                {...form.register('subject')}
                                className="w-full bg-secondary/30 border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 text-primary font-medium"
                                placeholder="Inquiry about..."
                            />
                            {form.formState.errors.subject && (
                                <p className="text-destructive text-xs font-medium">{form.formState.errors.subject.message}</p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Message</label>
                            <textarea
                                {...form.register('message')}
                                className="w-full bg-secondary/30 border-b border-primary/20 focus:border-primary px-0 py-3 outline-none transition-all placeholder:text-primary/20 min-h-[150px] resize-y text-primary font-medium"
                                placeholder="Tell us about your requirements..."
                            />
                            {form.formState.errors.message && (
                                <p className="text-destructive text-xs font-medium">{form.formState.errors.message.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-primary-foreground py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-3 rounded-sm mt-6"
                        >
                            {isSubmitting ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : (
                                <>
                                    Send Message <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
