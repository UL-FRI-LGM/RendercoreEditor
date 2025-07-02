import { RenderArray } from "./RenderArray.js";


export class OpaqueRenderArray extends RenderArray {


	static DEFAULT = {
		TYPE: "OpaqueRenderArray",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : OpaqueRenderArray.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : OpaqueRenderArray.DEFAULT.NAME,
			},
			...rest
		);
	}


	clone(cloneValues = true) {
		return new OpaqueRenderArray(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			// ...this.map((x) => { return cloneValues ? ((x === Object(x)) ? x.clone() : x) : x; })
			...[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; })
		);
	}

	sort(camera) {
		// Sort the objects by render order, then sort the objects by z (front to back)

		return super.sort((a, b) => {
			return a.renderOrder - b.renderOrder || a.position.distanceToSquared(camera.position) - b.position.distanceToSquared(camera.position);
		});
	}
};
