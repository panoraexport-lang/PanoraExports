import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Product updates with origin states and size/grading variants
const productUpdates = [
  // Agriculture Products
  {
    name: 'Garlic - Graded and Large Size',
    newName: 'Garlic',
    originState: 'Gujarat',
    variants: [
      { size: '40mm+', price: '140', unit: 'kg', description: 'Jumbo Grade' },
      { size: '35-40mm', price: '125', unit: 'kg', description: 'Large Grade' },
      { size: '30-35mm', price: '110', unit: 'kg', description: 'Medium Grade' },
    ],
  },
  {
    name: 'Banana - Graded and Large Size',
    newName: 'Banana',
    originState: 'Tamil Nadu',
    variants: [
      { size: 'A++ (23cm+)', price: '85', unit: 'box', description: 'Premium Export Quality' },
      { size: 'A+ (20-23cm)', price: '70', unit: 'box', description: 'Grade A' },
      { size: 'A (17-20cm)', price: '55', unit: 'box', description: 'Standard Grade' },
    ],
  },
  {
    name: 'Pomegranate - Graded and Large Size',
    newName: 'Pomegranate',
    originState: 'Maharashtra',
    variants: [
      { size: 'A++ (500g+)', price: '180', unit: 'box', description: 'Super Premium' },
      { size: 'A+ (400-500g)', price: '155', unit: 'box', description: 'Premium Grade' },
      { size: 'A (300-400g)', price: '130', unit: 'box', description: 'Standard Grade' },
    ],
  },
  {
    name: 'Papaya- Graded and Large Size',
    newName: 'Papaya',
    originState: 'Karnataka',
    variants: [
      { size: 'A+ (2kg+)', price: '95', unit: 'box', description: 'Large Premium' },
      { size: 'A (1.5-2kg)', price: '80', unit: 'box', description: 'Medium Grade' },
      { size: 'B (1-1.5kg)', price: '65', unit: 'box', description: 'Small Grade' },
    ],
  },
  {
    name: 'Tomato- Graded and Large Size',
    newName: 'Tomato',
    originState: 'Andhra Pradesh',
    variants: [
      { size: 'A++ (Hybrid)', price: '120', unit: 'box', description: 'Premium Hybrid' },
      { size: 'A+ (Deshi)', price: '95', unit: 'box', description: 'Local Premium' },
      { size: 'A (Regular)', price: '75', unit: 'box', description: 'Standard Quality' },
    ],
  },
  // Textiles Products
  {
    name: 'Bedsheet ',
    newName: 'Premium Cotton Bedsheet',
    originState: 'Chandigarh',
    variants: [
      { size: 'King (108"x108")', price: '450', unit: 'piece', description: 'Premium Cotton' },
      { size: 'Queen (90"x102")', price: '380', unit: 'piece', description: 'Standard Cotton' },
      { size: 'Single (72"x102")', price: '280', unit: 'piece', description: 'Economy' },
    ],
  },
  {
    name: 'Curtains',
    originState: 'Chandigarh',
    variants: [
      { size: '9ft (Blackout)', price: '850', unit: 'pair', description: 'Premium Blackout' },
      { size: '7ft (Semi-Blackout)', price: '650', unit: 'pair', description: 'Medium Grade' },
      { size: '6ft (Sheer)', price: '450', unit: 'pair', description: 'Light Filter' },
    ],
  },
  {
    name: 'Towels',
    originState: 'Chandigarh',
    variants: [
      { size: 'Cat 1 (500 GSM)', price: '0', unit: 'piece', description: '70 x 140cm - Premium Export' },
      { size: 'Cat 2 (600 GSM)', price: '0', unit: 'piece', description: '70 x 140cm - Luxury Grade' },
      { size: 'Cat 3 (700 GSM)', price: '0', unit: 'piece', description: '70 x 140cm - Hotel Institutional Grade' },
    ],
  },
];

async function updateProducts() {
  console.log('🔄 Starting product updates...\n');

  for (const update of productUpdates) {
    try {
      // Find product by name (case insensitive)
      const product = await prisma.product.findFirst({
        where: {
          name: {
            equals: update.name,
            mode: 'insensitive',
          },
        },
      });

      if (product) {
        await prisma.product.update({
          where: { id: product.id },
          data: {
            name: (update as any).newName || update.name,
            originState: update.originState,
            variants: update.variants,
          },
        });
        const finalName = (update as any).newName || update.name;
        console.log(`✅ Updated: ${update.name} -> ${finalName} - Origin: ${update.originState}, ${update.variants.length} variants`);
      } else {
        console.log(`⚠️  Not found: ${update.name}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${update.name}:`, error);
    }
  }

  console.log('\n✅ Product updates completed!');
  await prisma.$disconnect();
}

updateProducts().catch((e) => {
  console.error(e);
  process.exit(1);
});
