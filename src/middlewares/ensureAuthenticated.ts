import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../erros/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secrete);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: String(sub),
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
