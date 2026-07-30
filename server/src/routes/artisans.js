import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticate from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Create or update artisan profile (artisan must exist as user)
router.post("/", authenticate, async (req, res) => {
  try {
    const { profession, location, experience, bio, phone, photo, skills, price, available } = req.body;
    const userId = req.user.userId;
    // Upsert artisan profile
    const existing = await prisma.artisan.findUnique({ where: { userId } });
    if (existing) {
      const updated = await prisma.artisan.update({ where: { id: existing.id }, data: { profession, location, experience: experience || existing.experience, bio, phone, photo, skills, price, available } });
      return res.json(updated);
    }
    const artisan = await prisma.artisan.create({ data: { userId, profession, location, experience: experience || 0, bio, phone, photo, skills, price: price || null, available: available ?? true } });
    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Public: list artisans with optional search query (profession, location, name)
router.get("/", async (req, res) => {
  try {
    const { q, profession, location, name } = req.query;
    const filters = {};
    // basic query handling
    const where = {
      AND: [
        q ? { OR: [ { profession: { contains: q, mode: 'insensitive' } }, { location: { contains: q, mode: 'insensitive' } }, { bio: { contains: q, mode: 'insensitive' } }, { skills: { contains: q, mode: 'insensitive' } } ] } : {},
        profession ? { profession: { contains: profession, mode: 'insensitive' } } : {},
        location ? { location: { contains: location, mode: 'insensitive' } } : {}
      ]
    };
    // Remove empty objects in AND
    where.AND = where.AND.filter(o => Object.keys(o).length > 0);
    const artisans = await prisma.artisan.findMany({ where, include: { user: true } });
    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get artisan by id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const artisan = await prisma.artisan.findUnique({ where: { id }, include: { user: true } });
    if (!artisan) return res.status(404).json({ error: "Not found" });
    res.json(artisan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
