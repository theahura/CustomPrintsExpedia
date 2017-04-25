"""
Author: Amol Kapoor
Description: Base class defining functions for scrapers to get quotes from
custom ink sites.
"""

import urllib2
from bs4 import BeautifulSoup

class Scraper(object):

    def __init__(self, item_params):
        self.item_params = item_params
        self.base_url = ""

        # Obj of product names linking to a set of features available for the
        # product.
        self.products = {}

    def get_quote(self):
        """
        Returns the quote given the initialized item parameters and the base
        url. Implemented for each specific vendor. 
        """
        pass
