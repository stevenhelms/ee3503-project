export const FETCH_HOTELS = "FETCH_HOTELS";

import Hotel from "../../models/hotels";

export const fetchHotels = () => {
  return async (dispatch, getState) => {
    const response = await fetch(
      "http://ec2-52-45-183-216.compute-1.amazonaws.com/api/hotels/",
      {
        method: "GET",
        headers: {
          Authorization: "Token b712e9796a81856a59948ec6d07ce5fc640d44d9",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);

      // throw error
    }

    const responseData = await response.json();

    const loadedHotels = [];

    for (const key in responseData) {
      loadedHotels.push(
        new Hotel(
          responseData[key].id,
          responseData[key].url,
          responseData[key].name,
          responseData[key].address,
          responseData[key].phone_number,
          responseData[key].vicinity,
          responseData[key].types,
          responseData[key].google_place_id,
          responseData[key].geometry,
          responseData[key].updated_at,
          responseData[key].created_at
        )
      );
    }

    dispatch({
      type: FETCH_HOTELS,
      allHotels: loadedHotels,
    });
  };
};
