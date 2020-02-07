'''Module to handle data processing.

[description]
'''

# import unicodedata
import sys
import codecs

import gather
import output

def reviews(details):
    """
    Gather and process user ratings for a particular place.

    Arguments:
        place JSON object - API results for a single location

    """
    if 'reviews' in details['result']:
        return details['result']['reviews']

    return None


def ratings(place):
    """Gather and process place ratings

    Arguments:
        place {dictionary} - Hotel data.

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
        # ratings = user_ratings(place)

    return [rating, user_ratings_total]


def single_place(place):
    '''
    A single hotel is processed by this function.

    Arguments:
        place {dictionary} -- Hotel data.
    '''
    rating, user_ratings_total = ratings(place)
    details = gather.get_data(place)
    user_reviews = reviews(details)

    output.ratings(place['place_id'], rating, user_ratings_total)
    output.reviews(place['place_id'], user_reviews)
    output.hotels(place['place_id'], place)

    # Testing purposes only? May remove later
    print(f"{place['name']} rating: {rating}({user_ratings_total})")


def process(data):
    """Process and store the data gathered.

    Arguments:
        data {dictionary} -- Results from an API call

    """
    while 'next_page_token' in data:
        for place in data['results']:
            single_place(place)
            # break # TESTING to limit API queries.
        data = gather.get_data(None, data['next_page_token'])
