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
        form_input = {}
        for gen, val in generic.iteritems():
            form_input[selector_map[gen]] = val

        return form_input

    def fill_form(self, form_params, submit_param):
        """
        Fills out a form and submits it.
        """
        print form_params
        for selector, value in form_params.iteritems():
            self.driver.find_element_by_css_selector(selector).send_keys(value)

        self.driver.find_element_by_css_selector(submit_param).click()

    def get_quote():
        """
        Gets the quote for a given set of inputs.
        """
        pass

    def shutdown():
        self.driver.quit()
