import { Source } from "./core/data_layouts/Source.js";
import { Destination } from "./core/data_layouts/Destination.js";

import { BufferSetInstruction } from "./core/data_layouts/BufferSetInstruction.js";


export { Source } from "./core/data_layouts/Source.js";
export { Destination } from "./core/data_layouts/Destination.js";

export { BufferSetInstruction } from "./core/data_layouts/BufferSetInstruction.js";


export class Instruction extends Object {


	static Source = Source;
	static Destination = Destination;

	static BufferSetInstruction = BufferSetInstruction;


	constructor(args = {}) {
		super(args);
	}
};
