const {By, until} = require('selenium-webdriver');

//Cheating Test button lol
//div.bodyWidgetHolder > table > tbody > tr > td > button.gwt-Button
class RacePage {

  constructor(driver) {
    this.driver = driver;
    this.textInputBy = By.css('.txtInput');
    this.targetTextDivBy =
      By.css('table.inputPanel > tbody > tr > td > table'
        + '> tbody > tr > td > div > div');
  }


  async typeTargetWords(driver) {
    const targetWords = await getTargetWords(driver);
    const textInput = await driver.wait(until.elementLocated(this.textInputBy));

    await driver.wait(until.elementIsEnabled(textInput));
    await typeWordsInTextInput(targetWords, textInput);
  }
  
  async function getTargetWords(driver) {
    const targetTextDiv =
      await driver.wait(until.elementLocated(this.targetTextDivBy));
    const targetText = await targetTextDiv.getText();
    const targetWords = targetText.split(' ');

    return targetWords;
  }

  async function typeWordsInTextInput(targetWords, textInput) {
    for (targetWord of targetWords) {
      textInput.sendKeys(targetWord + ' ');
      
      await waitUntilInputCanAcceptNextWord(textInput);

      //slow down, so we don't get insta-banned
      await this.sleep(125);
    }
  }

  async function waitUntilInputCanAcceptNextWord(textInput) {
      await textInput.getAttribute('maxlength');
  }

  //TODO: probably put this in an external service in case we need it later
  sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}

module.exports = RacePage;
