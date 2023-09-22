const { Builder, By, until } = require("selenium-webdriver");

async function performActionInBrowser() {
  let driver;

  try {
    // Launch a browser instance (in this case, Firefox)
    driver = await new Builder().forBrowser("firefox").build();

    // Navigate to the actual web page URL
    await driver.get('http://intersportgames.dk/tombola'); // Replace with the actual URL

    // Wait for the page to be fully loaded
    await driver.wait(until.elementLocated(By.className("testButton")));

    // Find the button by its class name ("testButton") and click it
    const testButton = await driver.findElement(By.className("testButton"));
    await testButton.click();

    // Delay for a moment (you can adjust the time as needed)
    await driver.sleep(2000); // 2 seconds

  } catch (error) {
    console.error("Error in browser instance:", error);
  } finally {
    if (driver) {
      try {
        // Close the browser
        await driver.quit();
      } catch (quitError) {
        console.error("Error while quitting the browser:", quitError);
      }
    }
  }
}

// Run the script
performActionInBrowser();
