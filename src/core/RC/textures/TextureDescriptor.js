import { GPUExtent3D } from "../../DICTS/GPUExtent3D.js";
import { GPUTextureDimension } from "../../ENUM/GPUTextureDimension.js";
import { GPUTextureFormat } from "../../ENUM/GPUTextureFormat.js";
import { GPUTextureUsage } from "../../NAMESPACE/GPUTextureUsage.js";
import { DescriptorBase } from "../DescriptorBase.js";


export class TextureDescriptor extends DescriptorBase { //RC texture descriptor (WebGL / WebGPU)


    static DEFAULT = {
        NAME: "",
		TYPE: "TextureDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),

        SIZE: new GPUExtent3D(
            {
                width: 0,
                heihgt: 0,
                depthOrArrayLayers: 1,
            }
        ),
        MIP_LEVEL_COUNT: 1,
        SAMPLE_COUNT: 1,
        DIMENSION: GPUTextureDimension.D2,
        FORMAT: GPUTextureFormat.RGBA_8_UINT,
        USAGE: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        VIEW_FORMATS: new Array(),
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
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(TextureDescriptor.DEFAULT.DIRTY_CACHE), //copy
			}
		);

        this.size = args.size !== undefined ? args.size : TextureDescriptor.DEFAULT.SIZE;
        this.mipLevelCount = args.mipLevelCount !== undefined ? args.mipLevelCount : TextureDescriptor.DEFAULT.MIP_LEVEL_COUNT;
        this.sampleCount = args.sampleCount !== undefined ? args.sampleCount : TextureDescriptor.DEFAULT.SAMPLE_COUNT;
        this.dimension = args.dimension !== undefined ? args.dimension : TextureDescriptor.DEFAULT.DIMENSION;
        this.format = args.format !== undefined ? args.format : TextureDescriptor.DEFAULT.FORMAT;
        this.usage = args.usage !== undefined ? args.usage : TextureDescriptor.DEFAULT.USAGE;
        this.viewFormats = args.viewFormats !== undefined ? args.viewFormats : TextureDescriptor.DEFAULT.VIEW_FORMATS;
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