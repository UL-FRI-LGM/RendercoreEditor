export class TextureBindingLayout {


	#sampleType;
	#viewDimension;
	#multisampled


	constructor(args = {}) {
		this.sampleType = (args.sampleType !== undefined) ? args.sampleType : undefined;
		this.viewDimension = (args.viewDimension !== undefined) ? args.viewDimension : undefined;
		this.multisampled = (args.multisampled !== undefined) ? args.multisampled : undefined;
	}


	get sampleType() { return this.#sampleType; }
	set sampleType(sampleType) { this.#sampleType = sampleType; }
	get viewDimension() { return this.#viewDimension }
	set viewDimension(viewDimension) { this.#viewDimension = viewDimension; }
	get multisampled() { return this.#multisampled }
	set multisampled(multisampled) { this.#multisampled = multisampled; }
};
