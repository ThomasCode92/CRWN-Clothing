import categoryReducer, {
  INITIAL_STATE,
  fetchCategoriesStart,
  setCategories,
  setError,
} from '../category.reducer';

describe('Category Reducer tests', () => {
  test('fetchCategoriesStart', () => {
    const expectedState = {
      ...INITIAL_STATE,
      isLoading: true,
    };

    const updatedState = categoryReducer(INITIAL_STATE, fetchCategoriesStart());

    expect(updatedState).toEqual(expectedState);
  });

  test('setCategories', () => {
    // prettier-ignore
    const mockData = [
      { title: 'mens', imageUrl: 'test', items: [ { id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' } ] },
      { title: 'womens', imageUrl: 'test', ite2ms: [ { id: 3, name: 'Product 3' }, { id: 4, name: 'Product 4' } ] },
    ];

    const expectedState = {
      ...INITIAL_STATE,
      categories: mockData,
      isLoading: false,
    };

    const updatedState = categoryReducer(
      INITIAL_STATE,
      setCategories(mockData)
    );
    expect(updatedState).toEqual(expectedState);
  });

  test('setError', () => {
    const mockError = new Error('Error fetching categories');

    const expectedState = {
      ...INITIAL_STATE,
      isLoading: false,
      error: mockError,
    };

    const updatedState = categoryReducer(INITIAL_STATE, setError(mockError));
    expect(updatedState).toEqual(expectedState);
  });
});
