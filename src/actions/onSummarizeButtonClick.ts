function onSummarizeButtonClick(e: GoogleAppsScript.Addons.EventObject):
  GoogleAppsScript.Card_Service.ActionResponse {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["onSummarizeButtonClick", JSON.stringify(e)]);
  try {
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
  } catch (error) {
    console.error(error);
    return CardService.newActionResponseBuilder()
      .setNavigation(
        CardService
          .newNavigation()
          .pushCard(ErrorPageCard()))
      .setNotification(
        CardService.newNotification()
          .setText("エラーが発生しました。")
      ).build()
  }
}

function summarizeMail() {
  throw new Error("要約中にエラーが発生しました");
  return "メールを要約しました"
}
