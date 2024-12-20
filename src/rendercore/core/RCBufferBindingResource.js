import { BindingResource } from "./BindingResource.js";


export class RCBufferBindingResource extends BindingResource {


	#buffer;
	#offset;
	#size;


	constructor(args = {}) {
		super(args);

		this.buffer = (args.buffer !== undefined) ? args.buffer : undefined;
		this.offset = (args.offset !== undefined) ? args.offset : 0;
		this.size = (args.size !== undefined) ? args.size : undefined;
	}


	get buffer() { return this.#buffer; }
	set buffer(buffer) { this.#buffer = buffer; }
	get offset() { return this.#offset; }
	set offset(offset) { this.#offset = offset; }
	get size() { return this.#size; }
	set size(size) { this.#size = size; }
};
