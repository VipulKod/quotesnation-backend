import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Authorization header not found' });
    }

    const authParts = authHeader.split(' ');
    if (authParts.length !== 2 || authParts[0] !== 'Bearer') {
      return res
        .status(401)
        .json({ message: 'Invalid authorization header format' });
    }

    const token = authParts[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.verified = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
