import { pagePreparationObject } from "./pagePreparation.js"
import { pageScraperObject } from "./pageScraper.js"
import moment from "moment"

const scraperController = async (browserInstance) => {
  // url of Web Page
  const urlString = "https://www.belfast-harbour.co.uk/port/cruise-schedule/"

  // Load initial Web page
  let browser = await browserInstance

  // Load initial Web page
  let pageVariable = await pagePreparationObject.loadInitialWebPage(
    browser,
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

  let finalArray = await scraperArrayFormatter(
    scrapedArray1,
    scrapedArray2,
    scrapedArray3
  )

  console.log(finalArray)

  // Close the browser
  await browser.close()
}

// ------------------------------------------------------------------
const scraperArrayFormatter = async (
  scrapedArray1,
  scrapedArray2,
  scrapedArray3
) => {
  let finalArray = []
  let vesselMovement = []

  for (let i = 0; i < scrapedArray1.length; i++) {
    // First reformat Arrival & Departure times
    let UTCArrivalDate = await dateFormatter(scrapedArray1[i][1])

    let UTCDepartureDate = await dateFormatter(scrapedArray1[i][3])

    vesselMovement.push(scrapedArray1[i][0]) // DAY or OVERNIGHT visit
    vesselMovement.push(UTCArrivalDate) // Arrival Date & Time
    vesselMovement.push(UTCDepartureDate) // Departure Date & Time
    vesselMovement.push(scrapedArray1[i][4]) // Company
    vesselMovement.push(scrapedArray1[i][5]) // Vessel Name

    vesselMovement.push(scrapedArray2[i][0]) // Vessel Length
    vesselMovement.push(scrapedArray2[i][1]) // Number of Passengers
    vesselMovement.push(scrapedArray2[i][2]) // Number of Crew
    vesselMovement.push(scrapedArray2[i][3]) // Name of Belfast Shipping Agent
    vesselMovement.push(scrapedArray2[i][4]) // Number of Belfast Berth
    vesselMovement.push(scrapedArray2[i][5]) // Vessel Description

    vesselMovement.push(scrapedArray3[i]) // Vessel Image

    finalArray.push(vesselMovement)

    // Clear vesselMovement array
    vesselMovement = []
  }

  // console.log(finalArray[0])

  return finalArray
}

// ------------------------------------------------------------------
const dateFormatter = async (scrapedDate) => {
  let arrivalDateTimeString = await scrapedDate

  // Remove Newline character from within the string
  arrivalDateTimeString = await arrivalDateTimeString.replace(
    /(\r\n|\n|\r|\s)/gm,
    ""
  )

  let timeResult = await arrivalDateTimeString.substring(
    arrivalDateTimeString.length - 5
  )

  let dateResult = await arrivalDateTimeString.substring(0, 2)

  let monthResult = await arrivalDateTimeString.substring(
    2,
    arrivalDateTimeString.length - 5
  )

  monthResult = moment().month(monthResult).format("MM")

  let yearResult = new Date().getFullYear()

  let UTCDate = moment
    .utc(
      moment(
        yearResult +
          "-" +
          monthResult +
          "-" +
          dateResult +
          "T" +
          timeResult +
          "Z"
      )
    )
    .format()

  return UTCDate
}
// ------------------------------------------------------------------

export default (browserInstance) => scraperController(browserInstance)
