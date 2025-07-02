import { MeshBaseGeometryElement } from "../mesh/MeshBaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Dimension } from "../../math/Dimension.js";


export class BoxFrameBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${BoxFrameBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: BoxFrameBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				dimension: new Dimension(new Vector3(-1.0, -1.0, -1.0), new Vector3(+1.0, +1.0, +1.0))
			}
		),
		VERTICES: BoxFrameBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				dimension: new Dimension(new Vector3(-1.0, -1.0, -1.0), new Vector3(+1.0, +1.0, +1.0))
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxFrameBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxFrameBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : BoxFrameBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : BoxFrameBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : BoxFrameBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : BoxFrameBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new BoxFrameBaseGeometryElement(
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

	static assembleIndicesArray(args = {}) {
		const itemSize = 1;
		const indicesCount = (args.indexed) ? (24) : (24);
		const verticesCount = (args.indexed) ? (8) : (24);

		const array = new Array(indicesCount * itemSize);


		if (args.indexed) {
			array[0 ] = 0; //vertex 0 //front
			array[1 ] = 1; //vertex 1
			array[2 ] = 1; //vertex 1
			array[3 ] = 3; //vertex 3
			array[4 ] = 3; //vertex 3
			array[5 ] = 2; //vertex 2
			array[6 ] = 2; //vertex 2
			array[7 ] = 0; //vertex 0

			array[8 ] = 5; //vertex 5 //back
			array[9 ] = 4; //vertex 4
			array[10] = 4; //vertex 4
			array[11] = 6; //vertex 6
			array[12] = 6; //vertex 6
			array[13] = 7; //vertex 7
			array[14] = 7; //vertex 7
			array[15] = 5; //vertex 5

			array[16] = 0; //vertex 0 //sides
			array[17] = 4; //vertex 4
			array[18] = 1; //vertex 1
			array[19] = 5; //vertex 5
			array[20] = 2; //vertex 2
			array[21] = 6; //vertex 6
			array[22] = 3; //vertex 3
			array[23] = 7; //vertex 7
		} else {
			array[0 ] = 0; //vertex 0 //front
			array[1 ] = 1; //vertex 1
			array[2 ] = 2; //vertex 1
			array[3 ] = 3; //vertex 3
			array[4 ] = 4; //vertex 3
			array[5 ] = 5; //vertex 2
			array[6 ] = 6; //vertex 2
			array[7 ] = 7; //vertex 0

			array[8 ] = 8; //vertex 5 //back
			array[9 ] = 9; //vertex 4
			array[10] = 10; //vertex 4
			array[11] = 11; //vertex 6
			array[12] = 12; //vertex 6
			array[13] = 13; //vertex 7
			array[14] = 14; //vertex 7
			array[15] = 15; //vertex 5

			array[16] = 16; //vertex 0 //sides
			array[17] = 17; //vertex 4
			array[18] = 18; //vertex 1
			array[19] = 19; //vertex 5
			array[20] = 20; //vertex 2
			array[21] = 21; //vertex 6
			array[22] = 22; //vertex 3
			array[23] = 23; //vertex 7
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${BoxFrameBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (24) : (24);
		const verticesCount = (args.indexed) ? (8) : (24);

		const array = new Array(verticesCount * itemSize);

		const dimension = args.dimension;
		const dmin = dimension.min;
		const dmax = dimension.max;


		if (args.indexed) {
			array[0  ] = dmin.x; array[1  ] = dmin.y; array[2  ] = dmax.z; //vertex 0
			array[3  ] = dmax.x; array[4  ] = dmin.y; array[5  ] = dmax.z; //vertex 1
			array[6  ] = dmin.x; array[7  ] = dmax.y; array[8  ] = dmax.z; //vertex 2
			array[9  ] = dmax.x; array[10 ] = dmax.y; array[11 ] = dmax.z; //vertex 3
			array[12 ] = dmin.x; array[13 ] = dmin.y; array[14 ] = dmin.z; //vertex 4		
			array[15 ] = dmax.x; array[16 ] = dmin.y; array[17 ] = dmin.z; //vertex 5
			array[18 ] = dmin.x; array[19 ] = dmax.y; array[20 ] = dmin.z; //vertex 6
			array[21 ] = dmax.x; array[22 ] = dmax.y; array[23 ] = dmin.z; //vertex 7
		} else {
			array[0  ] = dmin.x; array[1  ] = dmin.y; array[2  ] = dmax.z; //vertex 0 //front
			array[3  ] = dmax.x; array[4  ] = dmin.y; array[5  ] = dmax.z; //vertex 1
			array[6  ] = dmax.x; array[7  ] = dmin.y; array[8  ] = dmax.z; //vertex 1
			array[9  ] = dmax.x; array[10 ] = dmax.y; array[11 ] = dmax.z; //vertex 3
			array[12 ] = dmax.x; array[13 ] = dmax.y; array[14 ] = dmax.z; //vertex 3
			array[15 ] = dmin.x; array[16 ] = dmax.y; array[17 ] = dmax.z; //vertex 2
			array[18 ] = dmin.x; array[19 ] = dmax.y; array[20 ] = dmax.z; //vertex 2
			array[21 ] = dmin.x; array[22 ] = dmin.y; array[23 ] = dmax.z; //vertex 0

			array[24 ] = dmax.x; array[25 ] = dmin.y; array[26 ] = dmin.z; //vertex 5 //back
			array[27 ] = dmin.x; array[28 ] = dmin.y; array[29 ] = dmin.z; //vertex 4
			array[30 ] = dmin.x; array[31 ] = dmin.y; array[32 ] = dmin.z; //vertex 4
			array[33 ] = dmin.x; array[34 ] = dmax.y; array[35 ] = dmin.z; //vertex 6
			array[36 ] = dmin.x; array[37 ] = dmax.y; array[38 ] = dmin.z; //vertex 6
			array[39 ] = dmax.x; array[40 ] = dmax.y; array[41 ] = dmin.z; //vertex 7
			array[42 ] = dmax.x; array[43 ] = dmax.y; array[44 ] = dmin.z; //vertex 7
			array[45 ] = dmax.x; array[46 ] = dmin.y; array[47 ] = dmin.z; //vertex 5

			array[48 ] = dmin.x; array[49 ] = dmin.y; array[50 ] = dmax.z; //vertex 0 //sides
			array[51 ] = dmin.x; array[52 ] = dmin.y; array[53 ] = dmin.z; //vertex 4
			array[54 ] = dmax.x; array[55 ] = dmin.y; array[56 ] = dmax.z; //vertex 1
			array[57 ] = dmax.x; array[58 ] = dmin.y; array[59 ] = dmin.z; //vertex 5
			array[60 ] = dmin.x; array[61 ] = dmax.y; array[62 ] = dmax.z; //vertex 2
			array[63 ] = dmin.x; array[64 ] = dmax.y; array[65 ] = dmin.z; //vertex 6
			array[66 ] = dmax.x; array[67 ] = dmax.y; array[68 ] = dmax.z; //vertex 3
			array[69 ] = dmax.x; array[70 ] = dmax.y; array[71 ] = dmin.z; //vertex 7
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${BoxFrameBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (24) : (24);
		const verticesCount = (args.indexed) ? (8) : (24);

		const array = new Array(verticesCount * itemSize);


		if (args.indexed) {
			array[0  ] = -1/Math.sqrt(3); array[1  ] = -1/Math.sqrt(3); array[2  ] = +1/Math.sqrt(3); //vertex 0
			array[3  ] = +1/Math.sqrt(3); array[4  ] = -1/Math.sqrt(3); array[5  ] = +1/Math.sqrt(3); //vertex 1
			array[6  ] = -1/Math.sqrt(3); array[7  ] = +1/Math.sqrt(3); array[8  ] = +1/Math.sqrt(3); //vertex 2
			array[9  ] = +1/Math.sqrt(3); array[10 ] = +1/Math.sqrt(3); array[11 ] = +1/Math.sqrt(3); //vertex 3
			array[12 ] = -1/Math.sqrt(3); array[13 ] = -1/Math.sqrt(3); array[14 ] = -1/Math.sqrt(3); //vertex 4		
			array[15 ] = +1/Math.sqrt(3); array[16 ] = -1/Math.sqrt(3); array[17 ] = -1/Math.sqrt(3); //vertex 5
			array[18 ] = -1/Math.sqrt(3); array[19 ] = +1/Math.sqrt(3); array[20 ] = -1/Math.sqrt(3); //vertex 6
			array[21 ] = +1/Math.sqrt(3); array[22 ] = +1/Math.sqrt(3); array[23 ] = -1/Math.sqrt(3); //vertex 7
		} else {
			array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0
			array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
			array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 1
			array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 3
			array[12 ] = +0; array[13 ] = +0; array[14 ] = +1; //vertex 3
			array[15 ] = +0; array[16 ] = +0; array[17 ] = +1; //vertex 2
			array[18 ] = +0; array[19 ] = +0; array[20 ] = +1; //vertex 2
			array[21 ] = +0; array[22 ] = +0; array[23 ] = +1; //vertex 0 

			array[24 ] = +0; array[25 ] = +0; array[26 ] = -1; //vertex 5 //back
			array[27 ] = +0; array[28 ] = +0; array[29 ] = -1; //vertex 4
			array[30 ] = +0; array[31 ] = +0; array[32 ] = -1; //vertex 4
			array[33 ] = +0; array[34 ] = +0; array[35 ] = -1; //vertex 6
			array[36 ] = +0; array[37 ] = +0; array[38 ] = -1; //vertex 6
			array[39 ] = +0; array[40 ] = +0; array[41 ] = -1; //vertex 7
			array[42 ] = +0; array[43 ] = +0; array[44 ] = -1; //vertex 7
			array[45 ] = +0; array[46 ] = +0; array[47 ] = -1; //vertex 5

			array[48 ] = -1; array[49 ] = +0; array[50 ] = +0; //vertex 0 //sides
			array[51 ] = +0; array[52 ] = +0; array[53 ] = -1; //vertex 4
			array[54 ] = +0; array[55 ] = +0; array[56 ] = +1; //vertex 1
			array[57 ] = +0; array[58 ] = -1; array[59 ] = +0; //vertex 5
			array[60 ] = +0; array[61 ] = +0; array[62 ] = +1; //vertex 2
			array[63 ] = +0; array[64 ] = +1; array[65 ] = +0; //vertex 6
			array[66 ] = +0; array[67 ] = +1; array[68 ] = +0; //vertex 3
			array[69 ] = +0; array[70 ] = +1; array[71 ] = +0; //vertex 7
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${BoxFrameBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const itemSize = 2;
		const indicesCount = (args.indexed) ? (24) : (24);
		const verticesCount = (args.indexed) ? (8) : (24);

		const array = new Array(verticesCount * itemSize);


		if (args.indexed) {
			array[0  ] = +0; array[1  ] = +0; //vertex 0 //front
			array[2  ] = +1; array[3  ] = +0; //vertex 1
			array[4  ] = +0; array[5  ] = +1; //vertex 2
			array[6  ] = +1; array[7  ] = +1; //vertex 3
			array[8  ] = +1; array[9  ] = +0; //vertex 4
			array[10 ] = +1; array[11 ] = +0; //vertex 5
			array[12 ] = +1; array[13 ] = +1; //vertex 6
			array[14 ] = +1; array[15 ] = +1; //vertex 7
		} else {
			array[0  ] = +0; array[1  ] = +0; //vertex 0 //front
			array[2  ] = +1; array[3  ] = +0; //vertex 1
			array[4  ] = +1; array[5  ] = +0; //vertex 1
			array[6  ] = +1; array[7  ] = +1; //vertex 3
			array[8  ] = +1; array[9  ] = +1; //vertex 3
			array[10 ] = +0; array[11 ] = +1; //vertex 2
			array[12 ] = +0; array[13 ] = +1; //vertex 2
			array[14 ] = +0; array[15 ] = +0; //vertex 0

			array[16 ] = +0; array[17 ] = +0; //vertex 5 //back
			array[18 ] = +1; array[19 ] = +0; //vertex 4
			array[20 ] = +1; array[21 ] = +0; //vertex 4
			array[22 ] = +1; array[23 ] = +1; //vertex 6
			array[24 ] = +1; array[25 ] = +1; //vertex 6
			array[26 ] = +0; array[27 ] = +1; //vertex 7
			array[28 ] = +0; array[29 ] = +1; //vertex 7
			array[30 ] = +0; array[31 ] = +0; //vertex 5

			array[32 ] = +1; array[33 ] = +0; //vertex 0 //sides
			array[34 ] = +0; array[35 ] = +0; //vertex 4
			array[36 ] = +1; array[37 ] = +0; //vertex 1
			array[38 ] = +1; array[39 ] = +0; //vertex 5
			array[40 ] = +0; array[41 ] = +0; //vertex 2
			array[42 ] = +0; array[43 ] = +1; //vertex 6
			array[44 ] = +1; array[45 ] = +0; //vertex 3
			array[46 ] = +1; array[47 ] = +1; //vertex 7
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${BoxFrameBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${BoxFrameBaseGeometryElement.name}` },
			[
				["positions", BoxFrameBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", BoxFrameBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", BoxFrameBaseGeometryElement.#assembleUVsGeometryArray(args)],
			]
		);
	}
};
