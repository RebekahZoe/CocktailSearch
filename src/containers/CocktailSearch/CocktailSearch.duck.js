export const FETCH_COCKTAILS_REQUEST =
  "app/CocktailSearch/FETCH_COCKTAILS_REQUEST";
export const FETCH_COCKTAILS_SUCCESS =
  "app/CocktailSearch/FETCH_COCKTAILS_SUCCESS";
export const FETCH_COCKTAILS_ERROR = "app/CocktailSearch/FETCH_COCKTAILS_ERROR";
export const CLEAR_COCKTAILS_SUCCESS =
  "app/CocktailSearch/CLEAR_COCKTAILS_SUCCESS";
export const FETCH_RANDOM_COCKTAIL_SUCCESS =
  "app/CocktailSearch/FETCH_RANDOM_COCKTAIL_SUCCESS";

const initialState = {
  fetchCocktailsInProgress: false,
  fetchCocktailsError: null,
  cocktails: null,
};
export default function cocktailSearchReducer(
  state = initialState,
  action = {}
) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COCKTAILS_REQUEST:
      return {
        ...state,
        fetchCocktailsInProgress: true,
        fetchCocktailsError: null,
      };
    case FETCH_COCKTAILS_SUCCESS:
      return {
        ...state,
        fetchCocktailsInProgress: false,
        fetchCocktailsError: null,
        cocktails: payload,
      };
    case FETCH_COCKTAILS_ERROR:
      return {
        ...state,
        fetchCocktailsInProgress: false,
        fetchCocktailsError: payload,
        cocktails: null,
      };
    case CLEAR_COCKTAILS_SUCCESS:
      return {
        ...state,
        cocktails: null,
      };
    case FETCH_RANDOM_COCKTAIL_SUCCESS:
      return {
        ...state,
        fetchCocktailsInProgress: false,
        fetchCocktailsError: null,
        cocktails: payload,
      };
    default:
      return state;
  }
}

const fetchCocktailsRequest = () => ({ type: FETCH_COCKTAILS_REQUEST });
const fetchCocktailsSuccess = (data) => ({
  type: FETCH_COCKTAILS_SUCCESS,
  payload: data,
});
const fetchCocktailsError = (e) => ({
  type: FETCH_COCKTAILS_ERROR,
  payload: e,
});
export const clearCocktailsSuccess = () => ({ type: CLEAR_COCKTAILS_SUCCESS });
const fetchRandomCocktailSuccess = (data) => ({
  type: FETCH_RANDOM_COCKTAIL_SUCCESS,
  payload: data,
});
export const fetchCocktails = (cocktailName) => (dispatch, getState, axios) => {
  dispatch(fetchCocktailsRequest());
  return axios
    .get(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    )
    .then((response) => {
      if (!response.data.drinks){
        dispatch(fetchCocktailsSuccess("404"));
      }else{
      dispatch(fetchCocktailsSuccess(response.data.drinks));

      }
    })
    .catch((err) => dispatch(fetchCocktailsError(err)));
};

export const fetchRandomCocktail = () => (dispatch, getState, axios) => {
  dispatch(fetchCocktailsRequest());
  return axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((response) =>
      dispatch(fetchRandomCocktailSuccess(response.data.drinks))
    )
    .catch((err) => dispatch(fetchCocktailsError(err)));
};
