function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchQoute() {
  var response = UrlFetchApp.fetch("https://firestore.googleapis.com/v1/projects/hugsforjaini/databases/(default)/documents/Qoutes/" + randomInteger(1,1));
  var json = JSON.parse(response)
  Logger.log(json.fields.Qoute.stringValue);
  return json.fields.Qoute.stringValue;
}

function processForm(formObject) {
  var ui = SpreadsheetApp.getUi();
  ui.alert(JSON.stringify(formObject))
  // To access individual values, you would do the following
  var firstName = formObject.firstname 
  //based on name ="firstname" in <input type="text" name="firstname">
  // Similarly
  var lastName = formObject.lastname
  var gender = formObject.gender
  ui.alert (firstName+";"+lastName+";"+gender)
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
    .setHeight(300);
    SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'My add-on');
}
