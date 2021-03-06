import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import environment from '../../environment';

@inject(HttpClient)
export class DataAPI {
  constructor(client) {
    this.client = client.configure(cfg => cfg
      .withBaseUrl(environment.gatewayRootURL)
    );
  }

  getWordsRequest(prefix) {
    return this.client
      .createRequest(`/words?query=${prefix}`)
      .asGet();
  }

  getPronunciationRequest(wordId) {
    return this.client
      .createRequest(`/words/${wordId}/pronunciation`)
      .asGet();
  }

  getWordRequest(wordId) {
    return this.client
      .createRequest(`/words/${wordId}`)
      .asGet();
  }

  getWordPronunciationUpdateRequest(wordId, audioBlob) {
    const formData = new FormData();
    formData.append('pronunciation', audioBlob);
    return this.client
      .createRequest(`/words/${wordId}/pronunciation`)
      .asPut()
      .withContent(formData);
  }

  getWordCreationRequest(word, audioBlob) {
    const formData = new FormData();
    formData.append('word', word);
    formData.append('pronunciation', audioBlob);
    return this.client
      .createRequest('/words')
      .asPut()
      .withContent(formData);
  }
}
