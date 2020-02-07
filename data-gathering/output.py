'''Output module.

[description]
'''
import os
import pathlib

USE_CSV = True
open_files = []


def open_file(file, headers=''):
    for of in open_files:
        if file in of.name:
            return of

    try:
        f = open(file, "w")
        open_files.append(f)
        if headers:
            f.write(headers)
        return f
    except Exception as e:
        print(e)
    # with open(file, "w") as f:
    #     open_files.append(f)
    #     f.write(headers)
    #     return f

    return None


def rating(id,rating,user_ratings_total):
    global USE_CSV

    if USE_CSV:
        file = "ratings.csv"
        headers = "ID,Rating,Ratings Total\n"

        f = open_file(file, headers)
        if f == None:
            return

        f.write(id + "," + str(rating) +","+ str(user_ratings_total) +"\n")
    else:
        pass


def reviews(id,reviews):
    global USE_CSV

    if reviews == None:
        return

    if USE_CSV:
        file = "reviews.csv"
        headers = "ID,Author,Rating,Text,Time\n"
        f = open_file(file, headers)
        if f == None:
            return

        for review in reviews:
            f.write(id)
            f.write(","+review['author_name'])
            f.write(","+str(review['rating']))
            f.write(","+review['text'][:25])
            f.write(","+str(review['time']))
            f.write("\n")
    else:
        pass


def hotels(id,data):
    global USE_CSV

    if USE_CSV:
        file = "hotels.csv"
        headers = "ID,Name,Address,Phone,Vicinity\n"
        f = open_file(file, headers)
        if f == None:
            return

        f.write(data['place_id'])
        f.write(","+data['name'])
        fa = data['formatted_address'] if 'formatted_address' in data else ''
        f.write(","+fa)
        fpn = data['formatted_phone_number'] if 'formatted_phone_number' in data else ''
        f.write(","+fpn)
        f.write(","+data['vicinity'])
        f.write("\n")
    else:
        pass
