import {
  selectCategories,
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from '../category.selector';

// prettier-ignore
const mockData = [
  { title: 'mens', imageUrl: 'test', items: [ { id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' } ] },
  { title: 'womens', imageUrl: 'test', items: [ { id: 3, name: 'Product 3' }, { id: 4, name: 'Product 4' } ] },
];

const mockState = {
  categories: {
    isLoading: false,
    categories: mockData,
  },
};

describe('Category Selector tests', () => {
  test('selectCategories should return the categories data', () => {
    const categoriesSlice = selectCategories(mockState);
    expect(categoriesSlice).toEqual(mockState.categories.categories);
  });

  test('selectCategoriesIsLoading should return the isLoading state', () => {
    const isLoading = selectCategoriesIsLoading(mockState);
    expect(isLoading).toEqual(mockState.categories.isLoading);
  });

  test('selectCategoriesMap should convert the items array into the appropriate map', () => {
    // prettier-ignore
    const expectedCategoriesMap = {
      mens: [ { id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' } ],
      womens: [ { id: 3, name: 'Product 3' }, { id: 4, name: 'Product 4' } ],
    }

    const categoriesMap = selectCategoriesMap(mockState);
    console.log(categoriesMap);
    expect(categoriesMap).toEqual(expectedCategoriesMap);
  });
});
