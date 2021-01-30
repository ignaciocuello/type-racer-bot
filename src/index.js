const {Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy');
const HomePage = require('./pom/HomePage');
const RacePage = require('./pom/RacePage');

(async function runTypeRacerBot() {
  const options = new chrome.Options();
  //options.addArguments('--proxy-server=http://localhost:8081');
  //options.addArguments('--ignore-ssl-errors=yes');
  //options.addArguments('--ignore-certificate-errors');
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    //TODO: get the 125 in racePage from the command line
    await driver.get('https://play.typeracer.com/');
    const homePage = new HomePage(driver);
    const racePage = new RacePage(driver, 125);

    await homePage.enterRace(driver);
    await racePage.typeTargetWords(driver);
  } finally {
    await driver.quit();
  }
})();
