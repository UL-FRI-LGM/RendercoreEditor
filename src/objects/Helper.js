import { MapT2 } from "../core/MapT2.js";
import { BoundingSphereFrame, BoundingSphereFrameGeometry, BoundingSphereFrameBasicMaterial } from "../RenderCore.js";
import { BoundingBoxFrame, BoundingBoxFrameGeometry, BoundingBoxFrameBasicMaterial } from "../RenderCore.js";
import { Color4 } from "../math/Color4.js";
import { HelperEntry } from "../helpers/HelperEntry.js";
import { ArrayT2 } from "../core/ArrayT2.js";


export class Helper extends MapT2 {


	static DEFAULT = {
		TYPE: "Helper",
		NAME: "",

		ENTRIES: new ArrayT2(
			{ name: "helper entries" },

			new ArrayT2({ name: "BSF entry" }, "boundingSphereFrame", new HelperEntry()),
			new ArrayT2({ name: "BBF entry" }, "boundingBoxFrame", new HelperEntry()),
		),

		TARGET: null,
	};

	static #FLAGS = {
		SELF: {
			NONE:		0b00000000,
			ALL:		0b11111111,

			BSF: 		0b00000001,
			BBF:		0b00000010,
			AABBF:		0b00000100,
		},
	};
	static FLAGS = {
		ENABLE: {
			SELF: {
				NONE:	Helper.#FLAGS.SELF.NONE,
				ALL:	Helper.#FLAGS.SELF.ALL,

				BSF:	Helper.#FLAGS.SELF.BSF,
				BBF:	Helper.#FLAGS.SELF.BBF,
				AABBF:	Helper.#FLAGS.SELF.AABBF,
			},
		},
		DISABLE: {
			SELF: {
				NONE:	Helper.#FLAGS.SELF.NONE,
				ALL:	Helper.#FLAGS.SELF.ALL,

				BSF:	Helper.#FLAGS.SELF.BSF,
				BBF:	Helper.#FLAGS.SELF.BBF,
				AABBF:	Helper.#FLAGS.SELF.AABBF,
			},
		},
		SETUP: {
			SELF: {
				NONE:	Helper.#FLAGS.SELF.NONE,
				ALL:	Helper.#FLAGS.SELF.ALL,

				BSF:	Helper.#FLAGS.SELF.BSF,
				BBF:	Helper.#FLAGS.SELF.BBF,
				AABBF:	Helper.#FLAGS.SELF.AABBF,
			},
		},
		UPDATE: {
			SELF: {
				NONE:	Helper.#FLAGS.SELF.NONE,
				ALL:	Helper.#FLAGS.SELF.ALL,

				BSF:	Helper.#FLAGS.SELF.BSF,
				BBF:	Helper.#FLAGS.SELF.BBF,
				AABBF:	Helper.#FLAGS.SELF.AABBF,
			},
		},
	};


	#target;

	// #boundingSphereFrame;
	// #boundingBoxFrame;
	// #axisALignedBoundingBoxFrame;


	constructor(args = {}, entries = undefined, target = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Helper.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Helper.DEFAULT.NAME,
			},
			(entries !== undefined) ? entries : Helper.DEFAULT.ENTRIES.clone()
		);

		this.target = (target !== undefined) ? target : Helper.DEFAULT.TARGET;
	}


	get target() { return this.#target; }
	set target(target) { this.#target = target; }

	get boundingSphereFrame() { return this.get("boundingSphereFrame"); }
	set boundingSphereFrame(boundingSphereFrame) { this.set("boundingSphereFrame", boundingSphereFrame); }
	get boundingBoxFrame() { return this.get("boundingBoxFrame"); }
	set boundingBoxFrame(boundingBoxFrame) { this.set("boundingBoxFrame", boundingBoxFrame); }
	get axisALignedBoundingBoxFrame() { return this.get("axisALignedBoundingBoxFrame"); }
	set axisALignedBoundingBoxFrame(axisALignedBoundingBoxFrame) { this.set("axisALignedBoundingBoxFrame", axisALignedBoundingBoxFrame); }


	clone(cloneValues = true, cloneTarget = false) {
		return new Helper(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			[...this.entries()].map(([k, v]) => { return cloneValues ? ([k, (v === Object(v)) ? v.clone() : v]) : [k, v]; }),
			cloneTarget ? ((this.target === Object(this.target)) ? this.target.clone() : this.target) : this.target
		);
	}

	#assembleBoundingSphereFrame() {
		return new BoundingSphereFrame(
			{
				geometry: new BoundingSphereFrameGeometry(
					{
						indexed: false,
						baseGeometry: {
							mesh: this.target
						}
					}
				),
				material: new BoundingSphereFrameBasicMaterial(
					{
						diffuse: new Color4(1.0, 0.0, 0.0, 1.0)
					}
				),
			}
		);
	}
	#assembleBoundingBoxFrame() {
		return new BoundingBoxFrame(
			{
				geometry: new BoundingBoxFrameGeometry(
					{
						indexed: false,
						baseGeometry: {
							mesh: this.target
						}
					}
				),
				material: new BoundingBoxFrameBasicMaterial(
					{
						diffuse: new Color4(1.0, 0.0, 0.0, 1.0)
					}
				),
			}
		);
	}
	#assembleAxisAlignedBoundingBoxFrame() {
		throw new Error("NOT IMPLEMENTED");
	}

	enable(args = {}) {
		const flags = args.flags.helper;

		if (flags === undefined) {
			throw new Error("NO ENABLE FLAGS");
		}
		if (flags & Helper.FLAGS.ENABLE.SELF.BSF) {
			this.boundingSphereFrame.object = (this.boundingSphereFrame.object !== null) ? this.boundingSphereFrame.object : this.#assembleBoundingSphereFrame();
			this.boundingSphereFrame.enabled = true;
		}
		if (flags & Helper.FLAGS.ENABLE.SELF.BBF) {
			this.boundingBoxFrame.object = (this.boundingBoxFrame.object !== null) ? this.boundingBoxFrame.object : this.#assembleBoundingBoxFrame();
			this.boundingBoxFrame.enabled = true;
		}
		if (flags & Helper.FLAGS.ENABLE.SELF.AABBF) {
			throw new Error("NOT IMPLEMENTED");
		}
	}
	disable(args = {}) {
		const flags = args.flags.helper;

		if (flags === undefined) {
			throw new Error("NO DISABLE FLAGS");
		}
		if (flags & Helper.FLAGS.DISABLE.SELF.BSF) {
			this.boundingSphereFrame.object = (this.boundingSphereFrame.object !== null) ? this.boundingSphereFrame.object : this.#assembleBoundingSphereFrame();
			this.boundingSphereFrame.enabled = false;
		}
		if (flags & Helper.FLAGS.DISABLE.SELF.BBF) {
			this.boundingBoxFrame.object = (this.boundingBoxFrame.object !== null) ? this.boundingBoxFrame.object : this.#assembleBoundingBoxFrame();
			this.boundingBoxFrame.enabled = false;
		}
		if (flags & Helper.FLAGS.DISABLE.SELF.AABBF) {
			throw new Error("NOT IMPLEMENTED");
		}
	}
	setup(args = {}) {
		throw new Error("NOT IMPLEMENTED");
	}
	update(args = {}) {
		const flags = args.flags.helper;

		if (flags === undefined) {
			throw new Error("NO UPDATE FLAGS");
		}
		if (flags & Helper.FLAGS.UPDATE.SELF.BSF) {
			this.boundingSphereFrame.object = (this.boundingSphereFrame.object !== null) ? this.boundingSphereFrame.object : this.#assembleBoundingSphereFrame();
			this.boundingSphereFrame.object.update(
				{
					flags: {
						self: BoundingSphereFrame.FLAGS.UPDATE.SELF.NONE,
						geometry: BoundingSphereFrame.FLAGS.UPDATE.GEOMETRY.POSITIONS,
						material: BoundingSphereFrame.FLAGS.UPDATE.MATERIAL.NONE,
						helper: BoundingSphereFrame.FLAGS.UPDATE.HELPER.NONE,
					},
					updateParents: false,
					updateChildren: false,
				}
			);
		}
		if (flags & Helper.FLAGS.UPDATE.SELF.BBF) {
			this.boundingBoxFrame.object = (this.boundingBoxFrame.object !== null) ? this.boundingBoxFrame.object : this.#assembleBoundingBoxFrame();
			this.boundingBoxFrame.object.update(
				{
					flags: {
						self: BoundingBoxFrame.FLAGS.UPDATE.SELF.NONE,
						geometry: BoundingBoxFrame.FLAGS.UPDATE.GEOMETRY.POSITIONS,
						material: BoundingBoxFrame.FLAGS.UPDATE.MATERIAL.NONE,
						helper: BoundingBoxFrame.FLAGS.UPDATE.HELPER.NONE,
					},
					updateParents: false,
					updateChildren: false,
				}
			);
		}
		if (flags & Helper.FLAGS.UPDATE.SELF.AABBF) {
			throw new Error("NOT IMPLEMENTED");
		}
	}
};
