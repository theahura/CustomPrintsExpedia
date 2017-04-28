"""
Author: Amol Kapoor
Description: Base scraper class, defines functions necessary for all other
scrapers.
"""

from selenium import webdriver

class Scraper(object):

    def __init__(self):
        self.driver = webdriver.PhantomJS()

    def _map_params_to_selectors(self, generic, selector_map):
        """
        Takes an object with generic inputs and values and converts them to the
        appropriate CSS selector values for a given scraper.
        """
        form_input = {}
        for gen, val in generic.iteritems():
            if gen in selector_map:
                form_input[selector_map[gen]] = val

        return form_input

    def _fill_form(self, form_params, submit_param):
        """
        Fills out a form and submits it.
        """
        for selector, value in form_params.iteritems():
            if value == 'click':
                self.driver.find_element_by_css_selector(selector).click()
            else:
                self.driver.find_element_by_css_selector(selector).send_keys(
                        value)

        self.driver.find_element_by_css_selector(submit_param).click()

    def get_quote(self):
        """
        Gets the quote for a given set of inputs.
        """
        pass

    def shutdown(self):
        self.driver.quit()
