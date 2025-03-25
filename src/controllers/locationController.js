import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllLocations = async (req, res) => {
  try{
    const location = await prisma.location.findMany(
      {include: {
        floors: true,
        position: true
      }}
    );
    res.json(location)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
} 