"""
Author: Amol Kapoor
Description: Scraper for custom ink
"""

import urllib2
from bs4 import BeautifulSoup

import base_scraper

class CustomInkScraper(base_scraper.Scraper):
    """
    Scraper for custom ink. Requires product name, color, number, colors on
    front and back, and delivery zipcode.
    """

    product_to_id = {
            "tshirt": (4100, 160800),
            "longsleeved": (225900, 300500)
            }

    def __init__(self, item_params):
        super(CustomInkScraper, self).__init__(item_params)
        self.base_url = 'https://www.customink.com/'

    def _product_to_id(self, product):
        product_to_id = CustomInkScraper.product_to_id
        return product_to_id[product] if product in product_to_id else None

    def get_quote(self):
        print self._product_to_id(self.item_params['product_name'])


if __name__=="__main__":
    item_params = {
            'product_name': 'tshirt'
            'quantity': 10,
            'color_front': 2,
            'color_back:': 3,
            'zipcode': '07920'
            }
    scraper = CustomInkScraper(item_params)
    scraper.get_quote()
