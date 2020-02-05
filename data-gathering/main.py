#!/usr/bin/python

import os
import time
import googlemaps



def get_data(place=None,pagetoken=None):
    """This function will gather remote data and return a JSON dictionary

    Parameters:
        url (str): The URL to gather data from

    Returns:
        dict: A dictionary of the retrieved JSON data

    """

    api_key = os.getenv("PLACES_API")
    if api_key is None:
        return { 'error': "API key not set in the environment." }

    # Coordinates to Blue Bay Cottage where I stayed the last time
    # I visited the island.
    latitude = 17.740033
    longitude = -88.028298

    gmaps = googlemaps.Client(key=api_key)

    if place is not None and 'place_id' in place:
        print(f"DEBUG: place_id = {place['place_id']}")
        data = gmaps.place(place['place_id'])
        print("DEBUG: "+str(data.keys()))
    else:
        count = 0
        data = None
        while data is None and count < 3:
            try:
                data = gmaps.places_nearby(
                    [latitude,longitude], # location: long, lat
                    2500, # radius
                    None, # keyword
                    None, # language
                    None, # min price
                    None, # max price
                    None, # name
                    None, # open now
                    None, # rank_by (prominence, distance)
                    'lodging', # type
                    pagetoken # the page token, if it exists.
                )
            except googlemaps.exceptions.ApiError:
                print(f"DEBUG: Caught error. Trying again. {count+1}")
                data = None
                count += 1
                time.sleep(3)

    return data



def process_user_ratings(place):
    """Gather and process user ratings for a particular place

    Arguments:
        place JSON object - API results for a single location

    """
    pass


def process_ratings(place):
    """Gather and process place ratings

    Arguments:
        place JSON object - API results for a single location

    """
    # init a few variables we'll need
    user_ratings_total = 0
    rating = 0

    # rating and user_ratings_total may not exist when the hotel
    # is new and/or unrated.
    if 'rating' in place:
        rating = place['rating']

    if 'user_ratings_total' in place:
        user_ratings_total = place['user_ratings_total']
        user_ratings = process_user_ratings(place)


    print(f"{place['name']} rating: {rating}({user_ratings_total})")


def process_prices(place):
    """Gather and process user ratings for a particular place

    """
    pass

def process_single_place(place):
    # details = get_data(place)
    # print(details['status'])

    process_ratings(place)

    # output_csv(place)

    pass


def process(data):
    """Process and store the data gathered

    [description]

    Arguments:
        data JSON object -- results from an API call

    """
    # print(data)
    while 'next_page_token' in data:
        for place in data['results']:
            process_single_place(place)
            # break
        data = get_data(None,data['next_page_token'])
        # print(data)



if __name__ == '__main__':
    data = get_data()
    if 'error' in data:
        print(data['error'])
        exit(-1)
    process(data)
