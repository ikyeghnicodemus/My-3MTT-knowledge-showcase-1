import express from "express";
import { PrismaClient } from "@prisma/client";
import authenticate from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

// Create a booking (customer)
router.post("/", authenticate, async (req, res) => {
  try {
    const { artisanId, date, time, description } = req.body;
    const userId = req.user.userId;
    // Basic validation
    const booking = await prisma.booking.create({ data: { artisanId: Number(artisanId), customerId: userId, date: new Date(date), time, description } });
    res.json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Artisan or customer can list bookings
router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;
    // If artisan, return bookings for their artisan profile
    const artisan = await prisma.artisan.findUnique({ where: { userId } });
    if (artisan) {
      const bookings = await prisma.booking.findMany({ where: { artisanId: artisan.id }, include: { customer: true } });
      return res.json(bookings);
    }
    // Otherwise, return bookings made by the user
    const bookings = await prisma.booking.findMany({ where: { customerId: userId }, include: { artisan: true } });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update booking status (artisan)
router.patch("/:id/status", authenticate, async (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;
    const userId = req.user.userId;
    const artisan = await prisma.artisan.findUnique({ where: { userId } });
    if (!artisan) return res.status(403).json({ error: "Only artisans can update status" });
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.artisanId !== artisan.id) return res.status(404).json({ error: "Booking not found" });
    const updated = await prisma.booking.update({ where: { id: bookingId }, data: { status } });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
