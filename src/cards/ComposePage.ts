const ComposePageCard = (): GoogleAppsScript.Card_Service.Card => {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Compose Page"))
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newDecoratedText()
          .setTopLabel("Welcome")
          .setText("Hello, World!"),
      ),
    )
    .build();
};