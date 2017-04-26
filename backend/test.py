from selenium import webdriver

driver = webdriver.PhantomJS()

driver.get('https://www.customink.com/quotes?product_id=04600');

driver.find_element_by_name('quick_quote[quantity]').send_keys('10');
driver.find_element_by_name('quick_quote[front_colors]').send_keys('2');
driver.find_element_by_name('quick_quote[back_colors]').send_keys('3');
driver.find_element_by_name('quick_quote[postal_code]').send_keys('07920');

driver.find_element_by_css_selector('.sb-Btn.sb-Btn--primary.sb-Btn--block').click();

print driver.find_element_by_css_selector('.qq-quotedPrice').text;

driver.quit();
