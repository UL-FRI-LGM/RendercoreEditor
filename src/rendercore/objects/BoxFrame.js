import { Mesh } from "./Mesh.js";
import { Vector3 } from "../math/Vector3.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { BoxFrameGeometry } from "./BoxFrameGeometry.js";
import { BoxFrameBasicMaterial } from "../materials/BoxFrameBasicMaterial.js";
import { Cube } from "./Cube.js";


export class BoxFrame extends Mesh {


	static DEFAULT = {
		TYPE: "BoxFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new BoxFrameGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
				}
			}
		),
		MATERIAL: new BoxFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : BoxFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : BoxFrame.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : BoxFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : BoxFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : BoxFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : BoxFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
