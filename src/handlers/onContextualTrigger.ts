function onGmailMessageOpen(e: GoogleAppsScript.Addons.EventObject): GoogleAppsScript.Card_Service.Card {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["onContextualTrigger", JSON.stringify(e)]);

  return ContextualPageCard();
}