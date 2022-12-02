import {Object3D} from "../core/Object3D.js";


export class Group extends Object3D {
	static DEFAULT = {
		NAME: "",
		TYPE: "Group",

		FRUSTUM_CULLED: false,
	};


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Group.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Group.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Group.DEFAULT.FRUSTUM_CULLED,
			}
		);
	}
}