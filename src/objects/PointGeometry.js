import { RCBufferDescriptor } from "../core/RCBufferDescriptor.js";
import { MeshGeometry } from "./MeshGeometry.js";


export class PointGeometry extends MeshGeometry {
	static DEFAULT = {
		TYPE: "PointGeometry",
		NAME: "",
	};
	

	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : PointGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : PointGeometry.DEFAULT.TYPE,

				indices: (args.indices !== undefined) ? args.indices : PointGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : PointGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : PointGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : PointGeometry.assembleUVs(args),
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

			for (let p = 0; p < positions.length; p++) {
				const array = new Array(1 * 3);
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;


				array[0] = px; array[1] = py; array[2] = pz;


				verticesArray = verticesArray.concat(array);
			}

			const verticesArrayBuffer = new Float32Array(verticesArray);
			const verticesBufferDescriptor = new RCBufferDescriptor(
                {
                    array: verticesArrayBuffer,
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

			for (let p = 0; p < positions.length; p++) {
				const array = new Array(1 * 3);


				array[0] = +0; array[1] = +0; array[2] = +1;


				normalsArray = normalsArray.concat(array);
			}

			const normalsArrayBuffer = new Float32Array(normalsArray);
			const normalsBufferDescriptor = new RCBufferDescriptor(
                {
                    array: normalsArrayBuffer,
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

			for (let p = 0; p < positions.length; p++) {
				const array = new Array(1 * 2);


				array[0] = +0; array[1] = +0;


				uvsArray = uvsArray.concat(array);
			}

			const uvsArrayBuffer = new Float32Array(uvsArray);
			const uvsBufferDescriptor = new RCBufferDescriptor(
                {
                    array: uvsArrayBuffer,
                    itemSize: 2,
                }
            )


			return uvsBufferDescriptor;
		}
	}
};