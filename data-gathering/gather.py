import os
import time
import googlemaps

def get_data(place=None, pagetoken=None):
    """This function will gather remote data and return a JSON dictionary

    Parameters:
        url (str): The URL to gather data from

    Returns:
        dict: A dictionary of the retrieved JSON data

    """

    api_key = os.getenv("PLACES_API")
    if api_key is None:
        return {'error': "API key not set in the environment."}

    # Coordinates to Blue Bay Cottage where I stayed the last time
    # I visited the island.
    latitude = 17.740033
    longitude = -88.028298

    gmaps = googlemaps.Client(key=api_key)

    if place is not None and 'place_id' in place:
        # print(f"DEBUG: place_id = {place['place_id']}")
        data = gmaps.place(place['place_id'])
        # print("DEBUG: " + str(data.keys()))
    else:
        count = 0
        data = None
        while data is None and count < 3:
            try:
                data = gmaps.places_nearby(
                    [latitude, longitude],  # location: long, lat
                    2500,  # radius
                    None,  # keyword
                    None,  # language
                    None,  # min price
                    None,  # max price
                    None,  # name
                    None,  # open now
                    None,  # rank_by (prominence, distance)
                    'lodging',  # type
                    pagetoken  # the page token, if it exists.
                )
            except googlemaps.exceptions.ApiError:
                # print(f"DEBUG: Caught error. Trying again. {count+1}")
                data = None
                count += 1
                time.sleep(3)

    return data
