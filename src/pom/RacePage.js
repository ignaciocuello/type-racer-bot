const {By, until} = require('selenium-webdriver');

//Cheating Test button lol
//div.bodyWidgetHolder > table > tbody > tr > td > button.gwt-Button
class RacePage {
  
  constructor(driver, wordTypingDelay) {
    this.targetTextDivBy =
      By.css('table.inputPanel > tbody > tr > td > table'
        + '> tbody > tr > td > div > div');
    this.textInputBy = By.css('.txtInput');
    this.wordTypingDelay = wordTypingDelay;
    this.driver = driver;
  }


  async typeTargetWords(driver) {
    const targetWords = await this.getTargetWords(driver);
    const textInput = await driver.wait(until.elementLocated(this.textInputBy));

    await driver.wait(until.elementIsEnabled(textInput));
    await this.typeWordsInTextInput(targetWords, textInput);
  }
  
  async getTargetWords(driver) {
    const targetTextDiv =
      await driver.wait(until.elementLocated(this.targetTextDivBy));
    const targetText = await targetTextDiv.getText();
    const targetWords = targetText.split(' ');

    return targetWords;
  }

  async typeWordsInTextInput(targetWords, textInput) {
    for (const targetWord of targetWords) {
      textInput.sendKeys(targetWord + ' ');
      
      await this.waitUntilInputCanAcceptNextWord(textInput);

      //delay until next word, to avoid going too fast (>400WPM) and getting
      //instantly banned.
      await this.sleep(this.wordTypingDelay);
    }
  }

  async waitUntilInputCanAcceptNextWord(textInput) {
      await textInput.getAttribute('maxlength');
  }

  //TODO: probably put this in an external service in case we need it later
  sleep(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}

module.exports = RacePage;
