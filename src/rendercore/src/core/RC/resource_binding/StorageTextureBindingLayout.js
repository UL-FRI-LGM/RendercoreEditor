export class StorageTextureBindingLayout{


	#access;
	#format;
	#viewDimension;


	constructor(args = {}){
		this.access = (args.access !== undefined) ? args.access : undefined;
		this.format = (args.format !== undefined) ? args.format : undefined;
		this.viewDimension = (args.viewDimension !== undefined) ? args.viewDimension : undefined;
	}


	get access() { return this.#access; }
	set access(access) { this.#access = access; }
	get format() { return this.#format}
	set format(format) { this.#format = format; }
	get viewDimension() { return this.#viewDimension}
	set viewDimension(viewDimension) { this.#viewDimension = viewDimension; }
};
