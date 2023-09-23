import { getPrice } from "../../supabase-tombola";
const { Builder, By, until } = require("selenium-webdriver");
const [hasPrize, setHasPrize] = useState(false);

// Define how many times you want to repeat the action
const repeatCount = 100; // Change this number to the desired repetition count

async function performActionInBrowser() {
  let driver;

  try {
    // Launch a browser instance (in this case, Firefox)
    driver = await new Builder().forBrowser("firefox").build();

    // Navigate to the actual web page URL
    await driver.get('http://intersportgames.dk/tombola'); // Replace with the actual URL

    // Wait for the page to be fully loaded
    await driver.wait(until.elementLocated(By.className("testButton")));

    for (let i = 0; i < repeatCount; i++) {
      // Find the button by its class name ("testButton")
      const testButton = await driver.findElement(By.className("testButton"));

      // Use JavaScript to trigger a click event on the button
      await driver.executeScript("arguments[0].click();", testButton);

      // Delay for a moment (you can adjust the time as needed)
      await driver.sleep(0); // 2 seconds

      // Log "Clicked Balloon" when the button is clicked
      console.log("Clicked Balloon");
      useEffect(() => {
        (async () => {
          if (!hasPrize) return;
    
          const prize = await getPrice();
    
          if (prize) {
            setPrize(prize);
          } else {
            setPrize({
              name: "Nitte",
              message: "Desværre ingen gevinst denne gang",
            });
          }
        })();
      }, [hasPrize]);

    }
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
