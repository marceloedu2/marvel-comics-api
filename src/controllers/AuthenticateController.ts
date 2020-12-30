import { Request, Response } from 'express';
import User from '../schemas/user';
import AuthenticateServices from '../services/AuthenticateServices';

interface IUser {
  user: User;
  token: string;
}

class AuthenticateController {
  public async execute(
    request: Request,
    response: Response,
  ): Promise<Response<IUser>> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateServices();

    const { user, token } = await authenticateUser.execute({ email, password });
    return response.json({ user, token });
  }
}
export default AuthenticateController;
