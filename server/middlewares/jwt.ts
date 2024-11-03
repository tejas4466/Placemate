// middleware/jwt.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || ' ';

interface CustomRequest extends Request {
  user?: JwtPayload | string;
}

// Middleware to authenticate JWT
export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.user = decodedUser;
    next();
  });
};
