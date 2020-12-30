import { getRepository } from 'typeorm';
import User from '../schemas/user';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../erros/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateServices {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.');
    }

    const passwordMarched = await compare(password, String(user.password));

    delete user.password;

    if (!passwordMarched) {
      throw new AppError('Incorrect email/password combination.');
    }

    const token = sign({}, authConfig.jwt.secrete, {
      subject: String(user.id),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateServices;
