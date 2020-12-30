import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import User from '../schemas/user';
import AppError from '../erros/AppError';

interface IUpdateRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  oldPassword?: string;
}
interface ICreateRequest {
  name: string;
  email: string;
  password: string;
}

class UserService {
  public async create({
    name,
    email,
    password,
  }: ICreateRequest): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });
    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(String(password), 10);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password;

    return user;
  }

  public async update({
    id,
    name,
    email,
    oldPassword,
    password,
  }: IUpdateRequest): Promise<any> {
    const userRepository = getRepository(User);

    if (!id) {
      throw new AppError('User not found');
    }
    const user = await userRepository.findOne(id);
    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await userRepository.findOne({
      where: { email },
    });

    if (userWithUpdatedEmail) {
      throw new AppError('E-mail already in use');
    }
    if (password && !oldPassword) {
      throw new AppError('OldPassword is required');
    }

    if (password && oldPassword) {
      const checkIldPassword = await compare(
        oldPassword,
        String(user.password),
      );

      if (!checkIldPassword) {
        throw new AppError('OldPassword does not match');
      }
    }

    let hashedPassword = '';
    if (password) {
      hashedPassword = await hash(String(password), 10);
    }
    await userRepository.update(id, {
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword || user.password,
    });

    const userUpdated = await userRepository.findOne(id);

    delete userUpdated?.password;

    return userUpdated;
  }
}

export default UserService;
