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

// Tambah Gedung
const location = await prisma.location.create({
  data: {
    name: "Gedung A",
    description: "Gedung utama",
    position: {
      create: { latitude: "", longitude: ""}
    },
    floors: {
      create: [
        {
          name: "Lantai 1",
          cameras: {
            create: [
              { name: "Kamera 1A", location: { create : { x: "0", y: "0", width: "0", height: "0" }} },
              { name: "Kamera 1B", location: { create : { x: "0", y: "0", width: "0", height: "0" }} }
            ]
          }
        },
        {
          name: "Lantai 2",
          cameras: {
            create: [
              { name: "Kamera 2A" ,location: {create : { x: "0", y: "0", width: "0", height: "0" }}},
              { name: "Kamera 2B" ,location: {create : { x: "0", y: "0", width: "0", height: "0" }}}
            ]
          }
        }
      ]
    }
  }
});


console.log("Data berhasil dibuat:", location);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });