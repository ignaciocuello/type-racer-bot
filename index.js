const {Builder} = require('selenium-webdriver');

(async function openGoogle() {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://google.com");
})();
