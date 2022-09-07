function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchQoute() {
  var response = UrlFetchApp.fetch("https://firestore.googleapis.com/v1/projects/hugsforjaini/databases/(default)/documents/Qoutes/" + randomInteger(1,1));
  var json = JSON.parse(response)
  Logger.log(json.fields.Qoute.stringValue);
  return json.fields.Qoute.stringValue;
}

function findRow(searchVal) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var columnCount = sheet.getDataRange().getLastColumn();

  var i = data.flat().indexOf(searchVal); 
  var columnIndex = i % columnCount
  var rowIndex = ((i - columnIndex) / columnCount);

  Logger.log({columnIndex, rowIndex }); // zero based row and column indexes of searchVal
  return i >= 0 ? rowIndex + 1 : "searchVal not found";
}

function addMedia(title, type) {
  if (type === "Movie") {
    ui.alert ("AddMedia Movie")
    var sheet = SpreadsheetApp.getActiveSpreadsheet()//.getSheetByName("Jaini Template");
    var colValues = sheet.getRange("A1:A").getValues();
    var count = colValues.filter(String).length
    sheet.getRange(count+1,4).setValue(title);
  }

  if (type === "Book") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (type === "Bookseries") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (type === "TV") {
    ui.alert (title + "; " + type + "; " + status)
  }
}

function removeMedia(title, type) {
  if (type === "Movie") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (type === "Book") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (type === "Bookseries") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (type === "TV") {
    ui.alert (title + "; " + type + "; " + status)
  }
}

function processForm(formObject) {
  var ui = SpreadsheetApp.getUi();
  //ui.alert(JSON.stringify(formObject))
  // To access individual values, you would do the following
  var title = formObject.title 
  //based on name ="firstname" in <input type="text" name="firstname">
  var type = formObject.type
  var status = formObject.status
  ui.alert (title + "; " + type + "; " + status)

  if (status === "search") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (status === "add") {
    if (type === "Movie") {
      ui.alert ("AddMedia Movie")
      var sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
      var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(lastrow, 1).setValue('skrt');
      sheet1.getRange(lastrow, 2).setValue('Burt');
      sheet1.getRange(findRow("skrt"), 1).setBackgroundRGB(224, 102, 102);
    }

    if (type === "Book") {
      ui.alert (title + "; " + type + "; " + status)
    }

    if (type === "Bookseries") {
      ui.alert (title + "; " + type + "; " + status)
    }

    if (type === "TV") {
      ui.alert (title + "; " + type + "; " + status)
    }
  }

  if (status === "active") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (status === "finished_try_later") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (status === "unfinished_try_later") {
    ui.alert (title + "; " + type + "; " + status)
  }

  if (status === "remove") {
    removeMedia(title, type)
  }
}

function myFunction() {
  // Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var htmlOutput = HtmlService
    .createHtmlOutput('<img src="https://picsum.photos/200/300" alt="Jaini and Viraj" width="100%" object-fit="cover" border="1"> <p>' + fetchQoute() + '</p>')
    .setTitle('Message of the Day!!');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
  
  var htmlOutput = HtmlService
    .createHtmlOutputFromFile('Form')
    .setWidth(250)
    .setHeight(450);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Modify List');
}
