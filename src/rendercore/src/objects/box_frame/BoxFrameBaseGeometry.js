import { MeshBaseGeometry } from "../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { BoxFrameBaseGeometryElement } from "./BoxFrameBaseGeometryElement.js";


export class BoxFrameBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${BoxFrameBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${BoxFrameBaseGeometry.name}` },
			new BoxFrameBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxFrameBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxFrameBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : BoxFrameBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new BoxFrameBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
