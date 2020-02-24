'''Module to handle data processing.

[description]
'''
import settings
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
    id = output.hotels(place)
    if settings.runtime.debug:
        print("DEBUG: New ID is "+ str(id))

    # if id == -1: #something didn't work right. Return now.
    #     return

    rating, user_ratings_total = ratings(place)
    output.ratings(id, rating, user_ratings_total)
    
    details = gather.get_data(place)
    user_reviews = reviews(details)
    output.reviews(id, user_reviews)

    # Testing purposes only? May remove later
    print(f"{place['name']} rating: {rating}({user_ratings_total})")


def process():
    """Process and store the data gathered.

    """
    data = gather.get_data()
    if 'error' in data:
        print(data['error'])
        exit(-1)

    count = 0
    while 'next_page_token' in data:
        for place in data['results']:
            if settings.runtime.debug and count >= 2:
                break # TESTING to limit API queries.
            single_place(place)
            count += 1
        data = gather.get_data(None, data['next_page_token'])
