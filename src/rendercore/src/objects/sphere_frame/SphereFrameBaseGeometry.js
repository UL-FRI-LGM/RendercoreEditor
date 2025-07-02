import { MeshBaseGeometry } from "../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { SphereFrameBaseGeometryElement } from "./SphereFrameBaseGeometryElement.js";


export class SphereFrameBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${SphereFrameBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${SphereFrameBaseGeometry.name}` },
			new SphereFrameBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SphereFrameBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrameBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : SphereFrameBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new SphereFrameBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
