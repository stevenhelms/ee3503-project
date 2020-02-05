#!/usr/bin/python

import googlemaps

API_KEY='AIzaSyCz8mVDD5nw0KggnS27ppTyfHhyEGvhhQI'


def get_data(params={}):
    """This function will gather remote data and return a JSON dictionary

    Parameters:
        url (str): The URL to gather data from

    Returns:
        dict: A dictionary of the retrieved JSON data

	"""
	
	# Coordinates to Blue Bay Cottage where I stayed the last time
	# I visited the island.
    latitude = 17.740033
    longitude = -88.028298

    gmaps = googlemaps.Client(key=API_KEY)
	
    places = gmaps.places_nearby(
	    [latitude,longitude], # location: long, lat
	    2500, # radius
	    None, # keyword
	    None, # language
	    None, # min price
	    None, # max price
	    None, # name
	    None, # open now
	    None, # rank_by (prominence, distance)
	    'lodging' # type
	)

    return places

def process(data):
    """Process and store the data gathered
    
    [description]
    
    Arguments:
        data JSON object -- results from an API call

    """
    for place in data['results']:
		# init a few variables we'll need
	    user_ratings = 0
	    rating = 0

	    # rating and user_ratings_total may not exist when the hotel
	    # is new and/or unrated.
	    if 'rating' in place:
	        rating = place['rating']
	    if 'user_ratings_total' in place:
	        user_ratings = place['user_ratings_total']

	    print(f"{place['name']} rating: {rating}({user_ratings})")


if __name__ == '__main__':
	data = get_data()
	process(data)