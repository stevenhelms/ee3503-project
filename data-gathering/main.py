#!/usr/bin/python
'''
This is the main execution entry point for our backend data gathering
process. It relies on several modules to gather, process, and output
the data for later use by the frontend.

This script is a standalone process that will be scheduled to run
on a regular basis to keep the data fresh and current.
'''

import sys
import codecs

import gather
import process

if __name__ == '__main__':
    data = gather.get_data()
    if 'error' in data:
        print(data['error'])
        exit(-1)
    process.process(data)
