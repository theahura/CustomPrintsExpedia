"""
Author: Amol Kapoor
Description: Handles connections from the client and kicks off webscrapers.
"""

import socketio
from flask import Flask, render_template

import customink_scraper
import vistaprint_scraper

needed_inputs = {'product',
                 'base_color',
                 'quantity',
                 'size',
                 'front_colors',
                 'back_colors',
                 'zipcode'}

def _check_input_fields(inputs):
    """
    Make sure all needed inputs are available for all relevant scrapers.
    """
    return set(inputs.keys()) == needed_inputs

def run_scrapers(inputs):
    """
    Runs all scrapers with a given set of inputs.
    """
    pass


