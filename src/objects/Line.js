import { Mesh } from "./Mesh.js";
import { Vector3 } from "../math/Vector3.js";
import { LineGeometry } from "./LineGeometry.js";
import { LineBasicMaterial } from "../materials/LineBasicMaterial.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";


export class Line extends Mesh {


	static DEFAULT = {
		TYPE: "Line",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new LineGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(-1, 0, 0), new Vector3(+1, 0, 0)],
				}
			}
		),
		MATERIAL: new LineBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Line.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Line.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Line.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Line.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : Line.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Line.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Line.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Line.DEFAULT.PRIMITIVE,
			}
		);
	}
};
