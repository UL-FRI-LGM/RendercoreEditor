import { Mesh } from "./Mesh.js";
import { QuadGeometry } from "./QuadGeometry.js";
import { Vector2, Vector3 } from "../RenderCore.js";
import { QuadBasicMaterial } from "../materials/QuadBasicMaterial.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive_state/PrimitiveTopology.js";


export class Quad extends Mesh {


	static DEFAULT = {
		TYPE: "Quad",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new QuadGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					sizes: [new Vector2(1, 1)],
				}
			}
		),
		MATERIAL: new QuadBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				type: (args.type !== undefined) ? args.type : Quad.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Quad.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Quad.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Quad.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : Quad.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Quad.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Quad.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Quad.DEFAULT.PRIMITIVE,
			}
		);
	}
};
