import { DescriptorBase } from "../core/RC/DescriptorBase.js";
import { Division } from "../Division.js";
import { MapT2 } from "../core/MapT2.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { ErrorT2 } from "../ErrorT2.js";
import { TextureDimension } from "../core/RC/textures/TextureDimension.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { TextureUsage } from "../core/RC/textures/TextureUsage.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { PredefinedColorSpace } from "./PredefinedColorSpace.js";
import { CanvasAlphaMode } from "./CanvasAlphaMode.js";


export class CanvasDescriptor extends DescriptorBase {  //RC canvas descriptor


	static DEFAULT = {
		TYPE: "CanvasDescriptor",
		NAME: "",
		LABEL: "",
		DIVISION: Division.RENDER_CORE,

		DIRTY_CACHE: new MapT2(
			{ label: `${CanvasDescriptor.name}` },
			[
				...DescriptorBase.DEFAULT.DIRTY_CACHE.clone(true)
			]
		),

		PARENT: null,

		SIZE: new Extent3D({ width: 1280, height: 720 }),
		MIP_LEVEL_COUNT: 1,
        SAMPLE_COUNT: 1,
        DIMENSION: TextureDimension.D2,
        FORMAT: TextureFormat.BGRA_8_UNORM,
        USAGE: TextureUsage.RENDER_ATTACHMENT,
        VIEW_FORMATS: new ArrayT2({ label: `${CanvasDescriptor.name}` }),

		COLOR_SPACE: PredefinedColorSpace.SRGB,
		ALPHA_MODE: CanvasAlphaMode.OPAQUE,
	};


	#parent = CanvasDescriptor.DEFAULT.PARENT;

	#size = CanvasDescriptor.DEFAULT.SIZE.clone();
	#mipLevelCount = CanvasDescriptor.DEFAULT.MIP_LEVEL_COUNT;
    #sampleCount = CanvasDescriptor.DEFAULT.SAMPLE_COUNT;
    #dimension = CanvasDescriptor.DEFAULT.DIMENSION;
    #format = CanvasDescriptor.DEFAULT.FORMAT;
    #usage = CanvasDescriptor.DEFAULT.USAGE;
    #viewFormats = CanvasDescriptor.DEFAULT.VIEW_FORMATS.clone();

    #colorSpace = CanvasDescriptor.DEFAULT.COLOR_SPACE;
    #alphaMode = CanvasDescriptor.DEFAULT.ALPHA_MODE;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CanvasDescriptor.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CanvasDescriptor.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : CanvasDescriptor.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : CanvasDescriptor.DEFAULT.DIVISION,

				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : CanvasDescriptor.DEFAULT.DIRTY_CACHE.clone(true),
			}
		);

		this.parent = (args.parent !== undefined) ? args.parent : CanvasDescriptor.DEFAULT.PARENT;

		this.size = (args.size !== undefined) ? args.size : CanvasDescriptor.DEFAULT.SIZE.clone();
		this.mipLevelCount = (args.mipLevelCount !== undefined) ? args.mipLevelCount : CanvasDescriptor.DEFAULT.MIP_LEVEL_COUNT;
		this.sampleCount = (args.sampleCount !== undefined) ? args.sampleCount : CanvasDescriptor.DEFAULT.SAMPLE_COUNT;
		this.dimension = (args.dimension !== undefined) ? args.dimension : CanvasDescriptor.DEFAULT.DIMENSION;
		this.format = (args.format !== undefined) ? args.format : CanvasDescriptor.DEFAULT.FORMAT;
		this.usage = (args.usage !== undefined) ? args.usage : CanvasDescriptor.DEFAULT.USAGE;
		this.viewFormats = (args.viewFormats !== undefined) ? args.viewFormats : CanvasDescriptor.DEFAULT.VIEW_FORMATS.clone();

		this.colorSpace = (args.colorSpace !== undefined) ? args.colorSpace : CanvasDescriptor.DEFAULT.COLOR_SPACE;
		this.alphaMode = (args.alphaMode !== undefined) ? args.alphaMode : CanvasDescriptor.DEFAULT.ALPHA_MODE;
	}


	get parent() { return this.#parent; }
	set parent(parent) {
		this.#parent = (parent === null || parent instanceof Node) ? parent : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
		this.dirtyCache.set("parent", parent);
	}

	get size() { return this.#size; }
	set size(size) {
		this.#size = (size instanceof Extent3D) ? size : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
		this.dirtyCache.set("size", size);
	}
	get mipLevelCount() { return this.#mipLevelCount; }
	set mipLevelCount(mipLevelCount) {
		this.#mipLevelCount = (typeof mipLevelCount === "number") ? mipLevelCount : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });
		this.dirtyCache.set("mipLevelCount", mipLevelCount);
	}
	get sampleCount() { return this.#sampleCount; }
	set sampleCount(sampleCount) {
		this.#sampleCount = (typeof sampleCount === "number") ? sampleCount : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });
		this.dirtyCache.set("sampleCount", sampleCount);
	}
	get dimension() { return this.#dimension; }
	set dimension(dimension) {
		this.#dimension = (typeof dimension === "string") ? dimension : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });
		this.dirtyCache.set("dimension", dimension);
	}
	get format() { return this.#format; }
	set format(format) {
		this.#format = (typeof format === "string") ? format : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });
		this.dirtyCache.set("format", format);
	}
	get usage() { return this.#usage; }
	set usage(usage) {
		this.#usage = (typeof usage === "number") ? usage : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });
		this.dirtyCache.set("usage", usage);
	}
	get viewFormats() { return this.#viewFormats; }
	set viewFormats(viewFormats) {
		this.#viewFormats = (viewFormats instanceof ArrayT2) ? viewFormats : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
		this.dirtyCache.set("viewFormats", viewFormats);
	}

	get colorSpace() { return this.#colorSpace; }
	set colorSpace(colorSpace) {
		this.#colorSpace = (typeof colorSpace === "string") ? colorSpace : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });
		this.dirtyCache.set("colorSpace", colorSpace);
	}
	get alphaMode() { return this.#alphaMode; }
	set alphaMode(alphaMode) {
		this.#alphaMode = (typeof alphaMode === "string") ? alphaMode : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type });
		this.dirtyCache.set("alphaMode", alphaMode);
	}


	copy(object) {
		if (!(object instanceof CanvasDescriptor)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(object);

		this.dirtyCache.copy(object.dirtyCache);

		this.parent = object.parent;

		this.size.copy(object.size);
		this.mipLevelCount = object.mipLevelCount;
		this.sampleCount = object.sampleCount;
		this.dimension = object.dimension;
		this.format = object.format;
		this.usage = object.usage;
		this.viewFormats.copy(object.viewFormats);
	
		this.colorSpace = object.colorSpace;
		this.alphaMode = object.alphaMode;


		return this;
	}
	clone() {
		return new CanvasDescriptor(
			Object.assign(
				super.clone(), 
				{
					parent: this.parent,

					size: this.size.clone(),
					mipLevelCount: this.mipLevelCount,
					sampleCount: this.sampleCount,
					dimension: this.dimension,
					format: this.format,
					usage: this.usage,
					viewFormats: this.viewFormats.clone(),
				
					colorSpace: this.colorSpace,
					alphaMode: this.alphaMode,
				}
			)
		);
	}

	isDirty() {
		return (
			super.isDirty() ||

			this.size.isDirty() ||
			this.viewFormats.isDirty()
		);
	}
};
