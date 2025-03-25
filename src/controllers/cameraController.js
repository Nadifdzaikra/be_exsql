import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCamerasByFloor = async (req, res) => {
  try {
    const { floorId } = req.params;
    const cameras = await prisma.camera.findMany({
      where: { floorId },
      include: { floor: true, location: true },
    });
    res.json(cameras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllCameras = async (req, res) => {
  try {
    const cameras = await prisma.camera.findMany({
      include: { floors: true, location: true },
      orderBy: [ { name: "asc" }, { floors: { name: "asc" }}],
    });
    res.json(cameras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};