import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Doe",
      email: "jane.doe@example.com",
    },
  });

  console.log("User berhasil ditambahkan!");

const position1 = await prisma.position.create({
  data: {
    title: "Software Engineer",
    description: "Mengembangkan aplikasi web",
  },
});

const position2 = await prisma.position.create({
  data: {
    title: "Product Manager",
    description: "Mengelola produk dan roadmap",
  },
});

console.log("Position berhasil ditambahkan!");

// 3. Tambah UserPosition Dummy
await prisma.userPosition.createMany({
  data: [
    {
      userId: user1.id,
      positionId: position1.id,
      startDate: new Date("2024-01-01"),
    },
    {
      userId: user2.id,
      positionId: position2.id,
      startDate: new Date("2024-02-01"),
    },
  ],
});

console.log("UserPosition berhasil ditambahkan!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });