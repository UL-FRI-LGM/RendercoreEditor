import { ArrayT2 } from "./core/ArrayT2.js";
import { SetT2 } from "./core/SetT2.js";
import { MapT2 } from "./core/MapT2.js";

import { Uint32ArrayT2 } from "./core/Uint32ArrayT2.js";
import { Float32ArrayT2 } from "./core/Float32ArrayT2.js";


export { ArrayT2 } from "./core/ArrayT2.js";
export { SetT2 } from "./core/SetT2.js";
export { MapT2 } from "./core/MapT2.js";

export { Uint32ArrayT2 } from "./core/Uint32ArrayT2.js";
export { Float32ArrayT2 } from "./core/Float32ArrayT2.js";


export class Collection extends Object {


	static ArrayT2 = ArrayT2;
	static SetT2 = SetT2;
	static MapT2 = MapT2;

	static Uint32ArrayT2 = Uint32ArrayT2;
	static Float32ArrayT2 = Float32ArrayT2;


	constructor(args = {}) {
		super(args);
	}
};
