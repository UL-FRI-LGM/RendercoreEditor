import { Mesh } from "./Mesh.js";
import { SpriteGeometry } from "./SpriteGeometry.js";
import { Vector3 } from "../RenderCore.js";
import { SpriteBasicMaterial } from "../materials/SpriteBasicMaterial.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";


export class Sprite extends Mesh {


	static DEFAULT = {
		TYPE: "Sprite",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new SpriteGeometry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
				}
			}
		),
		MATERIAL: new SpriteBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				type: (args.type !== undefined) ? args.type : Sprite.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Sprite.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Sprite.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Sprite.DEFAULT.FRUSTUM_CULLED,
			
				geometry: (args.geometry !== undefined) ? args.geometry : Sprite.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Sprite.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Sprite.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Sprite.DEFAULT.PRIMITIVE,
			}
		);
	}
};
