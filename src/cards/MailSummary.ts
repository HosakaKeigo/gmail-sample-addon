const MailSummaryCard = (summary: string): GoogleAppsScript.Card_Service.Card => {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Mail Summary"))
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newDecoratedText()
          .setTopLabel("要約")
          .setText(summary),
      ),
    )
    .build();
};