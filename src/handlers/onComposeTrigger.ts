function onComposeTrigger(e: GoogleAppsScript.Addons.EventObject): GoogleAppsScript.Card_Service.Card {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["onComposeTrigger", JSON.stringify(e)]);

  return ComposePageCard();
}