import api from '../config/apiMarvelConfig';
import AppError from '../erros/AppError';
import { IComic, IComics } from '../interfaces/comics';
import { ICharacters } from '../interfaces/characters';

interface IRequestList {
  offset: number;
}

interface IRequestSearch {
  title: string;
}

class ComicsServices {
  public async list({ offset }: IRequestList): Promise<IComics> {
    const { data: comicsData = [] } = await api.get('/v1/public/comics', {
      params: {
        offset,
        orderBy: 'focDate',
      },
    });

    const comics = await comicsData.data.results.map((comic: any) => {
      return {
        id: comic.id,
        title: comic.title,
        description: comic.description,
        published: comic.dates[0].date,
        url: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
      };
    });
    const currentPage = comicsData.data.offset;

    comicsData.data.results = '';
    delete comicsData.data.results;
    delete comicsData.data.offset;

    return {
      ...comicsData.data,
      currentPage,
      maxPages: parseInt(String(comicsData.data.total / comicsData.data.limit)),
      comics,
    };
  }
  public async search({ title: titleDate }: IRequestSearch): Promise<IComic[]> {
    const { data: comicsData } = await api.get('/v1/public/comics', {
      params: {
        orderBy: 'modified',
        title: titleDate,
      },
    });

    if (!comicsData) {
      throw new AppError('Comic not found.');
    }
    return comicsData.data.results.map((comic: any) => {
      return {
        id: comic.id,
        title: comic.title,
        description: comic.description,
        url: `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`,
      };
    });
  }

  public async listCharactersByComic(comicId: number): Promise<ICharacters> {
    const { data: charactersData = [] } = await api.get(
      `/v1/public/comics/${comicId}/characters`,
    );

    const characters = await charactersData.data.results.map(
      (character: any) => {
        return {
          id: character.id,
          name: character.name,
          description: character.description || '',
          modified: character.modified,
          url: `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`,
        };
      },
    );
    const currentPage = charactersData.data.offset;

    charactersData.data.results = '';
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
}

export default ComicsServices;
