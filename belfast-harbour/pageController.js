import { pagePreparationObject } from "./pagePreparation.js"
import { pageScraperObject } from "./pageScraper.js"

const scraperController = async (browserInstance) => {
  // url of Web Page
  const urlString = "https://www.belfast-harbour.co.uk/port/cruise-schedule/"

  // Load initial Web page
  let pageVariable = await pagePreparationObject.loadInitialWebPage(
    browserInstance,
    urlString
  )

  // Accept all cookies
  await pagePreparationObject.acceptCookies(pageVariable)

  // Load all Next Pages
  await pagePreparationObject.loadNextPages(pageVariable)

  // Scrape all the vessel details
  let scrapedArray1 = await pageScraperObject.scrapeVesselArrivalDetails1(
    pageVariable
  )

  let scrapedArray2 = await pageScraperObject.scrapeVesselArrivalDetails2(
    pageVariable
  )

  let scrapedArray3 = await pageScraperObject.scrapeVesselArrivalDetails3(
    pageVariable
  )

  // ARRAY FIELDS
  // console.log(scrapedArray1[0][0]) // DAY CALL or OVERNIGHT
  // console.log(scrapedArray1[0]][1]) // Arrival Date & Time
  // // console.log(scrapedArray1[0][2]) // - (Can be ignored)
  // console.log(scrapedArray1[0][3]) // Departure Date & Time
  // console.log(scrapedArray1[0][4]) // Company
  // console.log(scrapedArray1[0][5]) // Vessel Name
  // // console.log(scrapedArray1[0][6]) // '' (Can be ignored)

  // console.log(scrapedArray2[0][0]) // Vessel Length
  // console.log(scrapedArray2[0][1]) // Number of Passengers
  // console.log(scrapedArray2[0][2]) // Number of Crew
  // console.log(scrapedArray2[0][3]) // Name of Belfast Shipping Agent
  // console.log(scrapedArray2[0][4]) // Number of Belfast Berth
  // console.log(scrapedArray2[0][5]) // Vessel Description

  console.log(scrapedArray3[0]) // Vessel Image

  // Close the browser
  // await browser.close()
}

export default (browserInstance) => scraperController(browserInstance)
