function onGmailMessageOpen(e: GoogleAppsScript.Addons.EventObject): GoogleAppsScript.Card_Service.Card {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["onContextualTrigger", JSON.stringify(e)]);

  const { message } = getGmailInfo(e);
  const subject = message.getSubject();

  return ContextualPageCard(subject);
}