import { pagePreparationObject } from "./pagePreparation.js"
import { pageScraperObject } from "./pageScraper.js"
import { writeFile } from "fs"
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

  // console.log(finalArray.length)

  // Write finalArray data to file named data.json
  // writeFile("data.json", JSON.stringify(finalArray), "utf8", function (err) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log(
  //     "The data has been scraped and saved successfully! View it at './data.json'"
  //   )
  // })

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
    let lengthOfStay = await scrapedArray1[i][0]

    let UTCArrivalDate = await dateFormatter(scrapedArray1[i][1])

    let UTCDepartureDate = await dateFormatter(scrapedArray1[i][3])

    // ------------------------------------------------------------------
    // Now fix end of year overnight arrival not increasing the year in the departure data
    if (lengthOfStay == "OVERNIGHT") {
      let d = new Date(UTCArrivalDate)
      let month = d.getUTCMonth() // Zero based array
      let date = d.getDate() // Zero based array

      if (month == 11 && date == 30) {
        console.log(
          "Modifying OVERNIGHT Year in departure date if vessel arrives on 31st December"
        )

        console.log("Add 1 day to UTCArrivalDate to correct UTCDepartureDate")
        d.setUTCDate(date + 1)
        UTCDepartureDate = d.toISOString()
      }
    }
    // ------------------------------------------------------------------

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
