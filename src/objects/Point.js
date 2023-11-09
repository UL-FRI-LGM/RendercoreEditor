import { Mesh } from "./Mesh.js";
import { PointGeometry } from "./PointGeometry.js";
import { Vector3 } from "../math/Vector3.js";
import { PointBasicMaterial } from "../materials/PointBasicMaterial.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";


export class Point extends Mesh {

	
	static DEFAULT = {
		TYPE: "Point",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new PointGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
				}
			}
		),
		MATERIAL: new PointBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.POINT_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Point.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Point.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Point.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Point.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : Point.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Point.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Point.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Point.DEFAULT.PRIMITIVE,
			}
		);
	}
};
