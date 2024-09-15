function onSummarizeButtonClick(e: GoogleAppsScript.Addons.EventObject):
  GoogleAppsScript.Card_Service.ActionResponse {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["onSummarizeButtonClick", JSON.stringify(e)]);
  const summary = summarizeMail();
  const summaryCard = MailSummaryCard(summary);
  return CardService.newActionResponseBuilder()
    .setNavigation(
      CardService
        .newNavigation()
        .pushCard(summaryCard))
    .setNotification(
      CardService.newNotification()
        .setText("メールを要約しました。")
    ).build()
}

function summarizeMail() {
  return "メールを要約しました"
}
