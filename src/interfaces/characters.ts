export interface ICharacters {
  limit: number;
  total: number;
  count: number;
  currentPage: number;
  maxPages: number;
  characters: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  url: string;
  liked?: boolean;
}
