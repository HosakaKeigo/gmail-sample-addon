const ErrorPageCard = (): GoogleAppsScript.Card_Service.Card => {
  const footer = CardService.newFixedFooter().setSecondaryButton(
    CardService.newTextButton()
      .setText("戻る")
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName("onBackButtonClick")
          .setLoadIndicator(CardService.LoadIndicator.SPINNER),
      ),
  );

  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("エラー"))
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newTextParagraph().setText(
          "申し訳ございません。エラーが発生しました。",
        ),
      ),
    )
    .setFixedFooter(footer)
    .build();
};