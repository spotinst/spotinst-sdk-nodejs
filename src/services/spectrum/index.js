"use strict";
import EventsService from './events.service';

export default class SpectrumService {
	constructor(client){
		this.Events = new EventsService(client);
	}
}
