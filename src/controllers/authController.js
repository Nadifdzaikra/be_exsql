import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Register user
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({ message: "User berhasil dibuat", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email atau Password salah" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Email atau Password salah" });
    }

    // Buat token baru
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Simpan token ke database
    await prisma.user.update({
      where: { id: user.id },
      data: { token },
    });

    res.json({ message: "Login berhasil", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const logout = async (req, res) => {
  try {
    const userId = req.user.userId;

    await prisma.user.update({
      where: { id: userId },
      data: { token: null } // Hapus token dari database
    });

    res.json({ message: "Logout berhasil" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Dapatkan semua user
export const getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        userPositions: true,
        jwtSecret: true
      }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};