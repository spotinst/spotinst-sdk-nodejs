import PatternService from "./pattern";

export default class EndpointService {
  constructor(client) {
    this.Pattern = new PatternService(client);
  }
}
