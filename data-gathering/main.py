#!/usr/bin/python
'''
This is the main execution entry point for our backend data gathering
process. It relies on several modules to gather, process, and output
the data for later use by the frontend.

This script is a standalone process that will be scheduled to run
on a regular basis to keep the data fresh and current.
'''

import argparse
import settings
import gather
import process

def main():
    # Setup our CLI to accept an argument to determine which
    # algorithm to run.
    parser = argparse.ArgumentParser(
            description="Gather data from the 3rd party source.")
    parser.add_argument('--csv', action='store_true', dest='use_csv',
            default=False, help="Enable debugging.")
    parser.add_argument('--debug', action='store_true', dest='debug',
            default=False, help="Enable debugging.")
    settings.runtime = parser.parse_args()


if __name__ == '__main__':
    main()
    process.process()