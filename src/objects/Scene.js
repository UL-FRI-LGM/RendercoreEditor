import { Group } from "./Group.js";


export class Scene extends Group {
	static DEFAULT = {
		NAME: "",
		TYPE: "Scene",

		VISIBLE: true,
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

				visible: (args.visible !== undefined) ? args.visible : Scene.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Scene.DEFAULT.FRUSTUM_CULLED,
			}
		);

		this.autoUpdate = (args.autoUpdate !== undefined) ? args.autoUpdate : Scene.DEFAULT.AUTO_UPDATE;
	}


	get autoUpdate() { return this.#autoUpdate; }
	set autoUpdate(autoUpdate) { this.#autoUpdate = autoUpdate; }
}