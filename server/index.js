import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";
import artisanRoutes from "./src/routes/artisans.js";
import bookingRoutes from "./src/routes/bookings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, message: "Artisan Finder API" }));
app.use("/api/auth", authRoutes);
app.use("/api/artisans", artisanRoutes);
app.use("/api/bookings", bookingRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
