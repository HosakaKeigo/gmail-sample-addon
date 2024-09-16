function testVertexAI() {
  const vertexAI = new VertexAIService("gemini-1.5-flash");
  const payload: GeminiRequest = {
    contents: [{
      role: "USER",
      parts: [{
        text: "This is a test."
      }]
    }],
    systemInstruction: {
      parts: [{
        text: "どんな入力にも「テスト成功」と回答してください。"
      }]
    }
  }
  try {
    const response = vertexAI.generate(payload);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
}