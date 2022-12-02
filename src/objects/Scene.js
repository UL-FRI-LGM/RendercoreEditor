import { Object3D } from "../core/Object3D.js";


export class Scene extends Object3D {
	static DEFAULT = {
		NAME: "",
		TYPE: "Scene",

		FRUSTUM_CULLED: false,
		
		AUTO_UPDATE: true,
	};


	#autoUpdate;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Scene.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Scene.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Scene.DEFAULT.FRUSTUM_CULLED,
			}
		);

		this.autoUpdate = (args.autoUpdate !== undefined) ? args.autoUpdate : Scene.DEFAULT.AUTO_UPDATE;
	}


	get autoUpdate() { return this.#autoUpdate; }
	set autoUpdate(autoUpdate) { this.#autoUpdate = autoUpdate; }
}