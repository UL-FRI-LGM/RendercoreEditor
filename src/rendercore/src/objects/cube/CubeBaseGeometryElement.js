import { BoxBaseGeometryElement } from "../box/BoxBaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { Dimension } from "../../math/Dimension.js";


export class CubeBaseGeometryElement extends BoxBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${CubeBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: CubeBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				size: 1
			}
		),
		VERTICES: CubeBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				size: 1
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CubeBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CubeBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : CubeBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : CubeBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : CubeBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : CubeBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new CubeBaseGeometryElement(
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

			indexed: (args.indexed !== undefined) ? args.indexed : CubeBaseGeometryElement.DEFAULT.INDEXED,
			dimension: (args.size !== undefined) ? new Dimension(
				new Vector3(-args.size, -args.size, -args.size),
				new Vector3(+args.size, +args.size, +args.size)
			) : new Dimension(
				new Vector3(-1.0, -1.0, -1.0),
				new Vector3(+1.0, +1.0, +1.0)
			),
		};
	}

	static assembleIndicesArray(args = {}) {
		return BoxBaseGeometryElement.assembleIndicesArray(CubeBaseGeometryElement.#args(args));
	}
	static assembleVerticesMap(args = {}) {
		return BoxBaseGeometryElement.assembleVerticesMap(CubeBaseGeometryElement.#args(args));
	}
};
