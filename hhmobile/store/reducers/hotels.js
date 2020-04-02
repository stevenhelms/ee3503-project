import { HOTELS } from '../../data/dummy-data';

const initialState = {
    allHotels: HOTELS,
    favoriteHotels: HOTELS.filter(fav => fav.favorite == true)
};

export default (state = initialState, action) => {
    return state;
};