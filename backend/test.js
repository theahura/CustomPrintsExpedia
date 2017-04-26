var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://www.customink.com/quotes?product_id=04600');

driver.findElement(By.name('quick_quote[quantity]')).sendKeys('10');
driver.findElement(By.name('quick_quote[front_colors]')).sendKeys('2');
driver.findElement(By.name('quick_quote[back_colors]')).sendKeys('3');
driver.findElement(By.name('quick_quote[postal_code]')).sendKeys('07920');

driver.findElement(By.className('sb-Btn sb-Btn--primary sb-Btn--block')).click();

var text = driver.findElement(By.css('.qq-quotedPrice')).getText();
text.then(function(html){
	console.log(html);
});

driver.quit();