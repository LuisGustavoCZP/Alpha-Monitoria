const scriptProp = PropertiesService.getScriptProperties()

function initialSetup () {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  const sheetName = e.parameter.sheet;
  const lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    const sheet = doc.getSheetByName(sheetName)

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]

    const pi = e.parameter["index"];
    const nextRow = pi?pi:sheet.getLastRow() + 1
    let newRow;
    if(sheetName == "Duvidas") {
      if(e.parameter["voting"] == "true") {
        const row = sheet.getRange(nextRow, 1, 1, 6); 
        const oldVals = row.getValues()[0];
        const i = headers.indexOf("votes");
        newRow = headers.map(function(header, index) {
          return header === 'votes' ? oldVals[index]?`${parseInt(oldVals[index])+1}`:1 : oldVals[index]
        })
      } else {
        newRow = headers.map(function(header) {
          return header === 'date' ? new Date() : header === 'votes' ? 0 : e.parameter[header]
        })
      }
    } else {
      newRow = headers.map(function(header) {
        return header === 'date' ? new Date() : e.parameter[header]
      })
    }
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow, 'voting': e.parameter["voting"] }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (r) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': r }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}

function convertToJson(data) {
  const headers = data[0]
  const raw_data = data.slice(1,)
  let json = []
  raw_data.forEach(d => {
      let object = {}
      for (let i = 0; i < headers.length; i++) {
        object[headers[i]] = d[i]
      }
      json.push(object)
  });
  return json
}

function doGet (e) {
  const sheetName = e.parameter.sheet;
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName(sheetName)
  const data = sheet.getDataRange().getValues()
  const jsonData = convertToJson(data)
  return ContentService
        .createTextOutput(JSON.stringify(jsonData))
        .setMimeType(ContentService.MimeType.JSON)
}

