import { createAction } from '../../utils/reducer/reducer.util';

import { CATEGORIES_ACTION_TYPE } from './category.types';

export const setCategoriesMap = categoriesMap => {
  return createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP, categoriesMap);
};
