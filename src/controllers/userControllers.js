import bcrypt from 'bcrypt';
import db from '../models/index.js';
import jwt from 'jsonwebtoken';
const { sign } = jwt;

const { User } = db;

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hashedPassword });

    res.status(201).json({
      message: "User created successfully",
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('req body ->',req.body);

    const user = await User.findOne({ where: { email } });
    console.log('user ->', user)
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
