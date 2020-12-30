import AppError from '../erros/AppError';
import { getRepository } from 'typeorm';
import CharacterFavorite from '../schemas/characterFavorite';

type IRequestFavorite = {
  id: number;
  userId: string;
  name: string;
  description: string;
  detail: string;
  url: string;
};

class CharactersServices {
  public async create({
    id,
    userId,
    name,
    description,
    detail,
    url,
  }: IRequestFavorite): Promise<void> {
    const characterRepository = getRepository(CharacterFavorite);
    const checkCharacterExists = await characterRepository.findOne({
      where: { characterId: id, userId },
    });

    if (checkCharacterExists) {
      throw new AppError('CharacterFavorite already exists as a favorite.');
    }

    const user = characterRepository.create({
      characterId: id,
      userId,
      name,
      description,
      detail,
      url,
    });

    await characterRepository.save(user);
  }

  public async list({
    userId,
  }: {
    userId: string;
  }): Promise<CharacterFavorite[]> {
    const characterRepository = getRepository(CharacterFavorite);
    return await characterRepository.find({ where: { userId } });
  }

  public async remove({
    userId,
    characterId,
  }: {
    userId: string;
    characterId: number;
  }): Promise<void> {
    const characterRepository = getRepository(CharacterFavorite);

    const character = await characterRepository.find({
      where: { userId, characterId },
    });

    if (character.length === 0) {
      throw new AppError('CharacterFavorite don`t exist as a favorite.');
    }

    await characterRepository.remove(character);
  }
}

export default CharactersServices;
