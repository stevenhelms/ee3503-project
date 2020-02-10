import os
import time
import googlemaps


def get_data(place=None, pagetoken=None):
    '''This function will gather remote data and return a JSON dictionary

    Parameters:
        place (dictionary) -- Specific hotel information
        pagetoken (string) -- Page Token ID to retrieve the next set of data.

    Returns:
        dictionary: Retrieved JSON data

    '''

    '''
    Never store an API key in the source code or in another file
    that may be pushed to a remote Git repository. Best practice
    would have that key stored in memory (i.e. environment variable)
    or in another file that is excluded from Git (via .gitignore).
    '''
    try:
        api_key = os.getenv("PLACES_API")
        if api_key is None:
            raise Exception("API key not set in the environment.")
    except Exception as e:
        '''
        First try from environment failed. Let's check a file.
        '''
        # print("Warning: "+str(e))
        try:
            k = open(".key")
            api_key = k.readline();
        except Exception as e:
            print("Warning: "+str(e))

    if api_key is None:
        return {'error': "API key not set."}

    '''
    Coordinates to Blue Bay Cottage where I stayed the last time
    I visited the island.
    '''
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

        '''
        Intentional delay to give Google a chance to
        be ready for the next query.
        '''
        time.sleep(1)

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
