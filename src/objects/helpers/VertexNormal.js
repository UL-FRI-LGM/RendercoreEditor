import { Mesh } from "../Mesh.js";
import { Vector3 } from "../../math/Vector3.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { VertexNormalGeometry } from "./VertexNormalGeometry.js";
import { VertexNormalBasicMaterial } from "../../materials/helpers/VertexNormalBasicMaterial.js";
import { Cube } from "../Cube.js";


export class VertexNormal extends Mesh {


	static DEFAULT = {
		TYPE: "VertexNormal",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new VertexNormalGeometry(
			{
				indexed: false,
				baseGeometry: {
					// positions: [new Vector3(-1, 0, 0), new Vector3(+1, 0, 0)],
					mesh: new Cube(),
				}
			}
		),
		MATERIAL: new VertexNormalBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
			
				type: (args.type !== undefined) ? args.type : VertexNormal.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : VertexNormal.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : VertexNormal.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : VertexNormal.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : VertexNormal.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : VertexNormal.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : VertexNormal.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : VertexNormal.DEFAULT.PRIMITIVE,
			}
		);
	}
};
