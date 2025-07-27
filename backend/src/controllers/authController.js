import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const AuthController = {
    // Register new user
    register: async (req, res) => {
      const { name, email, password } = req.body;
      
      try {
        // Validate input
        if (!name || !email || !password) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
    
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ error: 'User with this email already exists' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: { 
            name, 
            email, 
            password: hashedPassword,
            role: 'USER' // Default role
          },
          select: { id: true, name: true, email: true, role: true }
        });
    
        const token = jwt.sign(
          { userId: user.id, role: user.role }, 
          JWT_SECRET, 
          { expiresIn: '7d' }
        );
    
        res.status(201).json({ 
          message: 'User registered successfully',
          user,
          token 
        });
      } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Registration failed' });
      }
    },
    
    // Login user
    login: async (req, res) => {
      const { email, password } = req.body;
      
      try {
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required' });
        }
    
        const user = await prisma.user.findUnique({ 
          where: { email },
          select: { id: true, name: true, email: true, password: true, role: true }
        });
        
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        const { password: _, ...userWithoutPassword } = user;
        const token = jwt.sign(
          { userId: user.id, role: user.role }, 
          JWT_SECRET, 
          { expiresIn: '7d' }
        );
    
        res.json({ 
          message: 'Login successful',
          user: userWithoutPassword,
          token 
        });
      } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Login failed' });
      }
    },
    
    // Get current user profile
    getProfile: async (req, res) => {
      try {
        res.json({ user: req.user });
      } catch (err) {
        console.error('Profile error:', err);
        res.status(500).json({ error: 'Failed to get profile' });
      }
    },
    
    // Logout user
    logout: async (req, res) => {
      try {
        // In a more advanced setup, you might want to blacklist the token
        res.json({ message: 'Logged out successfully' });
      } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ error: 'Logout failed' });
      }
    }
}

export default AuthController;