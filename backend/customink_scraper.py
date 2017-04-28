"""
Author: Amol Kapoor
Description: Scraper for customink specifically.
"""

from selenium import webdriver

import base_scraper

class CustomInkScraper(base_scraper.Scraper):

    selector_map = {
            'quantity':     '#quick_quote_quantity',
            'front_colors': '#quick_quote_front_colors',
            'back_colors':  '#quick_quote_back_colors',
            'zipcode':      '#quick_quote_postal_code',
    }

    submit_selector = '.sb-Btn.sb-Btn--primary.sb-Btn--block'

    def get_quote(self, inputs):

        form_inputs = self._map_params_to_selectors(inputs,
                CustomInkScraper.selector_map)

        self.driver.get('https://www.customink.com/quotes?product_id=04600')
        self._fill_form(form_inputs, CustomInkScraper.submit_selector)
        return self.driver.find_element_by_css_selector('.qq-quotedPrice').text

if __name__ == '__main__':
    scraper = CustomInkScraper()

    inputs = {
        'quantity': '10',
        'front_colors': '3',
        'back_colors': '2',
        'zipcode': '07920'
    }

    print scraper.get_quote(inputs)
    scraper.shutdown()
