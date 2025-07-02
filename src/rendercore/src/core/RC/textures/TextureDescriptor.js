import { Extent3D } from "./Extent3D.js";
import { TextureDimension } from "./TextureDimension.js";
import { TextureUsage } from "./TextureUsage.js";
import { DescriptorBase } from "../DescriptorBase.js";
import { TextureFormat } from "./TextureFormat.js";
import { MapT2 } from "../../MapT2.js";
import { ArrayT2 } from "../../ArrayT2.js";


export class TextureDescriptor extends DescriptorBase { //RC texture descriptor (WebGL / WebGPU)


    static DEFAULT = {
        NAME: "",
		TYPE: "TextureDescriptor",

        LABEL: "",
        DIRTY_CACHE: new MapT2(),

        SIZE: new Extent3D(
            {
                width: 0,
                heihgt: 0,
                depthOrArrayLayers: 1,
            }
        ),
        MIP_LEVEL_COUNT: 1,
        SAMPLE_COUNT: 1,
        DIMENSION: TextureDimension.D2,
        FORMAT: TextureFormat.RGBA_8_UINT,
        USAGE: TextureUsage.TEXTURE_BINDING | TextureUsage.COPY_DST,
        VIEW_FORMATS: new ArrayT2(),
    };

    
    #size;
    #mipLevelCount;
    #sampleCount;
    #dimension;
    #format;
    #usage;
    #viewFormats;


    constructor(args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : TextureDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : TextureDescriptor.DEFAULT.TYPE,

                label: (args.label !== undefined) ? args.label : TextureDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : TextureDescriptor.DEFAULT.DIRTY_CACHE.clone(true),
			}
		);

        this.size = args.size !== undefined ? args.size : TextureDescriptor.DEFAULT.SIZE;
        this.mipLevelCount = args.mipLevelCount !== undefined ? args.mipLevelCount : TextureDescriptor.DEFAULT.MIP_LEVEL_COUNT;
        this.sampleCount = args.sampleCount !== undefined ? args.sampleCount : TextureDescriptor.DEFAULT.SAMPLE_COUNT;
        this.dimension = args.dimension !== undefined ? args.dimension : TextureDescriptor.DEFAULT.DIMENSION;
        this.format = args.format !== undefined ? args.format : TextureDescriptor.DEFAULT.FORMAT;
        this.usage = args.usage !== undefined ? args.usage : TextureDescriptor.DEFAULT.USAGE;
        this.viewFormats = args.viewFormats !== undefined ? args.viewFormats : TextureDescriptor.DEFAULT.VIEW_FORMATS.clone(true);
    }


    get size() { return this.#size; }
    set size(size) { this.#size = size; }
    get mipLevelCount() { return this.#mipLevelCount; }
    set mipLevelCount(mipLevelCount) { this.#mipLevelCount = mipLevelCount; }
    get sampleCount() { return this.#sampleCount; }
    set sampleCount(sampleCount) { this.#sampleCount = sampleCount; }
    get dimension() { return this.#dimension; }
    set dimension(dimension) { this.#dimension = dimension; }
    get format() { return this.#format; }
    set format(format) { this.#format = format; }
    get usage() { return this.#usage; }
    set usage(usage) { this.#usage = usage; }
    get viewFormats() { return this.#viewFormats; }
    set viewFormats(viewFormats) { this.#viewFormats = viewFormats; }


    clone() {
        return new TextureDescriptor(
            {
                name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				label: (this.label === Object(this.label)) ? this.label.clone() : this.label,
				dirtyCache: (this.dirtyCache === Object(this.dirtyCache)) ? this.dirtyCache.clone() : this.dirtyCache,

                size: (this.size === Object(this.size)) ? this.size.clone() : this.size,
				mipLevelCount: (this.mipLevelCount === Object(this.mipLevelCount)) ? this.mipLevelCount.clone() : this.mipLevelCount,
				sampleCount: (this.sampleCount === Object(this.sampleCount)) ? this.sampleCount.clone() : this.sampleCount,
				dimension: (this.dimension === Object(this.dimension)) ? this.dimension.clone() : this.dimension,
				format: (this.format === Object(this.format)) ? this.format.clone() : this.format,
				usage: (this.usage === Object(this.usage)) ? this.usage.clone() : this.usage,
				viewFormats: (this.viewFormats === Object(this.viewFormats)) ? this.viewFormats.clone() : this.viewFormats,
            }
        );
    }

    setup(context) {
		// this.texture = context.createTexture(this);
	}
    updateBufferObject(context) {
		// for (const [name, desc] of this.dirtyCache) {
		// 	context.queue.writeTexture(desc.destination(), desc.data, desc.dataLayout(), desc.size());
		// }
        // this.dirtyCache.clear();
	}
};