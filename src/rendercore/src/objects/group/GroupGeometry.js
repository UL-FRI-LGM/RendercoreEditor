import { Geometry } from "../object/Geometry.js";
import { GroupBaseGeometry } from "./GroupBaseGeometry.js";


export class GroupGeometry extends Geometry {


	static DEFAULT = {
		TYPE: "GroupGeometry",
		NAME: "",

		BASE_GEOMETRY: new GroupBaseGeometry({ name: `BG - ${GroupGeometry.name}` }),

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : GroupGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : GroupGeometry.DEFAULT.TYPE,

				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : GroupGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : GroupGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : GroupGeometry.DEFAULT.BOUNDING_BOX,
			}
		);
	}


	clone() {
		return new GroupGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				baseGeometry: (this.baseGeometry === Object(this.baseGeometry)) ? this.baseGeometry.clone() : this.baseGeometry,

				boundingSphere: (this.boundingSphere === Object(this.boundingSphere)) ? this.boundingSphere.clone() : this.boundingSphere,
				boundingBox: (this.boundingBox === Object(this.boundingBox)) ? this.boundingBox.clone() : this.boundingBox,
			}
		);
	}

	setup(args = {}) {
		super.setup(args);
	}
	update(args = {}) {
		super.update(args);
	}
};
