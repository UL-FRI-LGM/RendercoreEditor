import {Object3D} from "./Object3D.js";


export class Group extends Object3D {


	static DEFAULT = {
		NAME: "",
		TYPE: "Group",

		VISIBLE: true,
		FRUSTUM_CULLED: false,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : Group.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Group.DEFAULT.TYPE,

				visible: (args.visible !== undefined) ? args.visible : Group.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Group.DEFAULT.FRUSTUM_CULLED,
			}
		);
	}
};