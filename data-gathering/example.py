# example.py
import requests
import json

DEBUG = True

def get():
    '''
    You may safely ignore this file since you have already been able to collect
    data from a third-party API. This function simply mimics getting data and 
    returns a JSON object that can then be POSTed to the API.
    '''
    try:
        response = requests.get('https://jsonplaceholder.typicode.com/albums',)
    except Exception as e:
        print(e)
        return {}

    return json.loads(response.text)


def go():

    data = get() # simple method to get fake data as an example

    api_key = 'somefakekey'
    '''
    As we improve the security of our API we will enable authentication to keep
    other people from posting data to our application. We configure serveral
    headers that the client (this script) will send to the Django server to
    authenticate us.

    The demo API in this example doesn't need authentication since it just discards
    anything we post, however, we're preparing for something better.
    '''
    headers = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': "Token " + api_key
    }

    current = 1
    max = 3
    for d in data:
        '''
        The fake API returns 100 items, but we only want to see the first few.
        '''
        if current > max:
            break

        if DEBUG:
            print('DEBUG: RECEIVED = '+str(d))
        
        '''
        We have a python dictionary defined by d. We need to take that data
        and reformat it into something our API expects using our naming
        convention.

        We will just create a new object that we can POST.
        '''
        new_data = {
            'id': d['id'],
            'title': d['title'].title(),
        }

        '''Convert our data back to JSON to be posted'''
        json_data = json.dumps(new_data)

        '''
        POST the data back to the REST API.

        This can be done in a single line, but multiple lines are shown here
        as an example of how to debug your data and authentication in the event
        there are problems.
        
        A single line may look like:
            response = requests.post(url, data=data, headers=headers)
        '''
        req = requests.Request('POST', 'https://jsonplaceholder.typicode.com/albums', 
            data = json_data, headers = headers
        )
        prepared = req.prepare()

        print('DEBUG: POST Headers = ' + str(prepared.headers)) # show our custom headers
        print('DEBUG: POST Body = '+ prepared.body) # show us the body which is JSON

        s = requests.Session()
        response = s.send(prepared)
        print("\n")
        print('DEBUG: SERVER RESPOSE CODE = ' +str(response.status_code))
        print('DEBUG: SERVER RESPOSE HEADERS = ' +str(response.headers))
        print('DEBUG: SERVER RESPOSE DATA = ' +str(response.json()))
        print("----------\n\n")
        current += 1



if __name__ == '__main__':
    go()