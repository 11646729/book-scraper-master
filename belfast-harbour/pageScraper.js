export const scraperObject = {
  async loadInitialWebPage(browserInstance, urlString) {
    // Load initial Web page
    let browser = await browserInstance
    let page = await browser.newPage()
    const url = urlString

    // Navigate to the selected page & wait for it to download
    console.log(`Navigating to ${url} ...`)
    await page.goto(url)

    // Wait for the div to load if necessary
    await page.waitForSelector(
      "#content > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-7999ad4.elementor-section-boxed.elementor-section-height-default > div > div > div > div.elementor-element.elementor-element-1397594.elementor-widget.elementor-widget-shortcode > div"
    )

    return page
  },

  // ------------------------------------------------------------------

  async acceptCookies(pageInstance) {
    let page = await pageInstance

    // Now Accept all Cookies
    const acceptCookiesButtonString = "#wt-cli-accept-all-btn"
    const acceptCookiesButton = await page.$(acceptCookiesButtonString)

    // Check if the Accept Cookies button is disabled or non-existent
    const isAcceptCookiesDisabled = await page.$eval(
      acceptCookiesButtonString,
      (button) => button.disabled
    )

    // If the Accept Cookies button exists then press it
    if (!isAcceptCookiesDisabled) {
      await acceptCookiesButton.click()
      console.log("Accept button pressed")
    }
  },

  // return page
  // ------------------------------------------------------------------

  // Close the browser
  // await browser.close()
  // },
}
