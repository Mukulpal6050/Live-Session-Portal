// controllers/authController.js
import db from "../config/db.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// ✅ Signup
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "student"]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Register Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Login
// ✅ Login (fixed)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = users[0];

    // 2️⃣ Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3️⃣ Generate token
    const token = generateToken(user.id, user.role);

    // 4️⃣ Send response
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

