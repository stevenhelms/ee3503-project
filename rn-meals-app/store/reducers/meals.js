import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FAVORITE:
            // Find the meal in the favoriteMeals array
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                // Found. Now remove it.
                const updatedFavMeals = [...state.favoriteMeals];
                updatedFavMeals.splice(existingIndex, 1);
                return { ...state, favoriteMeals: updatedFavMeals };
            } else {
                // Not Found. Add it.
                const meal = state.meals.find(meal => meal.id === action.mealId);
                return { ...state, favoriteMeals: state.favoriteMeals.concat(meal)};
            }
        case SET_FILTERS:
            // Update filteredMeals to reflect selected filters.
            const appliedFilters = action.filters;
            const filteredMeals = state.meals.filter(meal => {
                if ( appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if ( appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false;
                }
                if ( appliedFilters.vegetarian && !meal.isVegetarian) {
                    return false;
                }
                if ( appliedFilters.vegan && !meal.isVegan) {
                    return false;
                }
                return true;
            });
            return { ...state, filteredMeals: filteredMeals };
        default:
            return state;
    }
    return state;
};

export default mealsReducer;