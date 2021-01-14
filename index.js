const {Builder} = require('selenium-webdriver');

//TODO: understand what async/await do
(async function openGoogle() {
    //TODO: look at Builder doco
    //TODO: look at driver doco
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get("http://google.com");
})();
