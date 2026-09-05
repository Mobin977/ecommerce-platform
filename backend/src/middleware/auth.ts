import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Parses out "Bearer <TOKEN>"

  if (!token) {
    res.status(401).json({ error: 'Access denied. Security authentication token missing.' });
    return;
  }

  try {
    // FIXED: Adding '|| ' via fallback protects against the compiler's strict 'string | undefined' rule
    const decoded = jwt.verify(token, JWT_SECRET || '') as { userId: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired authentication session token.' });
    return;
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'ADMIN') {
    res.status(403).json({ error: 'Access denied. Administrative authorization parameters required.' });
    return;
  }
  next();
};
