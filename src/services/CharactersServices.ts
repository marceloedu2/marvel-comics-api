import api from '../config/apiMarvelConfig';
import { ICharacter, ICharacters } from '../interfaces/characters';
import AppError from '../erros/AppError';

type IRequestList = {
  offset: number;
};

type IRequestIndex = {
  name: string;
};

class CharactersServices {
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

  public async index({ name: nameDate }: IRequestIndex): Promise<ICharacter[]> {
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
}

export default CharactersServices;
