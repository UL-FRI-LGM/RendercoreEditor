import { RenderArray } from "./RenderArray.js";


export class TransparentRenderArray extends RenderArray {


	static DEFAULT = {
		TYPE: "TransparentRenderArray",
		NAME: "",
	};


	constructor(args = {}, ...rest) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : TransparentRenderArray.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : TransparentRenderArray.DEFAULT.NAME,
			},
			...rest
		);
	}


	clone(cloneValues = true) {
		return new TransparentRenderArray(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			// ...this.map((x) => { return cloneValues ? ((x === Object(x)) ? x.clone() : x) : x; })
			...[...this.entries()].map(([k, v]) => { return cloneValues ? ((v === Object(v)) ? v.clone() : v) : v; })
		);
	}

	sort(camera) {
		// Sort the objects by z
		return super.sort((a, b) => {
			const renderOrderDiff = a.renderOrder - b.renderOrder;

			if (renderOrderDiff === 0) {
				// TODO fix global transform, then change this to local
				// return b.transform.global.position.distanceToSquared(camera.transform.global.position) - a.transform.global.position.distanceToSquared(camera.transform.global.position);
				return b.transform.local.position.distanceToSquared(camera.parent.transform.local.position) - a.transform.local.position.distanceToSquared(camera.parent.transform.local.position);
			} else {
				return renderOrderDiff;
			}
		});
	}
};
