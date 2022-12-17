import { XHRLoader } from "./XHRLoader.js";
import { Mesh } from "../objects/Mesh.js";
import { RCBufferDescriptor } from "../core/RC/buffers/RCBufferDescriptor.js";
import { MeshGeometry } from "../objects/MeshGeometry.js";
import { MeshBasicMaterial } from "../materials/MeshBasicMaterial.js";
import { Group } from "../objects/Group.js";
import { LoadingManager } from "./LoadingManager.js";
import { GPUVertexFormat } from "../core/ENUM/GPUVertexFormat.js";
import { MeshLambertMaterial } from "../materials/MeshLambertMaterial.js";


export class OBJLoader extends XHRLoader {
	static DEFAULT = {
		NAME: "",
		TYPE: "OBJLoader",

		LOADING_MANAGER: new LoadingManager({ name: "obj loader default loading manager" }),
		RESPONSE_TYPE: "",
		CALLBACK: () => {},
	};
	static EVENT_TO_DATA = (event) => { return OBJLoader.parse(event.target.response); };


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : OBJLoader.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : OBJLoader.DEFAULT.TYPE,

				loadingManager: (args.loadingManager !== undefined) ? args.loadingManager : OBJLoader.DEFAULT.LOADING_MANAGER,
				responseType: (args.responseType !== undefined) ? args.responseType : OBJLoader.DEFAULT.RESPONSE_TYPE,

				onLoadStart: (args.onLoadStart !== undefined) ? args.onLoadStart : OBJLoader.DEFAULT.CALLBACK,
				onProgress: (args.onProgress !== undefined) ? args.onProgress : OBJLoader.DEFAULT.CALLBACK,
				onLoadEnd: (args.onLoadEnd !== undefined) ? args.onLoadEnd : OBJLoader.DEFAULT.CALLBACK,
				onError: (args.onError !== undefined) ? args.onError : OBJLoader.DEFAULT.CALLBACK,
				onAbort: (args.onAbort !== undefined) ? args.onAbort : OBJLoader.DEFAULT.CALLBACK,
			
				eventToData: (args.eventToData !== undefined) ? args.eventToData : OBJLoader.EVENT_TO_DATA,
			}
		);
	}


	async load(url, args = {}) {
		const onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : this.onLoadStart;
		const onProgress = (args.onProgress !== undefined) ? args.onProgress : this.onProgress;
		const onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : this.onLoadEnd;
		const onError = (args.onError !== undefined) ? args.onError : this.onError;
		const onAbort = (args.onAbort !== undefined) ? args.onAbort : this.onAbort;

		const eventToData = (args.eventToData !== undefined) ? args.eventToData : this.eventToData;

		const promise = super.load(
			url, 
			{
				onLoadStart: onLoadStart,
				onProgress: onProgress,
				onLoadEnd: onLoadEnd, 
				onError: onError,
				onAbort: onAbort,
				eventToData: eventToData,
			}
		);


		return promise;
	}

	static parse(text) {
		const objects = [];
		let object;
		let foundObjects = false;
		const vertices = [];
		const normals = [];
		const uvs = [];

		function addObject(name) {
			var geometry = {
				vertices: [],
				normals: [],
				uvs: []
			};

			var material = {
				name: "",
				smooth: true
			};

			object = {
				name: name,
				geometry: geometry,
				material: material
			};

			objects.push(object);
		}

		function parseVertexIndex(value) {
			var index = parseInt(value);

			return ( index >= 0 ? index - 1 : index + vertices.length / 3 ) * 3;
		}

		function parseNormalIndex(value) {
			var index = parseInt(value);

			return ( index >= 0 ? index - 1 : index + normals.length / 3 ) * 3;
		}

		function parseUVIndex(value) {
			var index = parseInt(value);

			return ( index >= 0 ? index - 1 : index + uvs.length / 2 ) * 2;
		}

		function addVertex(a, b, c) {
			object.geometry.vertices.push(
				vertices[a], vertices[a + 1], vertices[a + 2],
				vertices[b], vertices[b + 1], vertices[b + 2],
				vertices[c], vertices[c + 1], vertices[c + 2]
			);
		}

		function addNormal(a, b, c) {
			object.geometry.normals.push(
				normals[a], normals[a + 1], normals[a + 2],
				normals[b], normals[b + 1], normals[b + 2],
				normals[c], normals[c + 1], normals[c + 2]
			);
		}

		function addUV(a, b, c) {
			object.geometry.uvs.push(
				uvs[a], uvs[a + 1],
				uvs[b], uvs[b + 1],
				uvs[c], uvs[c + 1]
			);
		}

		function addFace(a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd) {
			var ia = parseVertexIndex(a);
			var ib = parseVertexIndex(b);
			var ic = parseVertexIndex(c);
			var id;

			if (d === undefined) {
				addVertex(ia, ib, ic);
			}
			else {
				id = parseVertexIndex(d);
				addVertex(ia, ib, id);
				addVertex(ib, ic, id);
			}

			if (ua !== undefined) {
				ia = parseUVIndex(ua);
				ib = parseUVIndex(ub);
				ic = parseUVIndex(uc);

				if (d === undefined) {
					addUV(ia, ib, ic);
				}
				else {
					id = parseUVIndex(ud);
					addUV(ia, ib, id);
					addUV(ib, ic, id);
				}
			}

			if (na !== undefined) {
				ia = parseNormalIndex(na);
				ib = parseNormalIndex(nb);
				ic = parseNormalIndex(nc);

				if (d === undefined) {
					addNormal(ia, ib, ic);
				}
				else {
					id = parseNormalIndex(nd);

					addNormal(ia, ib, id);
					addNormal(ib, ic, id);
				}
			}
		}

		addObject("");

		// v float float float
		const vertex_pattern = /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/;

		// vn float float float
		const normal_pattern = /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/;

		// vt float float
		const uv_pattern = /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/;

		// f vertex vertex vertex ...
		const face_pattern1 = /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/;

		// f vertex/uv vertex/uv vertex/uv ...
		const face_pattern2 = /^f\s+((-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+))(?:\s+((-?\d+)\/(-?\d+)))?/;

		// f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...
		const face_pattern3 = /^f\s+((-?\d+)\/(-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+)\/(-?\d+))\s+((-?\d+)\/(-?\d+)\/(-?\d+))(?:\s+((-?\d+)\/(-?\d+)\/(-?\d+)))?/;

		// f vertex//normal vertex//normal vertex//normal ...
		const face_pattern4 = /^f\s+((-?\d+)\/\/(-?\d+))\s+((-?\d+)\/\/(-?\d+))\s+((-?\d+)\/\/(-?\d+))(?:\s+((-?\d+)\/\/(-?\d+)))?/;

		const object_pattern = /^[og]\s*(.+)?/;

		const smoothing_pattern = /^s\s+(\d+|on|off)/;

		// ACTUAL PARSING
		const lines = text.split("\n");

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();


			let result;

			if (line.length === 0 || line.charAt(0) === "#") {
				continue;
			}
			else if (( result = vertex_pattern.exec(line) ) !== null) {
				// ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
				vertices.push(
					parseFloat(result[1]),
					parseFloat(result[2]),
					parseFloat(result[3])
				);
			}
			else if (( result = normal_pattern.exec(line) ) !== null) {
				// ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
				normals.push(
					parseFloat(result[1]),
					parseFloat(result[2]),
					parseFloat(result[3])
				);
			}
			else if (( result = uv_pattern.exec(line) ) !== null) {
				// ["vt 0.1 0.2", "0.1", "0.2"]
				uvs.push(
					parseFloat(result[1]),
					parseFloat(result[2])
				);
			}
			else if (( result = face_pattern1.exec(line) ) !== null) {
				// ["f 1 2 3", "1", "2", "3", undefined]
				addFace(
					result[1], result[2], result[3], result[4]
				);
			}
			else if (( result = face_pattern2.exec(line) ) !== null) {
				// ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]
				addFace(
					result[2], result[5], result[8], result[11],
					result[3], result[6], result[9], result[12]
				);
			}
			else if (( result = face_pattern3.exec(line) ) !== null) {
				// ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]
				addFace(
					result[2], result[6], result[10], result[14],
					result[3], result[7], result[11], result[15],
					result[4], result[8], result[12], result[16]
				);
			}
			else if (( result = face_pattern4.exec(line) ) !== null) {
				// ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]
				addFace(
					result[2], result[5], result[8], result[11],
					undefined, undefined, undefined, undefined,
					result[3], result[6], result[9], result[12]
				);
			}
			else if (( result = object_pattern.exec(line) ) !== null) {
				// o object_name
				// or
				// g group_name
				const name = result[0].substr(1).trim();

				if (foundObjects === false) {
					foundObjects = true;
					object.name = name;

				}
				else {
					addObject(name);
				}
			}
			else if (/^usemtl /.test(line)) {
				// material
				object.material.name = line.substring(7).trim();
			}
			else if (/^mtllib /.test(line)) {
				// mtl file
			}
			else if (( result = smoothing_pattern.exec(line) ) !== null) {
				// smooth shading
				object.material.smooth = result[1] === "1" || result[1] === "on";
			}
			else {
				throw new Error("Unexpected line: " + line);
			}
		}


		const grupObject = new Group();
		for (let i = 0; i < objects.length; i++) {

			const geometry = objects[i].geometry;

			// Create new buffer geometry
			const meshGeometry = new MeshGeometry();

			// Add position of vertices
			meshGeometry.vertices = new RCBufferDescriptor(
				{
					arrayBuffer: new Float32Array(geometry.vertices), 
					itemSize: 3,
					shaderLocation: 0,
					format: GPUVertexFormat.FLOAT_32x3,
				}
			);

			// Check if normals are specified. Otherwise calculate them
			if (geometry.normals.length > 0) {
				meshGeometry.normals = new RCBufferDescriptor(
					{
						arrayBuffer: new Float32Array(geometry.normals),
						itemSize: 3,
						shaderLocation: 1,
						format: GPUVertexFormat.FLOAT_32x3,
					}
				);
			} else {
				meshGeometry.computeVertexNormals();
			}

			// If specified add texture uv-s
			if (geometry.uvs.length > 0) {
				meshGeometry.uv = new RCBufferDescriptor(
					{
						arrayBuffer: new Float32Array(geometry.uvs),
						itemSize: 2,
						shaderLocation: 2,
						format: GPUVertexFormat.FLOAT_32x2,
					}
				);
			}


			// const meshMaterial = new MeshBasicMaterial();
			const meshMaterial = new MeshLambertMaterial();
			// meshMaterial.shading = objects[i].material.smooth ? SmoothShading : FlatShading;

			// Create new mesh
			const meshObject = new Mesh(
				{
					name: objects[i].name,
					geometry: meshGeometry, 
					material: meshMaterial
				}
			);

			grupObject.add(meshObject);
		}

		return grupObject;
	}
};