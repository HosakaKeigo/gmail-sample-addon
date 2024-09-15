const HomePageCard = (): GoogleAppsScript.Card_Service.Card => {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle("メール要約AIアシスタント"))
    .addSection(
      CardService.newCardSection().addWidget(
        CardService.newDecoratedText()
          .setTopLabel("使い方")
          .setText("アドオンを起動した状態でメールを選択してください。その後、「要約」ボタンをクリックするとスレッドの内容を要約します。")
          .setWrapText(true), // テキストの折り返しを許可
      ),
    )
    .build();
};