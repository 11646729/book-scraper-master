export const pageScraperObject = {
  async scrapeVesselArrivalDetails(pageInstance) {
    let page = await pageInstance

    // Wait for the table to load if necessary
    await page.waitForSelector("#load_data")

    // Scrape the table data
    const tableData0 = await page.evaluate(() => {
      // Get all the rows from the table
      const rows0 = Array.from(
        document.querySelectorAll("#load_data tr:nth-child(4n+1)")
      )

      // Map through each row and get the cell data
      return rows0.map((row0) => {
        const cells0 = Array.from(row0.querySelectorAll("td")) // day-call or textBlue
        return cells0.map((cell0) => cell0.innerText.trim())
      })
    })

    console.log(tableData0[0][0]) // DAY CALL or OVERNIGHT
    console.log(tableData0[0][1]) // Arrival Date & Time
    // console.log(tableData0[0][2]) // - (Can be ignored)
    console.log(tableData0[0][3]) // Departure Date & Time
    console.log(tableData0[0][4]) // Company
    console.log(tableData0[0][5]) // Vessel Name
    // console.log(tableData0[0][6]) // '' (Can be ignored)

    // ------------------------------------------------------------------

    // Scrape the table data
    const tableData1 = await page.evaluate(() => {
      // Get all the rows from the table
      const rows = Array.from(
        document.querySelectorAll("#load_data tr:nth-child(4n+2)")
      )

      // Map through each row and get the cell data
      return rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("p"))
        return cells.map((cell) => cell.innerText.trim())
      })
    })

    console.log(tableData1[0][0]) // Length in metres
    console.log(tableData1[0][1]) // Number of Passengers
    console.log(tableData1[0][2]) // Number of crew
    console.log(tableData1[0][3]) // Name of Agent in Belfast
    console.log(tableData1[0][4]) // Berth
    console.log(tableData1[0][5]) // Description

    // Fetch the image of the vessel
    // Fetch the src attribute of the first image
    const vesselImg = await page.evaluate(() => {
      // Query the first image on the page
      const img = document.querySelector("#load_data tr:nth-child(4n+2) img")

      // Return the image's src attribute
      return img ? img.src : null
    })

    console.log(vesselImg)
  },
}
