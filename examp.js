const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver"); // Ensure chromedriver is installed

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to Google
    await driver.get("https://www.google.com");

    // Wait for the Google search bar to be available
    let googleSearchBar = await driver.wait(
      until.elementLocated(By.name("q")),
      20000 // Increased wait time
    );

    // Type "Amazon" in the search bar and press Enter
    await googleSearchBar.sendKeys("Amazon", Key.RETURN);

    // Wait for the search results to load
    let searchResults = await driver.wait(
      until.elementsLocated(By.css("h3")),
      20000 // Increased wait time
    );

    // Find the Amazon link and click it
    for (let result of searchResults) {
      let text = await result.getText();
      if (text.toLowerCase().includes("amazon")) {
        await result.click();
        break;
      }
    }

    // Wait for the Amazon homepage to load
    await driver.wait(until.titleContains("Amazon"), 20000); // Increased wait time

    // Proceed with searching for "T-shirt" on Amazon
    let searchBar = await driver.wait(
      until.elementLocated(By.id("twotabsearchtextbox")),
      20000 // Wait for the Amazon search bar
    );

    await searchBar.sendKeys("T-shirt", Key.RETURN);

    // Wait for the results page to load and verify the title
    await driver.wait(
      until.titleContains("T-shirt"),
      20000 // Wait for T-shirt results
    );

    // Optional: Click on the first T-shirt item
    let firstTshirt = await driver.wait(
      until.elementLocated(By.css(".s-main-slot .s-result-item")),
      20000 // Wait for the first item
    );
    await firstTshirt.click();

    // Wait until the product page loads
    await driver.wait(until.elementLocated(By.id("productTitle")), 20000);

    // Example: Print the product title
    let productTitle = await driver
      .findElement(By.id("productTitle"))
      .getText();
    console.log("Product title:", productTitle);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // Quit the driver after the actions are completed
    await driver.quit();
  }
})();