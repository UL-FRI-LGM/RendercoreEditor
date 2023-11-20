import { SphereFrame } from "../SphereFrame.js";
import { Vector3 } from "../../math/Vector3.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { BoundingSphereFrameGeometry } from "./BoundingSphereFrameGeometry.js";
import { BoundingSphereFrameBasicMaterial } from "../../materials/helpers/BoundingSphereFrameBasicMaterial.js";
import { Cube } from "../Cube.js";


export class BoundingSphereFrame extends SphereFrame {


	static DEFAULT = {
		TYPE: "BoundingSphereFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new BoundingSphereFrameGeometry(
			{
				indexed: false,
				baseGeometry: {
					// positions: [new Vector3(0, 0, 0)],
					mesh: new Cube(),
				}
			}
		),
		MATERIAL: new BoundingSphereFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingSphereFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingSphereFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : BoundingSphereFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : BoundingSphereFrame.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : BoundingSphereFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : BoundingSphereFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : BoundingSphereFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : BoundingSphereFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
