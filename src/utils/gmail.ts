/**
 * イベントオブジェクトからGmailの情報を取得する
 */
function getGmailInfo(event: GoogleAppsScript.Addons.EventObject) {
  const messageId = event.gmail.messageId;

  const accessToken = event.gmail.accessToken;
  GmailApp.setCurrentMessageAccessToken(accessToken);

  const message = GmailApp.getMessageById(messageId);

  return {
    messageId,
    message,
  };
}

/**
 * Gmailの内容をLLMに渡す形式に変換する
 */
function createMailInfo(gmail: GoogleAppsScript.Gmail.GmailMessage) {
  return `Date: ${gmail.getDate()}
From: ${gmail.getFrom()}
To: ${gmail.getTo()}
Subject: ${gmail.getSubject()}
Body:
${getMailThreadSnippet(gmail)}`
}

/**
 * メールスレッドの最後から指定文字数分の文字列を取得する
 */
function getMailThreadSnippet(mail: GoogleAppsScript.Gmail.GmailMessage) {
  const thread = getMailThread(mail);
  return removeQuotedText(thread); // 長いメールを扱う可能性があれば、ここで最大文字数の設定・truncateを行うこと
}

function getMailThread(mail: GoogleAppsScript.Gmail.GmailMessage): string {
  return mail
    .getThread()
    .getMessages()
    .map((message, index) => {
      return `【${index + 1}通目】
From: ${message.getFrom()}
To: ${message.getTo()}
Body: ${message.getPlainBody()}`;
    })
    .join("\n ===== \n")
}

/**
 * 引用文箇所を削除する。
 */
function removeQuotedText(emailBody: string): string {
  const lines = emailBody
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, '\n')
    .split('\n');
  const filteredLines = lines.filter(line => !line.trim().startsWith('>'));
  return filteredLines.join('\n');
}