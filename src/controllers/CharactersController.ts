import { Request, Response } from 'express';
import CharactersServices from '../services/CharactersServices';
import CharactersFavoritesServices from '../services/CharactersFavoritesServices';

class CharactersController {
  public async list(request: Request, response: Response): Promise<void> {
    const charactersServices = new CharactersServices();
    const charactersFavoritesServices = new CharactersFavoritesServices();

    const userId = request.user.id;
    const { page = 0 } = request.body;

    const favorites = await charactersFavoritesServices.list({ userId });
    const characters = await charactersServices.list({
      offset: page,
    });

    const charactersList = await characters.characters.map(characters => {
      return {
        ...characters,
        liked: !!favorites.find(
          favorite => favorite.characterId === characters.id,
        ),
      };
    });
    response.json({ ...characters, characters: charactersList });
  }
  public async search(request: Request, response: Response): Promise<void> {
    const charactersServices = new CharactersServices();
    const charactersFavoritesServices = new CharactersFavoritesServices();

    const userId = request.user.id;
    const { name } = request.body;
    const favorites = await charactersFavoritesServices.list({ userId });
    const characters = await charactersServices.index({ name });

    const charactersList = await characters.map(characters => {
      return {
        ...characters,
        liked: !!favorites.find(
          favorite => favorite.characterId === characters.id,
        ),
      };
    });
    response.json(charactersList);
  }

  public async listComics(request: Request, response: Response): Promise<void> {
    const charactersServices = new CharactersServices();
    const charactersFavoritesServices = new CharactersFavoritesServices();

    const userId = request.user.id;
    const { id = 0 } = request.params;

    const favorites = await charactersFavoritesServices.list({ userId });
    const comics = await charactersServices.comicsByCharacters(Number(id));
    response.json(comics);
    // const charactersList = await characters.characters.map(characters => {
    //   return {
    //     ...characters,
    //     liked: !!favorites.find(
    //       favorite => favorite.characterId === characters.id,
    //     ),
    //   };
    // });
    // response.json({ ...characters, characters: charactersList });
  }
}
export default CharactersController;
