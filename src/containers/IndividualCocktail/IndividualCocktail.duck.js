export const FETCH_COCKTAIL_REQUEST = "app/IndividualCocktail/FETCH_COCKTAIL_REQUEST";
export const FETCH_COCKTAIL_SUCCESS = "app/IndividualCocktail/FETCH_COCKTAIL_SUCCESS";
export const FETCH_COCKTAIL_ERROR = "app/IndividualCocktail/FETCH_COCKTAIL_ERROR";

const initialState = {
  fetchCocktailInProgress: false,
  fetchCocktailError: null,
  cocktail: null,
};
export default function cocktailSearchReducer(
  state = initialState,
  action = {}
) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_COCKTAIL_REQUEST:
      return {
        ...state,
        fetchCocktailInProgress: true,
        fetchCocktailError: null,
      };
    case FETCH_COCKTAIL_SUCCESS:
      return {
        ...state,
        fetchCocktailInProgress: false,
        fetchCocktailError: null,
        cocktail: payload,
      };
    case FETCH_COCKTAIL_ERROR:
      return {
        ...state,
        fetchCocktailInProgress: false,
        fetchCocktailError: payload,
        cocktail: null,
      };
      
    default:
      return state;
  }
}

const fetchCocktailRequest = () => ({ type: FETCH_COCKTAIL_REQUEST });
const fetchCocktailSuccess = data => ({
  type: FETCH_COCKTAIL_SUCCESS,
  payload: data,
});
const fetchCocktailError = e => ({
    type: FETCH_COCKTAIL_ERROR,
    payload: e,
  });

export const fetchCocktail = (cocktailId) => (dispatch, getState, axios) => {

  dispatch(fetchCocktailRequest());
  return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
  .then(response=> dispatch(fetchCocktailSuccess(response.data.drinks)))
  .catch(err=>dispatch(fetchCocktailError(err)));
};
