import { BoxFrameBaseGeometry } from "../../box_frame/BoxFrameBaseGeometry.js";
import { ArrayT2 } from "../../../core/ArrayT2.js";
import { BoundingBoxFrameBaseGeometryElement } from "./BoundingBoxFrameBaseGeometryElement.js";


export class BoundingBoxFrameBaseGeometry extends BoxFrameBaseGeometry {


	static DEFAULT = {
		TYPE: `${BoundingBoxFrameBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${BoundingBoxFrameBaseGeometry.name}` },
			new BoundingBoxFrameBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingBoxFrameBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingBoxFrameBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : BoundingBoxFrameBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new BoundingBoxFrameBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
