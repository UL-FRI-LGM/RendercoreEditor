import { MeshBaseGeometryElement } from "../mesh/MeshBaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Dimension } from "../../math/Dimension.js";


export class BoxBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${BoxBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: BoxBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				dimension: new Dimension(new Vector3(-1.0, -1.0, -1.0), new Vector3(+1.0, +1.0, +1.0))
			}
		),
		VERTICES: BoxBaseGeometryElement.assembleVerticesMap(
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

				type: (args.type !== undefined) ? args.type : BoxBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : BoxBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : BoxBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : BoxBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : BoxBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new BoxBaseGeometryElement(
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
		const indicesCount = (args.indexed) ? (36) : (36);
		const verticesCount = (args.indexed) ? (8) : (36);

		const array = new Array(indicesCount * itemSize);


		if (args.indexed) {
			array[0 ] = 0; //vertex 0 //front
			array[1 ] = 1; //vertex 1
			array[2 ] = 2; //vertex 2
			array[3 ] = 2; //vertex 2
			array[4 ] = 1; //vertex 1
			array[5 ] = 3; //vertex 3

			array[6 ] = 1; //vertex 1 //right
			array[7 ] = 5; //vertex 5
			array[8 ] = 3; //vertex 3
			array[9 ] = 3; //vertex 3
			array[10] = 5; //vertex 5
			array[11] = 7; //vertex 7

			array[12] = 5; //vertex 5 //back
			array[13] = 4; //vertex 4
			array[14] = 7; //vertex 7
			array[15] = 7; //vertex 7
			array[16] = 4; //vertex 4
			array[17] = 6; //vertex 6

			array[18] = 4; //vertex 4 //left
			array[19] = 0; //vertex 0
			array[20] = 6; //vertex 6
			array[21] = 6; //vertex 6
			array[22] = 0; //vertex 0
			array[23] = 2; //vertex 2

			array[24] = 2; //vertex 2 //up
			array[25] = 3; //vertex 3
			array[26] = 6; //vertex 6
			array[27] = 6; //vertex 6
			array[28] = 3; //vertex 3
			array[29] = 7; //vertex 7

			array[30] = 4; //vertex 4 //down
			array[31] = 5; //vertex 5
			array[32] = 0; //vertex 0
			array[33] = 0; //vertex 0
			array[34] = 5; //vertex 5
			array[35] = 1; //vertex 1
		} else {
			array[0 ] = 0; //vertex 0 //front
			array[1 ] = 1; //vertex 1
			array[2 ] = 2; //vertex 2
			array[3 ] = 3; //vertex 2
			array[4 ] = 4; //vertex 1
			array[5 ] = 5; //vertex 3

			array[6 ] = 6; //vertex 1 //right
			array[7 ] = 7; //vertex 5
			array[8 ] = 8; //vertex 3
			array[9 ] = 9; //vertex 3
			array[10] = 10; //vertex 5
			array[11] = 11; //vertex 7

			array[12] = 12; //vertex 5 //back
			array[13] = 13; //vertex 4
			array[14] = 14; //vertex 7
			array[15] = 15; //vertex 7
			array[16] = 16; //vertex 4
			array[17] = 17; //vertex 6

			array[18] = 18; //vertex 4 //left
			array[19] = 19; //vertex 0
			array[20] = 20; //vertex 6
			array[21] = 21; //vertex 6
			array[22] = 22; //vertex 0
			array[23] = 23; //vertex 2

			array[24] = 24; //vertex 2 //up
			array[25] = 25; //vertex 3
			array[26] = 26; //vertex 6
			array[27] = 27; //vertex 6
			array[28] = 28; //vertex 3
			array[29] = 29; //vertex 7

			array[30] = 30; //vertex 4 //down
			array[31] = 31; //vertex 5
			array[32] = 32; //vertex 0
			array[33] = 33; //vertex 0
			array[34] = 34; //vertex 5
			array[35] = 35; //vertex 1
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${BoxBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (36) : (36);
		const verticesCount = (args.indexed) ? (8) : (36);

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
			array[6  ] = dmin.x; array[7  ] = dmax.y; array[8  ] = dmax.z; //vertex 2
			array[9  ] = dmin.x; array[10 ] = dmax.y; array[11 ] = dmax.z; //vertex 2
			array[12 ] = dmax.x; array[13 ] = dmin.y; array[14 ] = dmax.z; //vertex 1
			array[15 ] = dmax.x; array[16 ] = dmax.y; array[17 ] = dmax.z; //vertex 3

			array[18 ] = dmax.x; array[19 ] = dmin.y; array[20 ] = dmax.z; //vertex 1 //right
			array[21 ] = dmax.x; array[22 ] = dmin.y; array[23 ] = dmin.z; //vertex 5
			array[24 ] = dmax.x; array[25 ] = dmax.y; array[26 ] = dmax.z; //vertex 3
			array[27 ] = dmax.x; array[28 ] = dmax.y; array[29 ] = dmax.z; //vertex 3
			array[30 ] = dmax.x; array[31 ] = dmin.y; array[32 ] = dmin.z; //vertex 5
			array[33 ] = dmax.x; array[34 ] = dmax.y; array[35 ] = dmin.z; //vertex 7

			array[36 ] = dmax.x; array[37 ] = dmin.y; array[38 ] = dmin.z; //vertex 5 //back
			array[39 ] = dmin.x; array[40 ] = dmin.y; array[41 ] = dmin.z; //vertex 4
			array[42 ] = dmax.x; array[43 ] = dmax.y; array[44 ] = dmin.z; //vertex 7
			array[45 ] = dmax.x; array[46 ] = dmax.y; array[47 ] = dmin.z; //vertex 7
			array[48 ] = dmin.x; array[49 ] = dmin.y; array[50 ] = dmin.z; //vertex 4
			array[51 ] = dmin.x; array[52 ] = dmax.y; array[53 ] = dmin.z; //vertex 6

			array[54 ] = dmin.x; array[55 ] = dmin.y; array[56 ] = dmin.z; //vertex 4 //left
			array[57 ] = dmin.x; array[58 ] = dmin.y; array[59 ] = dmax.z; //vertex 0
			array[60 ] = dmin.x; array[61 ] = dmax.y; array[62 ] = dmin.z; //vertex 6
			array[63 ] = dmin.x; array[64 ] = dmax.y; array[65 ] = dmin.z; //vertex 6
			array[66 ] = dmin.x; array[67 ] = dmin.y; array[68 ] = dmax.z; //vertex 0
			array[69 ] = dmin.x; array[70 ] = dmax.y; array[71 ] = dmax.z; //vertex 2

			array[72 ] = dmin.x; array[73 ] = dmax.y; array[74 ] = dmax.z; //vertex 2 //up
			array[75 ] = dmax.x; array[76 ] = dmax.y; array[77 ] = dmax.z; //vertex 3
			array[78 ] = dmin.x; array[79 ] = dmax.y; array[80 ] = dmin.z; //vertex 6
			array[81 ] = dmin.x; array[82 ] = dmax.y; array[83 ] = dmin.z; //vertex 6
			array[84 ] = dmax.x; array[85 ] = dmax.y; array[86 ] = dmax.z; //vertex 3
			array[87 ] = dmax.x; array[88 ] = dmax.y; array[89 ] = dmin.z; //vertex 7

			array[90 ] = dmin.x; array[91 ] = dmin.y; array[92 ] = dmin.z; //vertex 4 //down
			array[93 ] = dmax.x; array[94 ] = dmin.y; array[95 ] = dmin.z; //vertex 5
			array[96 ] = dmin.x; array[97 ] = dmin.y; array[98 ] = dmax.z; //vertex 0
			array[99 ] = dmin.x; array[100] = dmin.y; array[101] = dmax.z; //vertex 0
			array[102] = dmax.x; array[103] = dmin.y; array[104] = dmin.z; //vertex 5
			array[105] = dmax.x; array[106] = dmin.y; array[107] = dmax.z; //vertex 1
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${BoxBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const itemSize = 3;
		const indicesCount = (args.indexed) ? (36) : (36);
		const verticesCount = (args.indexed) ? (8) : (36);

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
			array[0  ] = +0; array[1  ] = +0; array[2  ] = +1; //vertex 0 //front
			array[3  ] = +0; array[4  ] = +0; array[5  ] = +1; //vertex 1
			array[6  ] = +0; array[7  ] = +0; array[8  ] = +1; //vertex 2
			array[9  ] = +0; array[10 ] = +0; array[11 ] = +1; //vertex 2
			array[12 ] = +0; array[13 ] = +0; array[14 ] = +1; //vertex 1
			array[15 ] = +0; array[16 ] = +0; array[17 ] = +1; //vertex 3

			array[18 ] = +1; array[19 ] = +0; array[20 ] = +0; //vertex 1 //right
			array[21 ] = +1; array[22 ] = +0; array[23 ] = +0; //vertex 5
			array[24 ] = +1; array[25 ] = +0; array[26 ] = +0; //vertex 3
			array[27 ] = +1; array[28 ] = +0; array[29 ] = +0; //vertex 3
			array[30 ] = +1; array[31 ] = +0; array[32 ] = +0; //vertex 5
			array[33 ] = +1; array[34 ] = +0; array[35 ] = +0; //vertex 7

			array[36 ] = +0; array[37 ] = +0; array[38 ] = -1; //vertex 5 //back
			array[39 ] = +0; array[40 ] = +0; array[41 ] = -1; //vertex 4
			array[42 ] = +0; array[43 ] = +0; array[44 ] = -1; //vertex 7
			array[45 ] = +0; array[46 ] = +0; array[47 ] = -1; //vertex 7
			array[48 ] = +0; array[49 ] = +0; array[50 ] = -1; //vertex 4
			array[51 ] = +0; array[52 ] = +0; array[53 ] = -1; //vertex 6

			array[54 ] = -1; array[55 ] = +0; array[56 ] = +0; //vertex 4 //left
			array[57 ] = -1; array[58 ] = +0; array[59 ] = +0; //vertex 0
			array[60 ] = -1; array[61 ] = +0; array[62 ] = +0; //vertex 6
			array[63 ] = -1; array[64 ] = +0; array[65 ] = +0; //vertex 6
			array[66 ] = -1; array[67 ] = +0; array[68 ] = +0; //vertex 0
			array[69 ] = -1; array[70 ] = +0; array[71 ] = +0; //vertex 2

			array[72 ] = +0; array[73 ] = +1; array[74 ] = +0; //vertex 2 //up
			array[75 ] = +0; array[76 ] = +1; array[77 ] = +0; //vertex 3
			array[78 ] = +0; array[79 ] = +1; array[80 ] = +0; //vertex 6
			array[81 ] = +0; array[82 ] = +1; array[83 ] = +0; //vertex 6
			array[84 ] = +0; array[85 ] = +1; array[86 ] = +0; //vertex 3
			array[87 ] = +0; array[88 ] = +1; array[89 ] = +0; //vertex 7

			array[90 ] = +0; array[91 ] = -1; array[92 ] = +0; //vertex 4 //down
			array[93 ] = +0; array[94 ] = -1; array[95 ] = +0; //vertex 5
			array[96 ] = +0; array[97 ] = -1; array[98 ] = +0; //vertex 0
			array[99 ] = +0; array[100] = -1; array[101] = +0; //vertex 0
			array[102] = +0; array[103] = -1; array[104] = +0; //vertex 5
			array[105] = +0; array[106] = -1; array[107] = +0; //vertex 1
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${BoxBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const itemSize = 2;
		const indicesCount = (args.indexed) ? (36) : (36);
		const verticesCount = (args.indexed) ? (8) : (36);

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
			array[4  ] = +0; array[5  ] = +1; //vertex 2
			array[6  ] = +0; array[7  ] = +1; //vertex 2
			array[8  ] = +1; array[9  ] = +0; //vertex 1
			array[10 ] = +1; array[11 ] = +1; //vertex 3

			array[12 ] = +0; array[13 ] = +0; //vertex 1 //right
			array[14 ] = +1; array[15 ] = +0; //vertex 5
			array[16 ] = +0; array[17 ] = +1; //vertex 3
			array[18 ] = +0; array[19 ] = +1; //vertex 3
			array[20 ] = +1; array[21 ] = +0; //vertex 5
			array[22 ] = +1; array[23 ] = +1; //vertex 7

			array[24 ] = +0; array[25 ] = +0; //vertex 5 //back
			array[26 ] = +1; array[27 ] = +0; //vertex 4
			array[28 ] = +0; array[29 ] = +1; //vertex 7
			array[30 ] = +0; array[31 ] = +1; //vertex 7
			array[32 ] = +1; array[33 ] = +0; //vertex 4
			array[34 ] = +1; array[35 ] = +1; //vertex 6

			array[36 ] = +0; array[37 ] = +0; //vertex 4 //left
			array[38 ] = +1; array[39 ] = +0; //vertex 0
			array[40 ] = +0; array[41 ] = +1; //vertex 6
			array[42 ] = +0; array[43 ] = +1; //vertex 6
			array[44 ] = +1; array[45 ] = +0; //vertex 0
			array[46 ] = +1; array[47 ] = +1; //vertex 2

			array[48 ] = +0; array[49 ] = +0; //vertex 2 //up
			array[50 ] = +1; array[51 ] = +0; //vertex 3
			array[52 ] = +0; array[53 ] = +1; //vertex 6
			array[54 ] = +0; array[55 ] = +1; //vertex 6
			array[56 ] = +1; array[57 ] = +0; //vertex 3
			array[58 ] = +1; array[59 ] = +1; //vertex 7

			array[60 ] = +0; array[61 ] = +0; //vertex 4 //down
			array[62 ] = +1; array[63 ] = +0; //vertex 5
			array[64 ] = +0; array[65 ] = +1; //vertex 0
			array[66 ] = +0; array[67 ] = +1; //vertex 0
			array[68 ] = +1; array[69 ] = +0; //vertex 5
			array[70 ] = +1; array[71 ] = +1; //vertex 1
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${BoxBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${BoxBaseGeometryElement.name}` },
			[
				["positions", BoxBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", BoxBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", BoxBaseGeometryElement.#assembleUVsGeometryArray(args)],
			]
		);
	}
};
