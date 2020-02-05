# Tracking Hotel Reviews on Caye Caulker, Belize

## The Problem
On a small island like Caye Caulker, there are no large chain resorts 
or hotels. Tourists and guests will find an array of small boutique 
hotels, bed and breakfast's, and hostels for the budget traveller.
User reviews are key to finding a quality place to rest.

## The Solution
An application will be created to track user ratings, number of ratings,
key words and phrases in reviews, and price range to rank hotels on the
island.


## The Process
A "full stack" application will be created to provide a quality solution
to the problem. The application will consist of a frontend user interface
(UI) for the end user and a complete backend that will gather, process, 
and store the data.

The backend will be written in the Python programming language and gather
data from the **Google Places API**. A script will gather the data at regular
intervals and store it in an AWS RDS instance. The new dataset will be 
available to the frontend via a REST API served by a webserver using the 
Django web framework.

There will be two frontend user interfaces (UIs) that end users can interact
with. One will be designed for web browsers and dynamically adjust for viewing
on tablets and mobile devices. The second UI will be a native mobile application
available for IOS and Android devices. The frontends will leverage React, 
React Redeax, and React Native JavaScript libraries.
