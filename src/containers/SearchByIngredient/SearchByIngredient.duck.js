export const FETCH_INGREDIENTS_COCKTAILS_REQUEST =
  "app/SearchByIngredient/FETCH_INGREDIENTS_COCKTAILS_REQUEST";
export const FETCH_INGREDIENTS_COCKTAILS_SUCCESS =
  "app/SearchByIngredient/FETCH_INGREDIENTS_COCKTAILS_SUCCESS";
export const FETCH_INGREDIENTS_COCKTAILS_ERROR =
  "app/SearchByIngredient/FETCH_INGREDIENTS_COCKTAILS_ERROR";
export const CLEAR_COCKTAILS_INGREDIENTS_SUCCESS =
  "app/SearchByIngredient/CLEAR_COCKTAILS_INGREDIENTS_SUCCESS";

const initialState = {
  fetchCocktailsInProgress: false,
  fetchCocktailsError: null,
  cocktails: null,
};
export default function searchByIngredientReducer(
  state = initialState,
  action = {}
) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_INGREDIENTS_COCKTAILS_REQUEST:
      return {
        ...state,
        fetchCocktailsInProgress: true,
        fetchCocktailsError: null,
      };
    case FETCH_INGREDIENTS_COCKTAILS_SUCCESS:
      return {
        ...state,
        fetchCocktailsInProgress: false,
        fetchCocktailsError: null,
        cocktails: payload,
      };
    case FETCH_INGREDIENTS_COCKTAILS_ERROR:
      return {
        ...state,
        fetchCocktailsInProgress: false,
        fetchCocktailsError: payload,
        cocktails: null,
      };
    case CLEAR_COCKTAILS_INGREDIENTS_SUCCESS:
      return {
        ...state,
        cocktails: null,
      };
    default:
      return state;
  }
}

const fetchIngredientCocktailsRequest = () => ({
  type: FETCH_INGREDIENTS_COCKTAILS_REQUEST,
});
const fetchIngredientCocktailsSuccess = (data) => ({
  type: FETCH_INGREDIENTS_COCKTAILS_SUCCESS,
  payload: data,
});
const fetchIngredientCocktailsError = (e) => ({
  type: FETCH_INGREDIENTS_COCKTAILS_ERROR,
  payload: e,
});
export const clearCocktailsIngredientsSuccess = () => ({
  type: CLEAR_COCKTAILS_INGREDIENTS_SUCCESS,
});

export const fetchIngredientCocktails =
  (ingredient) => (dispatch, getState, axios) => {
    dispatch(fetchIngredientCocktailsRequest());
    return axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`
      )
      .then((response) => {
        if (!response.data.drinks){
        dispatch(fetchIngredientCocktailsSuccess("404"));
        } else{
        dispatch(fetchIngredientCocktailsSuccess(response.data.drinks));
        }
      })
      .catch((err) => dispatch(fetchIngredientCocktailsError(err)));
  };
