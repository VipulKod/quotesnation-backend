import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class CorsOptionsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS',
      );
      res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
      res.sendStatus(200);
    } else {
      next();
    }
  }
}
