function onDefaultHomePageOpen(
  e: GoogleAppsScript.Addons.EventObject,
): GoogleAppsScript.Card_Service.Card {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["onDefaultHomePageOpen", JSON.stringify(e)]);

  return HomePageCard(); // GoogleAppsScript.Card_Service.Cardを返す
}