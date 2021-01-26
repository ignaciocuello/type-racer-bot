//TODO: learn proper commenting ettiquette
//TODO: export this module
/* Class representing the home page for https://play.typeracer.com/
*/
class HomePage {

  constructor(driver) {
    this.driver = driver;
    this.enterRaceBy = By.css('#gwt-uid-1 > a');
  }

  async enterRace() {
    const enterRaceButton =
      await this.driver.wait(until.elementLocated(this.enterRaceBy));
    return await enterRaceButton.click();
  }

}
