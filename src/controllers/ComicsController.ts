import { Request, Response } from 'express';
import ComicsServices from '../services/ComicsServices';
import ComicsFavoritesServices from '../services/ComicsFavoritesServices';

class ComicsController {
  public async list(request: Request, response: Response): Promise<void> {
    const userId = request.user.id;
    const { page = 0 } = request.body;

    const comicsFavoritesServices = new ComicsFavoritesServices();
    const comicsServices = new ComicsServices();
    const favorites = await comicsFavoritesServices.list({ userId });
    const comics = await comicsServices.list({ offset: page });

    const comicsList = await comics.comics.map(comic => {
      return {
        ...comic,
        liked: !!favorites.find(favorite => favorite.comicId === comic.id),
      };
    });

    response.json({ ...comics, comics: comicsList });
  }
  public async search(request: Request, response: Response): Promise<void> {
    const userId = request.user.id;
    const { title } = request.body;

    const comicsFavoritesServices = new ComicsFavoritesServices();
    const comicsServices = new ComicsServices();

    const favorites = await comicsFavoritesServices.list({ userId });
    const comics = await comicsServices.search({ title });

    const comicsList = await comics.map(comic => {
      return {
        ...comic,
        liked: !!favorites.find(favorite => favorite.comicId === comic.id),
      };
    });

    response.json(comicsList);
  }
  public async listCharacters(
    request: Request,
    response: Response,
  ): Promise<void> {
    const userId = request.user.id;
    const { page = 0 } = request.body;

    const comicsFavoritesServices = new ComicsFavoritesServices();
    const comicsServices = new ComicsServices();
    const favorites = await comicsFavoritesServices.list({ userId });
    const comics = await comicsServices.list({ offset: page });

    const comicsList = await comics.comics.map(comic => {
      return {
        ...comic,
        liked: !!favorites.find(favorite => favorite.comicId === comic.id),
      };
    });

    response.json({ ...comics, comics: comicsList });
  }
}
export default ComicsController;
