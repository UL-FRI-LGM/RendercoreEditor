import { Mesh } from "./Mesh.js";
import { GPUPrimitiveTopology } from "../core/ENUM/GPUPrimitiveTopology.js";
import { CubeGeometry } from "./CubeGeometry.js";
import { MeshBasicMaterial } from "../materials/MeshBasicMaterial.js";
import { Vector3 } from "../math/Vector3.js";


export class Cube extends Mesh {
	static DEFAULT = {
		NAME: "",
		TYPE: "Cube",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new CubeGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
				}
			}
		),
		MATERIAL: new MeshBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: GPUPrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Cube.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Cube.DEFAULT.TYPE,
			
				visible: (args.visible !== undefined) ? args.visible : Cube.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Cube.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : Cube.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Cube.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Cube.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Cube.DEFAULT.PRIMITIVE,
			}
		);
	}
};