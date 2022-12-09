import { RCBufferDescriptor } from "../core/RCBufferDescriptor.js";
import { MeshGeometry } from "./MeshGeometry.js";


export class LineGeometry extends MeshGeometry {
	static DEFAULT = {
		TYPE: "LineGeometry",
		NAME: "",
	};
	

	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : LineGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : LineGeometry.DEFAULT.TYPE,

				indices: (args.indices !== undefined) ? args.indices : LineGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : LineGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : LineGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : LineGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static assembleIndices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;

		if (indexed) {
			//TODO
		} else {
			return null;
		}
	}
	static assembleVertices(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		if (indexed) {

		} else {
			let verticesArray = new Array();

			for (let p = 0; p < positions.length; p+=2) {
				const array = new Array(2 * 3);
				const position1 = positions[p];
				const position2 = positions[p + 1];
				const px1 = position1.x;
				const py1 = position1.y;
				const pz1 = position1.z;
				const px2 = position2.x;
				const py2 = position2.y;
				const pz2 = position2.z;


				array[0] = px1; array[1] = py1; array[2] = pz1;
				array[3] = px2; array[4] = py2; array[5] = pz2;


				verticesArray = verticesArray.concat(array);
			}

			const verticesArrayBuffer = new Float32Array(verticesArray);
			const verticesBufferDescriptor = new RCBufferDescriptor(
                {
                    arrayBuffer: verticesArrayBuffer,
                    itemSize: 3,
                }
            )


			return verticesBufferDescriptor;
		}
	}
	static assembleNormals(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		if (indexed) {
			//TODO
		} else {
			let normalsArray = new Array();

			for (let p = 0; p < positions.length; p+=2) {
				const array = new Array(2 * 3);


				array[0] = +0; array[1] = +0; array[2] = +1;
				array[3] = +0; array[4] = +0; array[5] = +1;


				normalsArray = normalsArray.concat(array);
			}

			const normalsArrayBuffer = new Float32Array(normalsArray);
			const normalsBufferDescriptor = new RCBufferDescriptor(
                {
                    arrayBuffer: normalsArrayBuffer,
                    itemSize: 3,
                }
            )
			// normalsBufferDescriptor.normalize(); // no need to normalize for this configuration


			return normalsBufferDescriptor;
		}
	}
	static assembleUVs(args = {}) {
		const baseGeometry = args.baseGeometry;
		const indexed = args.indexed;
		const positions = baseGeometry.positions;

		if (indexed) {
			//TODO
		} else {
			let uvsArray = new Array();

			for (let p = 0; p < positions.length; p+=2) {
				const array = new Array(2 * 2);


				array[0] = +0; array[1] = +0;
				array[2] = +0; array[3] = +0;


				uvsArray = uvsArray.concat(array);
			}

			const uvsArrayBuffer = new Float32Array(uvsArray);
			const uvsBufferDescriptor = new RCBufferDescriptor(
                {
                    arrayBuffer: uvsArrayBuffer,
                    itemSize: 2,
                }
            )


			return uvsBufferDescriptor;
		}
	}
};