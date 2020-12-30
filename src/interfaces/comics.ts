export interface IComics {
  limit: number;
  total: number;
  count: number;
  currentPage: number;
  maxPages: number;
  comics: IComic[];
}

export interface IComic {
  id: number;
  title: string;
  description: string;
  published: string;
  url: string;
  liked: boolean;
}
