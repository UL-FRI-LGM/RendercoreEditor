export class SamplerBindingLayout {


	#type;


	constructor(args = {}) {
		this.type = (args.type !== undefined) ? args.type : undefined;
	}

	
	get type() { return this.#type; }
	set type(type) { this.#type = type; }
};
