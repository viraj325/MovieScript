function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchQoute() {
  var response = UrlFetchApp.fetch("https://firestore.googleapis.com/v1/projects/hugsforjaini/databases/(default)/documents/Qoutes/1");
  var json = JSON.parse(response)
  Logger.log(json.fields.Qoute.stringValue);
  return json.fields.Qoute.stringValue;
}

function myFunction() {
  // Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var htmlOutput = HtmlService
    .createHtmlOutput('<img src="https://picsum.photos/200/300" alt="Jaini and Viraj" width="100%" object-fit="cover" border="1"> <p>' + fetchQoute() + '</p>')
    .setTitle('Message of the Day!!');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);

  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Getting to know you', 'May I know your name?', ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.YES) {
    Logger.log('The user\'s name is %s.', response.getResponseText());
  } else if (response.getSelectedButton() == ui.Button.NO) {
    Logger.log('The user didn\'t want to provide a name.');
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
}
