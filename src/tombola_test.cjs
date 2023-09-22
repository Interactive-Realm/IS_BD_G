const { Builder, By, until } = require("selenium-webdriver");

// Define how many times you want to repeat the action
const repeatCount = 5; // Change this number to the desired repetition count

async function performActionInBrowser() {
  let driver;

  try {
    // Launch a browser instance (in this case, Firefox)
    driver = await new Builder().forBrowser("firefox").build();

    for (let i = 0; i < repeatCount; i++) {
      // Navigate to the actual web page URL
      await driver.get('http://intersportgames.dk/tombola'); // Replace with the actual URL

      // Wait for the page to be fully loaded
      await driver.wait(until.elementLocated(By.className("testButton")));

      // Find the button by its class name ("testButton")
      const testButton = await driver.findElement(By.className("testButton"));

      // Use JavaScript to trigger a click event on the button
      await driver.executeScript("arguments[0].click();", testButton);

      // Delay for a moment (you can adjust the time as needed)
      await driver.sleep(2000); // 2 seconds

      // Log "Clicked Balloon" when the button is clicked
      console.log("Clicked Balloon");

      // Close the browser
      await driver.quit();
    }
  } catch (error) {
    console.error("Error in browser instance:", error);
  }
}

// Run the script
performActionInBrowser();
