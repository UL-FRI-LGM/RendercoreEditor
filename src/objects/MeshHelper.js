import { Helper } from "./Helper.js";
import { VertexNormal, VertexNormalGeometry, VertexNormalBasicMaterial } from "../RenderCore.js";
import { Color4 } from "../math/Color4.js";
import { MeshHelperEntry } from "../helpers/MeshHelperEntry.js";
import { ArrayT2 } from "../core/ArrayT2.js";


export class MeshHelper extends Helper {


	static DEFAULT = {
		TYPE: "MeshHelper",
		NAME: "",

		ENTRIES: new ArrayT2(
			{ name: "mesh helper entries" },

			...Helper.DEFAULT.ENTRIES,

			new ArrayT2({ name: "VN entry" }, "vertexNormal", new MeshHelperEntry()),
		),

		TARGET: null,
	};

	static #FLAGS = {
		SELF: {
			NONE:				0b00000000,
			ALL:				0b11111111,
			
			BSF: 				0b00000001,
			BBF:				0b00000010,
			AABBF:				0b00000100,
	
			VERTEX_NORMAL:		0b00001000,
		},
	};
	static FLAGS = {
		...Helper.FLAGS,

		ENABLE: {
			SELF: {
				...Helper.FLAGS.ENABLE.SELF,

				VERTEX_NORMAL: MeshHelper.#FLAGS.SELF.VERTEX_NORMAL,
			},
		},
		DISABLE: {
			SELF: {
				...Helper.FLAGS.DISABLE.SELF,

				VERTEX_NORMAL: MeshHelper.#FLAGS.SELF.VERTEX_NORMAL,
			},
		},
		SETUP: {
			SELF: {
				...Helper.FLAGS.SETUP.SELF,

				VERTEX_NORMAL: MeshHelper.#FLAGS.SELF.VERTEX_NORMAL,
			},
		},
		UPDATE: {
			SELF: {
				...Helper.FLAGS.UPDATE.SELF,

				VERTEX_NORMAL: MeshHelper.#FLAGS.SELF.VERTEX_NORMAL,
			},
		},
	};


	// #vertexNormal;


	constructor(args = {}, entries = undefined, target = undefined) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MeshHelper.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MeshHelper.DEFAULT.NAME,
			},
			(entries !== undefined) ? entries : MeshHelper.DEFAULT.ENTRIES.clone(),
			(target !== undefined) ? target : MeshHelper.DEFAULT.TARGET,
		);
	}


	get vertexNormal() { return this.get("vertexNormal"); }
	set vertexNormal(vertexNormal) { this.set("vertexNormal", vertexNormal); }


	clone(cloneEntries = true, cloneTarget = false) {
		return new MeshHelper(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
			},
			[...this.entries()].map(([k, v]) => { return cloneEntries ? ([(k === Object(k)) ? k.clone() : k, (v === Object(v)) ? v.clone() : v]) : [k, v]; }),
			cloneTarget ? ((this.target === Object(this.target)) ? this.target.clone() : this.target) : this.target
		);
	}

	#assembleVertexNormal() {
		return new VertexNormal(
			{
				geometry: new VertexNormalGeometry(
					{
						indexed: false,
						baseGeometry: {
							mesh: this.target
						}
					}
				),
				material: new VertexNormalBasicMaterial(
					{
						diffuse: new Color4(1.0, 0.0, 0.0, 1.0)
					}
				)
			}
		);
	}

	enable(args = {}) {
		super.enable(args);


		const flags = args.flags.helper;

		if (flags & MeshHelper.FLAGS.ENABLE.SELF.VERTEX_NORMAL) {
			this.vertexNormal.object = (this.vertexNormal.object !== null) ? this.vertexNormal.object : this.#assembleVertexNormal();
			this.vertexNormal.enabled = true;
		}
	}
	disable(args = {}) {
		super.disable(args);


		const flags = args.flags.helper;

		if (flags & MeshHelper.FLAGS.DISABLE.SELF.VERTEX_NORMAL) {
			this.vertexNormal.object = (this.vertexNormal.object !== null) ? this.vertexNormal.object : this.#assembleVertexNormal();
			this.vertexNormal.enabled = false;
		}
	}
	setup(args = {}) {
		super.setup(args);


		throw new Error("NOT IMPLEMENTED");
	}
	update(args = {}) {
		super.update(args);


		const flags = args.flags.helper;

		if (flags & MeshHelper.FLAGS.UPDATE.SELF.VERTEX_NORMAL) {
			this.vertexNormal.object = (this.vertexNormal.object !== null) ? this.vertexNormal.object : this.#assembleVertexNormal();
			this.vertexNormal.object.update(
				{
					flags: {
						self: VertexNormal.FLAGS.UPDATE.SELF.NONE,
						geometry: VertexNormal.FLAGS.UPDATE.GEOMETRY.POSITIONS,
						material: VertexNormal.FLAGS.UPDATE.MATERIAL.NONE,
						helper: VertexNormal.FLAGS.UPDATE.HELPER.NONE,
					},
					updateParents: false,
					updateChildren: false,
				}
			);
		}
	}
};
