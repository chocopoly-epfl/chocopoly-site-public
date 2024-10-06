/*
 * === Prisma Client ===
 * This spawns a prisma client singleton. i.e. a single prisma client is utilised for all database operations.
 * The reason for choosing such a pattern is because NextJS, in Dev mode, has a tendency to create new instances of the client at every refresh. Eventually you will hit the limit for the number of concurrent database connections you are allowed to have.
 * Not sure this apply to sveltekit, but can't harm 
*/
import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

prisma = new PrismaClient();

export default prisma;
