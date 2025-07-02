import { QuadBaseGeometryElement } from "../quad/QuadBaseGeometryElement.js";
import { Euler, Vector2, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Dimension } from "../../math/Dimension.js";


export class SpriteBaseGeometryElement extends QuadBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${SpriteBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: SpriteBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				dimension: new Dimension(new Vector2(-0.0, -0.0), new Vector2(+0.0, +0.0)),	// set singularity dimension for offset to work correctly
				directions: [new Vector2(-1.0, -1.0), new Vector2(+1.0, -1.0), new Vector2(-1.0, +1.0), new Vector2(+1.0, +1.0)],
				magnitudes: [+1.0, +1.0, +1.0, +1.0]
			}
		),
		VERTICES: SpriteBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				dimension: new Dimension(new Vector2(-0.0, -0.0), new Vector2(+0.0, +0.0)),	// set singularity dimension for offset to work correctly
				directions: [new Vector2(-1.0, -1.0), new Vector2(+1.0, -1.0), new Vector2(-1.0, +1.0), new Vector2(+1.0, +1.0)],
				magnitudes: [+1.0, +1.0, +1.0, +1.0]
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpriteBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpriteBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : SpriteBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : SpriteBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : SpriteBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : SpriteBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new SpriteBaseGeometryElement(
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

			indexed: (args.indexed !== undefined) ? args.indexed : SpriteBaseGeometryElement.DEFAULT.INDEXED,
			dimension: (args.dimension !== undefined) ? args.dimension : new Dimension(
				new Vector2(-0.0, -0.0),
				new Vector2(+0.0, +0.0)
			),	// set singularity dimension for offset to work correctly
			directions: [
				new Vector2(-1.0, -1.0),
				new Vector2(+1.0, -1.0),
				new Vector2(-1.0, +1.0),
				new Vector2(+1.0, +1.0),
			],
			magnitudes: [
				+1.0,
				+1.0,
				+1.0,
				+1.0,
			]
		};
	}

	static assembleIndicesArray(args = {}) {
		return QuadBaseGeometryElement.assembleIndicesArray(SpriteBaseGeometryElement.#args(args));
	}
	static #assembleDirectionsGeometryArray(args = {}) {
		const itemSize = 2;
		const indicesCount = (args.indexed) ? (6) : (6);
		const verticesCount = (args.indexed) ? (4) : (6);

		const array = new Array(verticesCount * itemSize);

		const directions = args.directions;


		if (args.indexed) {
			array[0 ] = directions[0].x; array[1 ] = directions[0].y; //vertex 0
			array[2 ] = directions[1].x; array[3 ] = directions[1].y; //vertex 1
			array[4 ] = directions[2].x; array[5 ] = directions[2].y; //vertex 2
			array[6 ] = directions[3].x; array[7 ] = directions[3].y; //vertex 3
		} else {
			array[0 ] = directions[0].x; array[1 ] = directions[0].y; //vertex 0
			array[2 ] = directions[1].x; array[3 ] = directions[1].y; //vertex 1
			array[4 ] = directions[2].x; array[5 ] = directions[2].y; //vertex 2
			array[6 ] = directions[2].x; array[7 ] = directions[2].y; //vertex 2
			array[8 ] = directions[1].x; array[9 ] = directions[1].y; //vertex 1
			array[10] = directions[3].x; array[11] = directions[3].y; //vertex 3
		}


		return new GeometryArray(
			{
				name: `VERTICES - DIRECTIONS - ${SpriteBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static #assembleMagnitudesGeometryArray(args = {}) {
		const itemSize = 1;
		const indicesCount = (args.indexed) ? (6) : (6);
		const verticesCount = (args.indexed) ? (4) : (6);

		const array = new Array(verticesCount * itemSize);

		const magnitudes = args.magnitudes;


		if (args.indexed) {
			array[0] = magnitudes[0]; //vertex 0
			array[1] = magnitudes[1]; //vertex 1
			array[2] = magnitudes[2]; //vertex 2
			array[3] = magnitudes[3]; //vertex 3
		} else {
			array[0] = magnitudes[0]; //vertex 0
			array[1] = magnitudes[1]; //vertex 1
			array[2] = magnitudes[2]; //vertex 2
			array[3] = magnitudes[2]; //vertex 2
			array[4] = magnitudes[1]; //vertex 1
			array[5] = magnitudes[3]; //vertex 3
		}


		return new GeometryArray(
			{
				name: `VERTICES - MAGNITUDES - ${SpriteBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${SpriteBaseGeometryElement.name}` },
			[
				...QuadBaseGeometryElement.assembleVerticesMap(SpriteBaseGeometryElement.#args(args)),
				
				["directions", SpriteBaseGeometryElement.#assembleDirectionsGeometryArray(args)],
				["magnitudes", SpriteBaseGeometryElement.#assembleMagnitudesGeometryArray(args)],
			]
		);
	}
};
