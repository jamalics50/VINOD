import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Seeding data...');

  // Create Mango category
  const mangoCategory = await prisma.category.create({
    data: {
      name: 'Mangoes',
      slug: 'mangoes',
      description: 'Fresh farm mangoes',
    },
  });

  // Create Pantry category
  const pantryCategory = await prisma.category.create({
    data: {
      name: 'Pantry',
      slug: 'pantry',
      description: 'Farm fresh pantry items',
    },
  });

  // Mango varieties
  const varieties = [
    { name: 'Sindhri Mango', slug: 'sindhri-mango', description: 'Sweet and large Sindhri mangoes.' },
    { name: 'Chaunsa Mango', slug: 'chaunsa-mango', description: 'Highly aromatic and sweet Chaunsa.' },
    { name: 'Anwar Ratol', slug: 'anwar-ratol', description: 'Small, sweet and intensely flavored Anwar Ratol.' },
    { name: 'Langra Mango', slug: 'langra-mango', description: 'Fiberless and sweet Langra.' },
  ];

  for (const variety of varieties) {
    const product = await prisma.product.create({
      data: {
        categoryId: mangoCategory.id,
        name: variety.name,
        slug: variety.slug,
        description: variety.description,
        images: [`/images/products/${variety.slug}.png`],
        isActive: true,
      },
    });

    // Create 2-3 box size variants for each mango variety
    await prisma.productVariant.createMany({
      data: [
        {
          productId: product.id,
          label: '5kg Box',
          priceInPkr: 2000,
          stockQuantity: 100,
          sku: `${variety.slug}-5kg`,
        },
        {
          productId: product.id,
          label: '10kg Box',
          priceInPkr: 3800,
          stockQuantity: 50,
          sku: `${variety.slug}-10kg`,
        },
      ],
    });
  }

  // Pantry starter products
  const pantryItems = [
    { name: 'Organic Honey', slug: 'organic-honey', description: 'Pure natural honey from our farm.' },
    { name: 'Desi Ghee', slug: 'desi-ghee', description: 'Authentic cow milk ghee.' },
    { name: 'Farm Fresh Jaggery (Gur)', slug: 'jaggery', description: 'Fresh sugarcane jaggery.' },
  ];

  for (const item of pantryItems) {
    const product = await prisma.product.create({
      data: {
        categoryId: pantryCategory.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        images: [`/images/products/${item.slug}.png`],
        isActive: true,
      },
    });

    await prisma.productVariant.create({
      data: {
        productId: product.id,
        label: '1kg Jar',
        priceInPkr: 1500,
        stockQuantity: 20,
        sku: `${item.slug}-1kg`,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
