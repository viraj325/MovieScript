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
      ui.alert (title + " doesn't exist")
    } else {
      ui.alert (title + " exists in the sheet")
    }
  }

  if (status === "add") {
    if (type === "Movie") {
      ui.alert ("Add Movie")
      const ar = sheet1.getLastRow();
      const Avals = sheet1.getRange("A1:A" + ar).getValues();
      const Alast  = ar - Avals.reverse().findIndex(a => a[0] !='');
      var alr = Alast + 1;
      sheet1.getRange(alr, 1).setValue(title);
      sheet1.getRange(alr, 1).setBackgroundRGB(252, 252, 252);
      //sheet1.getRange(lastrow, 1).setValue('skrt');
      //sheet1.getRange(lastrow, 2).setValue('Burt');
    }

    if (type === "Book") {
      ui.alert ("Add Book")
      const br = sheet1.getLastRow();
      const Cvals = sheet1.getRange("C1:C" + br).getValues();
      const Clast  = br - Cvals.reverse().findIndex(b => b[0] != '');
      var blr = Clast + 1;
      //var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(blr, 3).setValue(title);
      sheet1.getRange(blr, 1).setBackgroundRGB(252, 252, 252);
    }

    if (type === "Bookseries") {
      ui.alert ("Add Book Series")
      const cr = sheet1.getLastRow();
      const Cvals = sheet1.getRange("C1:C" + cr).getValues();
      const Clast  = cr - Cvals.reverse().findIndex(c => c[0] != '');
      var clr = Clast + 1;
      //var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(clr, 3).setValue(title + "(S)");
      sheet1.getRange(clr, 1).setBackgroundRGB(252, 252, 252);
    }

    if (type === "TV") {
      ui.alert ("Add TV")
      const dr = sheet1.getLastRow();
      const Evals = sheet1.getRange("E1:E" + dr).getValues();
      const Elast  = dr - Evals.reverse().findIndex(d => d[0] != '');
      var dlr = Elast + 1;
      //var lastrow = sheet1.getLastRow() + 1;
      sheet1.getRange(dlr, 5).setValue(title);
      sheet1.getRange(dlr, 1).setBackgroundRGB(252, 252, 252);
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
      sheet1.getRange(findRow(title), 1).setBackgroundRGB(98, 98, 98);
    }

    if (type === "Book" || type === "Bookseries") {
      sheet1.getRange(findRow(title), 3).setBackgroundRGB(98, 98, 98);
    }

    if (type === "TV") {
      sheet1.getRange(findRow(title), 5).setBackgroundRGB(98, 98, 98);
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
