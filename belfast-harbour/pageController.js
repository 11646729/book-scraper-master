import { scraperObject } from "./pageScraper.js"

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const scraperController = async (browserInstance) => {
  // Load initial Web page
  const urlString = "https://www.belfast-harbour.co.uk/port/cruise-schedule/"

  let pageVariable = scraperObject.loadInitialWebPage(
    browserInstance,
    urlString
  )

  // Accept all cookies
  // let pageVariable2 =
  scraperObject.acceptCookies(pageVariable)

  // console.log(pageVariable2)

  // ------------------------------------------------------------------

  // let hasLoadMoreButton = true

  // // Now load more data
  // const loadMoreButtonString =
  //   "#content > div > div > section.elementor-section.elementor-top-section.elementor-element.elementor-element-7999ad4.elementor-section-boxed.elementor-section-height-default.elementor-section-height-default > div > div > div > div.elementor-element.elementor-element-1397594.elementor-widget.elementor-widget-shortcode > div > div > div > button"

  // const loadMoreButton = await page.$(loadMoreButtonString)

  // while (hasLoadMoreButton)
  //   try {
  //     // Check if the Load More button is disabled or non-existent
  //     const isLoadMoreButtonDisabled = await page.$eval(
  //       loadMoreButtonString,
  //       (button) => button.disabled
  //     )

  //     // If the Load More button exists then press it
  //     if (isLoadMoreButtonDisabled) {
  //       console.log(
  //         "Load More button is disabled or missing, stopping navigation"
  //       )
  //       hasLoadMoreButton = false
  //     } else {
  //       // Click the Load More button
  //       await loadMoreButton.click()
  //       console.log("Load More button pressed")
  //     }

  //     // Wait for the page to load new content
  //     await sleep(1000)
  //   } catch {
  //     console.log("Load More button not found, stopping navigation")
  //     hasLoadMoreButton = false
  //   }

  // // ------------------------------------------------------------------

  // // Wait for the table to load if necessary
  // await page.waitForSelector("#load_data")

  // // Scrape the table data
  // const tableData0 = await page.evaluate(() => {
  //   // Get all the rows from the table
  //   const rows0 = Array.from(
  //     document.querySelectorAll("#load_data tr:nth-child(4n+1)")
  //   )

  //   // Map through each row and get the cell data
  //   return rows0.map((row0) => {
  //     const cells0 = Array.from(row0.querySelectorAll("td")) // day-call or textBlue
  //     return cells0.map((cell0) => cell0.innerText.trim())
  //   })
  // })

  // console.log(tableData0[0][0]) // DAY CALL or OVERNIGHT
  // console.log(tableData0[0][1]) // Arrival Date & Time
  // // console.log(tableData0[0][2]) // - (Can be ignored)
  // console.log(tableData0[0][3]) // Departure Date & Time
  // console.log(tableData0[0][4]) // Company
  // console.log(tableData0[0][5]) // Vessel Name
  // // console.log(tableData0[0][6]) // '' (Can be ignored)

  // // ------------------------------------------------------------------

  // // Scrape the table data
  // const tableData1 = await page.evaluate(() => {
  //   // Get all the rows from the table
  //   const rows = Array.from(
  //     document.querySelectorAll("#load_data tr:nth-child(4n+2)")
  //   )

  //   // Map through each row and get the cell data
  //   return rows.map((row) => {
  //     const cells = Array.from(row.querySelectorAll("p"))
  //     return cells.map((cell) => cell.innerText.trim())
  //   })
  // })

  // console.log(tableData1[0][0]) // Length in metres
  // console.log(tableData1[0][1]) // Number of Passengers
  // console.log(tableData1[0][2]) // Number of crew
  // console.log(tableData1[0][3]) // Name of Agent in Belfast
  // console.log(tableData1[0][4]) // Berth
  // console.log(tableData1[0][5]) // Description

  // // Fetch the image of the vessel
  // // Fetch the src attribute of the first image
  // const vesselImg = await page.evaluate(() => {
  //   // Query the first image on the page
  //   const img = document.querySelector("#load_data tr:nth-child(4n+2) img")

  //   // Return the image's src attribute
  //   return img ? img.src : null
  // })

  // console.log(vesselImg)

  // // ------------------------------------------------------------------

  // // Close the browser
  // await browser.close()
}

export default (browserInstance) => scraperController(browserInstance)
