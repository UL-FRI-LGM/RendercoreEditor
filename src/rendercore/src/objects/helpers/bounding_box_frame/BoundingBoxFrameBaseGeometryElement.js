import { BoxFrameBaseGeometryElement } from "../../box_frame/BoxFrameBaseGeometryElement.js";
import { Euler, Vector3 } from "../../../RenderCore.js";
import { Transform } from "../../../math/Transform.js";
import { Cube } from "../../cube/Cube.js";
import { Dimension } from "../../../math/Dimension.js";


export class BoundingBoxFrameBaseGeometryElement extends BoxFrameBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${BoundingBoxFrameBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: BoundingBoxFrameBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				mesh: new Cube()
			}
		),
		VERTICES: BoundingBoxFrameBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				mesh: new Cube()
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingBoxFrameBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingBoxFrameBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : BoundingBoxFrameBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : BoundingBoxFrameBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : BoundingBoxFrameBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : BoundingBoxFrameBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new BoundingBoxFrameBaseGeometryElement(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				transform: (this.transform === Object(this.transform)) ? this.transform.clone() : this.transform,

				indexed: (this.indexed === Object(this.indexed)) ? this.indexed.clone() : this.indexed,

				indices: (this.indices === Object(this.indices)) ? this.indices.clone() : this.indices,
				vertices: (this.vertices === Object(this.vertices)) ? this.vertices.clone() : this.vertices,
			}
		);
	}

	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : BoundingBoxFrameBaseGeometryElement.DEFAULT.INDEXED,
			dimension: (args.mesh !== undefined) ? new Dimension(
				args.mesh.bounding.box.global.objectspace.min,
				args.mesh.bounding.box.global.objectspace.max
			) : new Dimension(
				new Vector3(-1.0, -1.0, -1.0),
				new Vector3(+1.0, +1.0, +1.0)
			),
		};
	}

	static assembleIndicesArray(args = {}) {
		return BoxFrameBaseGeometryElement.assembleIndicesArray(BoundingBoxFrameBaseGeometryElement.#args(args));
	}
	static assembleVerticesMap(args = {}) {
		return BoxFrameBaseGeometryElement.assembleVerticesMap(BoundingBoxFrameBaseGeometryElement.#args(args));
	}
};
