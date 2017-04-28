"""
Author: Amol Kapoor
Description: Scraper for vistaprint specifically.
"""

from selenium import webdriver

import base_scraper

class VistaPrintScraper(base_scraper.Scraper):

    selector_map = {
            'front_colors': '#ctl01_ctl00_RadioButtonSelector',
            'back_colors':  '#ctl01_ctl01_RadioButtonSelector',
            'zipcode':      'select[name="ShipToCountry"]',
    }

    size_map = {
        'XXXLarge':     'select[name="632"]',
        'XXLarge':      'select[name="73"]',
        'XLarge':       'select[name="72"]',
        'Large':        'select[name="71"]',
        'Medium':       'select[name="70"]',
        'Small':        'select[name="69"]',
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

    def _map_params_to_selectors(self, inputs, selector_map):
        form_inputs = super(VistaPrintScraper, self)._map_params_to_selectors(
                inputs, selector_map)

        # Swaps out quantity for the appropriate selector listed in size map.
        form_inputs[VistaPrintScraper.size_map[inputs['size']]] = inputs[
                'quantity']

        return form_inputs

    def get_quote(self, inputs):
        form_inputs = self._map_params_to_selectors(inputs,
                VistaPrintScraper.selector_map)

        self.driver.get('http://www.vistaprint.co.uk/quote-calculator.aspx')
        print form_inputs
        self._fill_form(form_inputs, VistaPrintScraper.submit_selector)

        self.driver.save_screenshot('temp.png')
        return self.driver.find_element_by_css_selector('.undefined-price').text

if __name__ == '__main__':
    scraper = VistaPrintScraper()

    inputs = {
        'quantity': '10',
        'size': 'Small',
        'back_colors': 'click',
        'zipcode': 'United States'
    }

    print scraper.get_quote(inputs)
    scraper.shutdown()
