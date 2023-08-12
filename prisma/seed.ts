import { prisma } from "../src/server/db";

async function main() {
  await prisma.expenseCategory.create({ data: { name: "Clothes" } });
  await prisma.expenseCategory.create({ data: { name: "Company" } });
  await prisma.expenseCategory.create({ data: { name: "Eletronics" } });
  await prisma.expenseCategory.create({ data: { name: "Food" } });
  await prisma.expenseCategory.create({ data: { name: "Games" } });
  await prisma.expenseCategory.create({ data: { name: "Travel" } });
  await prisma.expenseCategory.create({ data: { name: "Streaming" } });
  await prisma.expenseCategory.create({ data: { name: "Transport" } });

  await prisma.expenseType.create({ data: { name: "Fixed" } });
  await prisma.expenseType.create({ data: { name: "Variable" } });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
