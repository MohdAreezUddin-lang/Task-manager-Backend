import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const task = await prisma.task.create({
    data: {
      title: "Learn Prisma",
    },
  });

  console.log("Task created:", task);

  const tasks = await prisma.task.findMany();
  console.log("All tasks:", tasks);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });