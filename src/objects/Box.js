import { Mesh } from "./Mesh.js";
import { BoxGeometry } from "./BoxGeometry.js";
import { BoxBasicMaterial } from "../materials/BoxBasicMaterial.js";
import { Vector3 } from "../math/Vector3.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";


export class Box extends Mesh {


	static DEFAULT = {
		NAME: "",
		TYPE: "Box",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new BoxGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],

					dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
				}
			}
		),
		MATERIAL: new BoxBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : Box.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Box.DEFAULT.TYPE,
			
				visible: (args.visible !== undefined) ? args.visible : Box.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Box.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : Box.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Box.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Box.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Box.DEFAULT.PRIMITIVE,
			}
		);
	}
};
