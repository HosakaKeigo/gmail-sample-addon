const MailSummaryCard = (summary: MailSummary["summary"]): GoogleAppsScript.Card_Service.Card => {
  const summaryCard = CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("メール要約"))

  for (const item of summary) {
    summaryCard.addSection(
      CardService.newCardSection().addWidget(
        CardService.newDecoratedText()
          .setTopLabel(item.subject)
          .setText(item.description)
          .setWrapText(true), // テキストの折り返しを許可
      )
    );
  }

  return summaryCard.build();
};