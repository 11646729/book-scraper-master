import { pagePreparationObject } from "./pagePreparation.js"
import { pageScraperObject } from "./pageScraper.js"
import moment from "moment"

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

  let finalArray = await scraperArrayFormatter(
    scrapedArray1,
    scrapedArray2,
    scrapedArray3
  )

  // Close the browser
  // await browser.close()
}

const scraperArrayFormatter = async (
  scrapedArray1,
  scrapedArray2,
  scrapedArray3
) => {
  let finalArray = []
  let vesselMovement = []

  for (let i = 0; i < scrapedArray1.length; i++) {
    // ---------------------------------------------------------

    // First reformat Arrival times
    let arrivalDateTimeString = scrapedArray1[i][1]

    // Remove Newline character from within the string
    arrivalDateTimeString = arrivalDateTimeString.replace(/(\r\n|\n|\r)/gm, "")

    let timeResult = arrivalDateTimeString.substring(
      arrivalDateTimeString.length - 5
    )

    let dateResult = arrivalDateTimeString.substring(
      0,
      arrivalDateTimeString.length - 5
    )

    let thisYear = new Date().getFullYear()

    let arrivalDate = dateResult + " " + thisYear.toString()

    // ---------------------------------------------------------

    // First reformat Departure times
    let departureDateTimeString = scrapedArray1[i][1]

    // Remove Newline character from within the string
    departureDateTimeString = departureDateTimeString.replace(
      /(\r\n|\n|\r)/gm,
      ""
    )

    let timeResult1 = departureDateTimeString.substring(
      departureDateTimeString.length - 5
    )

    let dateResult1 = departureDateTimeString.substring(
      0,
      departureDateTimeString.length - 5
    )

    let thisYear1 = new Date().getFullYear()

    let departureDate = dateResult1 + " " + thisYear1.toString()

    // ---------------------------------------------------------

    vesselMovement.push(scrapedArray1[i][0]) // DAY or OVERNIGHT visit
    vesselMovement.push(arrivalDate) // Arrival Date & Time
    vesselMovement.push(departureDate) // Departure Date & Time
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

  console.log(finalArray[0])

  return finalArray
}

export default (browserInstance) => scraperController(browserInstance)
