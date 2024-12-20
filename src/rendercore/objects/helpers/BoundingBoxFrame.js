import { BoxFrame } from "../BoxFrame.js";
import { Vector3 } from "../../math/Vector3.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { BoundingBoxFrameGeometry } from "./BoundingBoxFrameGeometry.js";
import { BoundingBoxFrameBasicMaterial } from "../../materials/helpers/BoundingBoxFrameBasicMaterial.js";
import { Cube } from "../Cube.js";


export class BoundingBoxFrame extends BoxFrame {


	static DEFAULT = {
		TYPE: "BoundingBoxFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new BoundingBoxFrameGeometry(
			{
				indexed: false,
				baseGeometry: {
					// positions: [new Vector3(0, 0, 0)],
					mesh: new Cube(),
				}
			}
		),
		MATERIAL: new BoundingBoxFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingBoxFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingBoxFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : BoundingBoxFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : BoundingBoxFrame.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : BoundingBoxFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : BoundingBoxFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : BoundingBoxFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : BoundingBoxFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
