import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {


  await prisma.$executeRaw`
INSERT INTO Livro (title, author, available) VALUES
    ('O Segredo do Tempo', 'Fernanda Lima', true),
    ('A Jornada do Vento', 'Rafael Costa', true),
    ('Mistérios do Universo', 'Clara Albuquerque', false),
    ('Códigos e Algoritmos', 'Bruno Machado', true)
  `;

  console.log("Dados inseridos com sucesso!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
