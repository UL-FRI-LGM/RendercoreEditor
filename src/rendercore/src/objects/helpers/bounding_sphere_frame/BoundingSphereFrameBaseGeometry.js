import { SphereFrameBaseGeometry } from "../../sphere_frame/SphereFrameBaseGeometry.js";
import { ArrayT2 } from "../../../core/ArrayT2.js";
import { BoundingSphereFrameBaseGeometryElement } from "./BoundingSphereFrameBaseGeometryElement.js";


export class BoundingSphereFrameBaseGeometry extends SphereFrameBaseGeometry {


	static DEFAULT = {
		TYPE: `${BoundingSphereFrameBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${BoundingSphereFrameBaseGeometry.name}` },
			new BoundingSphereFrameBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingSphereFrameBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingSphereFrameBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : BoundingSphereFrameBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new BoundingSphereFrameBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
