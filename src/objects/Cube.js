import { Mesh } from "./Mesh.js";
import { CubeGeometry } from "./CubeGeometry.js";
import { CubeBasicMaterial } from "../materials/CubeBasicMaterial.js";
import { Vector3 } from "../math/Vector3.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";


export class Cube extends Mesh {


	static DEFAULT = {
		TYPE: "Cube",
		NAME: "",

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
		MATERIAL: new CubeBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				type: (args.type !== undefined) ? args.type : Cube.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Cube.DEFAULT.NAME,
			
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
