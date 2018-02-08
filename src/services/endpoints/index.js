"use strict";

import PatternService from './pattern.service';

export default class EndpointService {
	constructor(client){
		this.Pattern = new PatternService(client);
	}
}
