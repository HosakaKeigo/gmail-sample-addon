const HomePageCard = (): GoogleAppsScript.Card_Service.Card => {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("Home Page"))
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newDecoratedText()
          .setTopLabel("Welcome")
          .setText("Hello, World!"),
      ),
    )
    .build(); // buildを忘れないこと。
};