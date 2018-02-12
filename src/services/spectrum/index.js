import EventsService from './events';

export default class SpectrumService {
  constructor(client) {
    this.Events = new EventsService(client);
  }
}
