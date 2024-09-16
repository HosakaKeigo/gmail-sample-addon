class VertexAIService {
  private endpoint: string;

  constructor(model: Model) {
    try {
      this.endpoint = this.getEndpoint(model);
    } catch (e) {
      console.error(e);
      throw new Error("Error getting Vertex AI endpoint.");
    }
  }

  generate(payload: GeminiRequest) {
    const headers = {
      "Authorization": "Bearer " + this.getToken(),
      "Content-Type": "application/json"
    }
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload),
      'muteHttpExceptions': true,
      'headers': headers
    };

    const response = UrlFetchApp.fetch(this.endpoint, options)
    const json = JSON.parse(response.getContentText()) as GeminiResponse;

    return json.candidates[0].content.parts[0].text
  }

  private getEndpoint(model: Model) {
    const scriptProperties = PropertiesService.getScriptProperties();
    const getScriptProperty = (key: string) => {
      try {
        return scriptProperties.getProperty(key);
      } catch (e) {
        throw (`Error getting ${key} from script properties.`);
      }
    }
    const location = getScriptProperty("LOCATION_ID");

    return `https://${location}-aiplatform.googleapis.com/v1/projects/${getScriptProperty("PROJECT_ID")}/locations/${location}/publishers/google/models/${model}:generateContent`
  }

  private getToken() {
    return ScriptApp.getOAuthToken();
  }
}