import { QuadBaseGeometry } from "../quad/QuadBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { SpriteBaseGeometryElement } from "./SpriteBaseGeometryElement.js";


export class SpriteBaseGeometry extends QuadBaseGeometry {


	static DEFAULT = {
		TYPE: `${SpriteBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${SpriteBaseGeometry.name}` },
			new SpriteBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpriteBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpriteBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : SpriteBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new SpriteBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
