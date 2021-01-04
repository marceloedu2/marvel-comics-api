import api from '../config/apiMarvelConfig';
import { ICharacter, ICharacters } from '../interfaces/characters';
import AppError from '../erros/AppError';
import { IComics } from '../interfaces/comics';

type IRequestList = {
  offset: number;
};

type IRequestIndex = {
  name: string;
};

class CharactersServices {
  public async index(id: number): Promise<ICharacter[]> {
    const { data: characterData } = await api.get(
      `/v1/public/characters/${id}`,
    );

    if (!characterData) {
      throw new AppError('CharacterFavorite not found.');
    }
    return characterData.data.results.map((character: any) => {
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        url: `${character.thumbnail?.path}/portrait_uncanny.${character.thumbnail?.extension}`,
      };
    });
  }

  public async list({ offset }: IRequestList): Promise<ICharacters> {
    const { data: charactersData } = await api.get('/v1/public/characters', {
      params: {
        offset,
        orderBy: 'modified',
      },
    });

    if (!charactersData) {
      throw new AppError('Characters not found.');
    }

    const characters = charactersData.data.results?.map((character: any) => {
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        modified: character.modified,
        url: `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`,
      };
    });

    const currentPage = charactersData.data.offset;
    delete charactersData.data.results;
    delete charactersData.data.offset;

    return {
      ...charactersData.data,
      currentPage,
      maxPages: parseInt(
        String(charactersData.data.total / charactersData.data.limit),
      ),
      characters,
    };
  }

  public async search({
    name: nameDate,
  }: IRequestIndex): Promise<ICharacter[]> {
    const { data: characterData } = await api.get('/v1/public/characters', {
      params: {
        orderBy: 'modified',
        name: nameDate,
      },
    });

    if (!characterData) {
      throw new AppError('CharacterFavorite not found.');
    }
    return characterData.data.results.map((character: any) => {
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        url: `${character.thumbnail?.path}/portrait_uncanny.${character.thumbnail?.extension}`,
      };
    });
  }

  public async listComicsByCharacter(characterId: number): Promise<IComics> {
    const { data: comicsData } = await api.get(
      `/v1/public/characters/${characterId}/comics`,
      {
        params: {
          orderBy: 'modified',
        },
      },
    );

    if (!comicsData) {
      throw new AppError('CharacterFavorite not found.');
    }

    const comics = comicsData.data.results?.map((comic: any) => {
      return {
        id: comic.id,
        title: comic.title,
        description: comic.description || '',
        modified: comic.modified,
        url: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
      };
    });

    const currentPage = comicsData.data.offset;
    delete comicsData.data.results;
    delete comicsData.data.offset;

    return {
      ...comicsData.data,
      currentPage,
      maxPages: parseInt(String(comicsData.data.total / comicsData.data.limit)),
      comics,
    };
  }
}

export default CharactersServices;
