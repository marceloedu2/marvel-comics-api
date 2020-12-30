import AppError from '../erros/AppError';
import { getRepository } from 'typeorm';
import ComicsFavorites from '../schemas/comicFavorite';

type IRequestFavorite = {
  comicId: number;
  userId: string;
  title: string;
  description: string;
  published: string;
  detail: string;
  url: string;
};

class ComicsFavoritesServices {
  public async create({
    comicId,
    userId,
    title,
    description,
    published,
    detail,
    url,
  }: IRequestFavorite): Promise<ComicsFavorites> {
    const characterRepository = getRepository(ComicsFavorites);
    const checkCharacterExists = await characterRepository.findOne({
      where: { comicId, userId },
    });

    if (checkCharacterExists) {
      throw new AppError('CharacterFavorite already exists as a favorite.');
    }

    const comic = characterRepository.create({
      comicId,
      userId,
      title,
      description,
      published,
      detail,
      url,
    });

    return await characterRepository.save(comic);
  }

  public async list({
    userId,
  }: {
    userId: string;
  }): Promise<ComicsFavorites[]> {
    const comicsRepository = getRepository(ComicsFavorites);
    return await comicsRepository.find({ where: { userId } });
  }

  public async remove({
    userId,
    comicId,
  }: {
    userId: string;
    comicId: number;
  }): Promise<void> {
    const comicsRepository = getRepository(ComicsFavorites);

    const comic = await comicsRepository.find({
      where: { userId, comicId },
    });

    if (comic.length === 0) {
      throw new AppError('CharacterFavorite don`t exist as a favorite.');
    }

    await comicsRepository.remove(comic);
  }
}

export default ComicsFavoritesServices;
