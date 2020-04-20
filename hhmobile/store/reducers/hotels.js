import { HOTELS } from '../../data/dummy-data';
import { FETCH_HOTELS } from '../actions/hotels';

const initialState = {
    allHotels: HOTELS,
    favoriteHotels: HOTELS.filter(fav => fav.favorite == true)
};

export default (state = initialState, action) => {

    switch(action.type) {
        case FETCH_HOTELS:
            return {
                allHotels: action.allHotels
            };
        // case CREATE_FAVORITE:
        // case DELETE_FAVORITE:
        //     return {
        //         ...state,
        //         // action.
        //     }

    }
    return state;
};