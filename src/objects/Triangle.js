import { Mesh } from "./Mesh.js";
import { Vector3 } from "../math/Vector3.js";
import { TriangleGeometry } from "./TriangleGeometry.js";
import { TriangleBasicMaterial } from "../materials/TriangleBasicMaterial.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";


export class Triangle extends Mesh {

	
	static DEFAULT = {
		NAME: "",
		TYPE: "Triangle",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new TriangleGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 1, 0), new Vector3(-1, -1, 0), new Vector3(1, -1, 0)],
				}
			}
		),
		MATERIAL: new TriangleBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Triangle.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Triangle.DEFAULT.TYPE,
			
				visible: (args.visible !== undefined) ? args.visible : Triangle.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Triangle.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : Triangle.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Triangle.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Triangle.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Triangle.DEFAULT.PRIMITIVE,
			}
		);
	}
};