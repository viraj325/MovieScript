function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchQoute() {
  var response = UrlFetchApp.fetch("https://firestore.googleapis.com/v1/projects/hugsforjaini/databases/(default)/documents/Qoutes/" + randomInteger(1,1));
  var json = JSON.parse(response)
  Logger.log(json.fields.Qoute.stringValue);
  return json.fields.Qoute.stringValue;
}

function fetchImage() {
  var response = UrlFetchApp.fetch("https://firestore.googleapis.com/v1/projects/hugsforjaini/databases/(default)/documents/Images/" + randomInteger(1,1));
  var json = JSON.parse(response)
  Logger.log(json.fields.Image.stringValue);
  return json.fields.Image.stringValue;
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

function processForm(formObject) {
  var ui = SpreadsheetApp.getUi();
  var sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  var title = formObject.title 
  var type = formObject.type
  var status = PropertiesService.getScriptProperties().getProperty('status');
  ui.alert (title + "; " + type + "; " + status)

  if (status === "search") {
    if(findRow(title) == "searchVal not found") {
      ui.alert (title + " exists in the sheet")
    } else {
      ui.alert (title + " doesn't exist")
    }
  }

  if (status === "add") {
    if (type === "Movie") {
      ui.alert ("Add Movie")
      var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(lastrow, 1).setValue(title);
      //sheet1.getRange(lastrow, 1).setValue('skrt');
      //sheet1.getRange(lastrow, 2).setValue('Burt');
    }

    if (type === "Book") {
      ui.alert ("Add Book")
      var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(lastrow, 3).setValue(title);
    }

    if (type === "Bookseries") {
      ui.alert ("Add Book Series")
      var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(lastrow, 3).setValue(title);
    }

    if (type === "TV") {
      ui.alert ("Add TV")
      var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(lastrow, 5).setValue(title);
    }
  }

  if (status === "active") {
    //change color to green
    ui.alert (title + "; " + type + "; " + status)
    if (type === "Movie") {
      sheet1.getRange(findRow(title), 1).setBackgroundRGB(0, 181, 30);
    }

    if (type === "Book" || type === "Bookseries") {
      sheet1.getRange(findRow(title), 3).setBackgroundRGB(0, 181, 30);
    }

    if (type === "TV") {
      sheet1.getRange(findRow(title), 5).setBackgroundRGB(0, 181, 30);
    }
  }

  if (status === "finished") {
    //change the color to red
    if (type === "Movie") {
      sheet1.getRange(findRow(title), 1).setBackgroundRGB(224, 102, 102);
    }

    if (type === "Book" || type === "Bookseries") {
      sheet1.getRange(findRow(title), 3).setBackgroundRGB(224, 102, 102);
    }

    if (type === "TV") {
      sheet1.getRange(findRow(title), 5).setBackgroundRGB(224, 102, 102);
    }
  }

  if (status === "finished_try_later") {
    //change the color to dark gray
    ui.alert (title + "; " + type + "; " + status)
    if (type === "Movie") {
      sheet1.getRange(findRow(title), 1).setBackgroundRGB(81, 82, 81);
    }

    if (type === "Book" || type === "Bookseries") {
      sheet1.getRange(findRow(title), 3).setBackgroundRGB(81, 82, 81);
    }

    if (type === "TV") {
      sheet1.getRange(findRow(title), 5).setBackgroundRGB(81, 82, 81);
    }
  }

  if (status === "unfinished_try_later") {
    //change the color to light gray
    ui.alert (title + "; " + type + "; " + status)
    if (type === "Movie") {
      sheet1.getRange(findRow(title), 1).setBackgroundRGB(171, 171, 171);
    }

    if (type === "Book" || type === "Bookseries") {
      sheet1.getRange(findRow(title), 3).setBackgroundRGB(171, 171, 171);
    }

    if (type === "TV") {
      sheet1.getRange(findRow(title), 5).setBackgroundRGB(171, 171, 171);
    }
  }

  if (status === "remove") {
    ui.alert ("Still in Development, do it manually...")
  }
}

function myFunction() {
  var htmlOutput = HtmlService
    .createHtmlOutput('<img src="' + fetchImage() + '" alt="Jaini and Viraj" width="100%" object-fit="cover" border="1"> <p>' + fetchQoute() + '</p>')
    .setTitle('Message of the Day!!');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);

  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Jaini Collection')
    .addItem('Add', 'addItem')
    .addItem('In Progress', 'inProgressItem')
    .addItem('Finished', 'finishedItem')
    .addSeparator()
    .addItem('Finished, Try Later', 'finishedTLItem')
    .addItem('Unfinished, Try Later', 'unfinishedTLItem')
    .addSeparator()
    .addItem('Remove', 'removeItem')
    .addSeparator()
    .addItem('Search', 'searchItem')
    .addToUi();
}

function openForm() {
  var htmlOutput = HtmlService
    .createHtmlOutputFromFile('Form')
    .setWidth(250)
    .setHeight(275);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Modify List');
}

function addItem() {
  PropertiesService.getScriptProperties().setProperty('status', 'add');
  openForm()
}

function inProgressItem() {
  PropertiesService.getScriptProperties().setProperty('status', 'active');
  openForm()
}

function finishedItem() {
  PropertiesService.getScriptProperties().setProperty('status', 'finished');
  openForm()
}

function finishedTLItem() {
  PropertiesService.getScriptProperties().setProperty('status', 'finished_try_later');
  openForm()
}

function unfinishedTLItem() {
  PropertiesService.getScriptProperties().setProperty('status', 'unfinished_try_later');
  openForm()
}

function removeItem() {
  PropertiesService.getScriptProperties().setProperty('status', 'remove');
  openForm()
}

function searchItem() {
  PropertiesService.getScriptProperties().setProperty('status', 'search');
  openForm()
}
