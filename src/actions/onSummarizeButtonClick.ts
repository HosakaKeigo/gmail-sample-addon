function onSummarizeButtonClick(e: GoogleAppsScript.Addons.EventObject):
  GoogleAppsScript.Card_Service.ActionResponse {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow(["onSummarizeButtonClick", JSON.stringify(e)]);
  const { message } = getGmailInfo(e)
  const mailInfo = createMailInfo(message);

  try {
    const summary = summarizeMail(mailInfo);
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

function summarizeMail(mailInfo: string) {
  const vertexAI = new VertexAIService("gemini-1.5-flash"); // 複数モデルを使い分けたい場合は、スクリプトプロパティからモデル名を取得するなどしてください。
  const schema = {
    "type": "OBJECT",
    "properties": {
      "summary": {
        "type": "ARRAY",
        "items": {
          "type": "OBJECT",
          "properties": {
            "subject": {
              "type": "STRING"
            },
            "description": {
              "type": "STRING"
            }
          },
          "required": [
            "subject",
            "description"
          ]
        }
      }
    },
    "required": [
      "summary"
    ]
  }
  const systemPrompt = `あなたはメール要約アシスタントです。

## 与えられるもの
  ビジネスメールの内容が与えられます。

## あなたが行うこと
  内容を理解し、所定の形式に整理・要約してください。

## 回答の形式
  以下のJSON形式。

\`\`\`json
{
  summary:{
    subject: string // 話題のタイトル
    description: string // 話題の詳細。簡潔に。
  }[], // 話題はなるべく細かく切り分け、話題の数だけ配列に追加してください。
}
\`\`\`

いずれの項目も簡潔な日本語を心がけてください。敬語や丁寧語は不要です。氏名の敬称も不要です。

それでは回答してください。

----

`;

  const payload: GeminiRequest = {
    contents: [{
      role: "USER",
      parts: [{
        text: mailInfo
      }]
    }],
    systemInstruction: {
      parts: [{
        text: systemPrompt
      }]
    },
    generationConfig: {
      "temperature": 0,
      "responseMimeType": "application/json",
      "responseSchema": schema
    }
  }

  try {
    const response = vertexAI.generate(payload);
    const json = JSON.parse(response)
    if (validateSummaryAnswer(json)) { // 回答の形式が正しいかチェック
      return json.summary;
    }
    throw new Error("LLMの回答が不正です。");
  }
  catch (e) {
    console.error(e);
    throw new Error("メールの要約に失敗しました。");
  }
}

function validateSummaryAnswer(answer: any): answer is MailSummary {
  if (!answer) return false;
  if (!Array.isArray(answer.summary)) return false;
  for (const s of answer.summary) {
    if (typeof s.subject !== "string") return false;
    if (typeof s.description !== "string") return false;
  }

  return true;
}