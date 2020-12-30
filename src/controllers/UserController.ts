import { Request, Response } from 'express';

import UserService from '../services/UserService';

class UserController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUser = new UserService();

    const user = await createUser.create({ name, email, password });
    return response.json(user);
  }

  public async update(request: Request, response: Response) {
    const updateUser = new UserService();

    const { id, email, name, password, oldPassword } = request.body;

    const user = await updateUser.update({
      id,
      email,
      name,
      password,
      oldPassword,
    });
    return response.json(user);
  }
}

export default UserController;
