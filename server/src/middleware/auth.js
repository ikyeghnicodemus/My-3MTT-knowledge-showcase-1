import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Missing authorization header" });
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid authorization header" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid token" });
  }
}
