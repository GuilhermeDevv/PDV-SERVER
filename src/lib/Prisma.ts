import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log("Conexão bem sucedida");
  } catch (err) {
    console.error("Falha na conexão", err);
  }
}

main();
