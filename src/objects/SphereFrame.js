import { Mesh } from "./Mesh.js";
import { Vector3 } from "../math/Vector3.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { SphereFrameGeometry } from "./SphereFrameGeometry.js";
import { SphereFrameBasicMaterial } from "../materials/SphereFrameBasicMaterial.js";


export class SphereFrame extends Mesh {


	static DEFAULT = {
		TYPE: "SphereFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new SphereFrameGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					centers: [new Vector3(0, 0, 0)],
					radiuses: [1],
					nPoints: 32,
				}
			}
		),
		MATERIAL: new SphereFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SphereFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : SphereFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : SphereFrame.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : SphereFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : SphereFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : SphereFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : SphereFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
