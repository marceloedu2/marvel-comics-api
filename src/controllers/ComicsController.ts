import { Request, Response } from 'express';
import ComicsServices from '../services/ComicsServices';
import ComicsFavoritesServices from '../services/ComicsFavoritesServices';
import CharactersFavoritesServices from '../services/CharactersFavoritesServices';
import CharactersServices from '../services/CharactersServices';

class ComicsController {
  public async index(request: Request, response: Response): Promise<void> {
    const userId = request.user.id;
    const { id = 0 } = request.params;

    const comicsFavoritesServices = new ComicsFavoritesServices();
    const comicsServices = new ComicsServices();
    const favorites = await comicsFavoritesServices.list({ userId });
    const comic = await comicsServices.getById(Number(id));

    const comicsList = await comic.map(comic => {
      return {
        ...comic,
        liked: !!favorites.find(favorite => favorite.comicId === comic.id),
      };
    });

    response.json(comicsList[0] || comicsList);
  }

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
    const { id = 0 } = request.params;
    const charactersFavoritesServices = new CharactersFavoritesServices();
    const comicsServices = new ComicsServices();
    const favorites = await charactersFavoritesServices.list({ userId });
    const characters = await comicsServices.listCharactersByComic(Number(id));

    const charactersList = await characters.characters.map(character => {
      return {
        ...character,
        liked: !!favorites.find(
          favorite => favorite.characterId === character.id,
        ),
      };
    });

    response.json({ ...characters, characters: charactersList });
  }
}
export default ComicsController;
