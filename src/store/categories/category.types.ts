export enum CATEGORIES_ACTION_TYPE {
  FETCH_CATEGORIES_START = 'FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'FETCH_CATEGORIES_FAILED',
}

export type CategoryItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = {
  [key: string]: CategoryItem[];
};
