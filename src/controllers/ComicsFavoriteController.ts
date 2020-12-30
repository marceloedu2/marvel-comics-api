import { Request, Response } from 'express';
import ComicsServices from '../services/ComicsServices';
import ComicsFavoritesServices from '../services/ComicsFavoritesServices';

class ComicsFavoritesController {
  public async create(request: Request, response: Response): Promise<void> {
    const comicsServices = new ComicsFavoritesServices();

    const userId = request.user.id;
    const { id, title, description, published, url, detail } = request.body;

    await comicsServices.create({
      comicId: id,
      userId,
      title,
      description,
      published,
      url,
      detail,
    });

    response.status(200).send();
  }
  public async list(request: Request, response: Response): Promise<void> {
    const comicsServices = new ComicsFavoritesServices();
    const userId = request.user.id;

    const favorites = await comicsServices.list({ userId });

    response.json(favorites);
  }
  public async remove(request: Request, response: Response): Promise<void> {
    const comicsServices = new ComicsFavoritesServices();
    const userId = request.user.id;
    const { id } = request.params;

    const favorites = await comicsServices.remove({
      userId,
      comicId: Number(id),
    });

    response.json(favorites);
  }
}
export default ComicsFavoritesController;
