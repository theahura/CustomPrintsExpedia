"""
Author: Amol Kapoor
Description: Scraper for vistaprint specifically.
"""

from selenium import webdriver

import base_scraper

class VistaPrintScraper(base_scraper.Scraper):

    selector_map = {
            'quantity':     'select[name="71"]',
            'front_colors': '#ctl01_ctl00_RadioButtonSelector',
            'back_colors':  '#ctl01_ctl01_RadioButtonSelector',
            'zipcode':      'select[name="ShipToCountry"]',
    }


    product_selector = '#ctl03_ctl00_ctl00_ctl38_ProductSelectionItem'
    choose_features_selector = '#ui-id-2'
    submit_selector = '#ui-id-3'

    def _fill_form(self, form_params, submit_param):
        self.driver.find_element_by_css_selector(
                VistaPrintScraper.product_selector).click()
        self.driver.find_element_by_css_selector(
                VistaPrintScraper.choose_features_selector).click()
        super(VistaPrintScraper, self)._fill_form(form_params, submit_param)

    def get_quote(self, inputs):
        form_inputs = self._map_params_to_selectors(inputs,
                VistaPrintScraper.selector_map)

        self.driver.get('http://www.vistaprint.co.uk/quote-calculator.aspx')
        self._fill_form(form_inputs, VistaPrintScraper.submit_selector)
        print self.driver.find_element_by_css_selector('.undefined-price').text

if __name__ == '__main__':
    scraper = VistaPrintScraper()

    inputs = {
        'quantity': '10',
        'back_colors': 'click',
        'zipcode': 'United States'
    }

    scraper.get_quote(inputs)
    scraper.shutdown()
