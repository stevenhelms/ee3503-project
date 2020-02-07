#!/usr/bin/python
#  -*- coding: utf-8 -*-

import sys
import codecs

import gather
import process



if __name__ == '__main__':
    # if sys.platform == "win32":
        # import win_unicode_console
        # from Unicode_win32 import stdout
        # win_unicode_console.enable()
        # sys.stdout = stdout

    sys.stdout = codecs.getwriter('utf8')(sys.stdout.buffer)
    data = gather.get_data()
    if 'error' in data:
        print(data['error'])
        exit(-1)
    process.process(data)
