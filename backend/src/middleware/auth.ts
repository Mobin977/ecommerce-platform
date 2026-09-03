import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// FIXED: Pulls directly from process.env with no hidden string mismatches
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn("⚠️ [Warning]: JWT_SECRET variable is missing from environment layout config.");
}


export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): any => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Parses out "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Security authentication token missing.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired authentication session token.' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): any => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied. Administrative authorization parameters required.' });
  }
  next();
};
