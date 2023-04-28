import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'ADD_TO_CART',
  SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
}

export type CartItem = CategoryItem & { quantity: number };
