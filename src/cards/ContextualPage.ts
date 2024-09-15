const ContextualPageCard = (): GoogleAppsScript.Card_Service.Card => {
  const footer = CardService.newFixedFooter().setPrimaryButton(
    CardService.newTextButton()
      .setText("要約")
      .setOnClickAction(
        CardService.newAction()
          .setFunctionName("onSummarizeButtonClick")
          .setLoadIndicator(CardService.LoadIndicator.SPINNER),
      ),
  );

  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Contextual Page"))
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newDecoratedText()
          .setTopLabel("Welcome")
          .setText("Hello, World!"),
      ),
    )
    .setFixedFooter(footer)
    .build();
};