import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getFloorsByLocation = async (req, res) => {
  try {
    const floors = await prisma.floor.findMany({
      where: {
        locationId: req.params.id
      },
      include: {
        cameras: true
      }
    });
    res.json(floors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
export const getAllFloors = async (req, res) => {
  try {
    const floors = await prisma.floor.findMany({orderBy: { name: "asc" }});
    res.json(floors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}