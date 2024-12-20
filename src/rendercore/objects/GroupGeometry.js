import { Geometry } from "./Geometry.js";


export class GroupGeometry extends Geometry {


	static DEFAULT = {
		TYPE: "GroupGeometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : GroupGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : GroupGeometry.DEFAULT.TYPE,
			
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
