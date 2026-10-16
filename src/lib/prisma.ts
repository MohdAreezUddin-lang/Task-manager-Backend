import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

// Adapter forms a connection between neon and prisma 
const adapter = new PrismaNeon({
  connectionString : process.env.DATABASE_URL!
});

const prisma = new PrismaClient({ adapter});

export default prisma;
