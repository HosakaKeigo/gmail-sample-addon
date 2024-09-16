const ContextualPageCard = (subject: string): GoogleAppsScript.Card_Service.Card => {
  const inputForm = CardService.newTextInput()
    .setFieldName("user_input")
    .setTitle("追加指示")
    .setHint(
      "要約にあたっての追加の指示があれば入力してください。",
    )
    .setMultiline(true)

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
    .setHeader(CardService.newCardHeader().setTitle("メール要約"))
    .addSection(
      CardService.newCardSection()
        .addWidget(
          CardService.newDecoratedText()
            .setTopLabel("件名")
            .setText(subject),
        )
    )
    .addSection(
      CardService.newCardSection()
        .addWidget(inputForm)
    )
    .setFixedFooter(footer)
    .build();
};