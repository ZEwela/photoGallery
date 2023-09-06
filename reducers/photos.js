const types = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAILURE: "FAILURE",
  UPDATEPAGE: "UPDATEPAGE",
  FAVOURITED: "FAVOURITED",
};

export const actionCreators = {
  loading: () => ({ type: types.LOADING }),
  failure: () => ({ type: types.FAILURE }),
  success: (photos, page) => ({
    type: types.SUCCESS,
    payload: { photos, page },
  }),
  updatePage: (page) => ({
    type: types.UPDATEPAGE,
    payload: { page },
  }),
  favourited: (photo) => ({
    type: types.FAVOURITED,
    payload: { photo },
  }),
};

export const initialState = {
  loading: false,
  error: false,
  photos: [],
  nextPage: 1,
  favourites: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true, error: false };
    case types.SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        photos: [...state.photos, ...action.payload.photos],
        nextPage: state.nextPage + 1,
      };
    case types.FAILURE:
      return { ...state, loading: false, error: false };
    case types.UPDATEPAGE:
      return {
        ...state,
        nextPage: action.payload.page,
      };
    case types.FAVOURITED:
      return {
        ...state,
        favourites: [...state.favourites, action.payload.photo],
      };
  }
}
