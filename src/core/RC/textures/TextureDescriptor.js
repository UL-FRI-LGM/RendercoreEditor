import { ObjectBase } from "../../ObjectBase.js";
import { GPUVertexBufferLayout } from "../../DICTS/GPUVertexBufferLayout.js";
import { GPUVertexAttribute } from "../../DICTS/GPUVertexAttribute.js";
import { GPUVertexStepMode } from "../../ENUM/GPUVertexStepMode.js";
import { GPUTextureDescriptor } from "../../DICTS/GPUTextureDescriptor.js";
import { GPUExtent3D } from "../../DICTS/GPUExtent3D.js";
import { GPUTextureDimension } from "../../ENUM/GPUTextureDimension.js";
import { GPUTextureFormat } from "../../ENUM/GPUTextureFormat.js";
import { GPUTextureUsage } from "../../NAMESPACE/GPUTextureUsage.js";
import { GPUTextureAspect } from "../../ENUM/GPUTextureAspect.js";
import { GPUImageDataLayout } from "../../DICTS/GPUImageDataLayout.js";
import { GPUImageCopyTexture } from "../../DICTS/GPUImageCopyTexture.js";
import { GPUOrigin3D } from "../../DICTS/GPUOrigin3D.js";
import { GPUSamplerDescriptor } from "../../DICTS/GPUSamplerDescriptor.js";
import { GPUAddressMode } from "../../ENUM/GPUAddressMode.js";
import { GPUFilterMode } from "../../ENUM/GPUFilterMode.js";


export class TextureDescriptor extends ObjectBase { // RC texture descriptor (WebGL / WebGPU)


    static DEFAULT = {
        NAME: "",
		TYPE: "TextureDescriptor",

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

        FILTER: {
            MAG: GPUFilterMode.NEAREST,
            MIN: GPUFilterMode.NEAREST,
            MIPMAP: GPUFilterMode.NEAREST,
        },

        ARRAY_BUFFER: new Uint8ClampedArray(),
    };

    
    #dirtyCache;

    #size;
    #mipLevelCount;
    #sampleCount;
    #dimension;
    #format;
    #usage;
    #viewFormats;

    #arrayBuffer;


    constructor(args = {}) {
        super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : TextureDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : TextureDescriptor.DEFAULT.TYPE,
			}
		);

        this.dirtyCache = new Map();

        this.size = args.size !== undefined ? args.size : TextureDescriptor.DEFAULT.SIZE;
        this.mipLevelCount = args.mipLevelCount !== undefined ? args.mipLevelCount : TextureDescriptor.DEFAULT.MIP_LEVEL_COUNT;
        this.sampleCount = args.sampleCount !== undefined ? args.sampleCount : TextureDescriptor.DEFAULT.SAMPLE_COUNT;
        this.dimension = args.dimension !== undefined ? args.dimension : TextureDescriptor.DEFAULT.DIMENSION;
        this.format = args.format !== undefined ? args.format : TextureDescriptor.DEFAULT.FORMAT;
        this.usage = args.usage !== undefined ? args.usage : TextureDescriptor.DEFAULT.USAGE;
        this.viewFormats = args.viewFormats !== undefined ? args.viewFormats : TextureDescriptor.DEFAULT.VIEW_FORMATS;

        this.arrayBuffer = (args.arrayBuffer !== undefined) ? args.arrayBuffer : TextureDescriptor.DEFAULT.ARRAY_BUFFER;

        this.textureBinding = (args.textureBinding !== undefined) ? args.textureBinding : 20;
    }


    get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }

    get arrayBuffer() { return this.#arrayBuffer; }
    set arrayBuffer(arrayBuffer) { 
        this.#arrayBuffer = arrayBuffer; 

        this.dirtyCache.set(
            "ArrayBuffer", 
            {
                destination: (texture) => { 
                    return new GPUImageCopyTexture(
                        {
                            texture: texture ? texture : this.texture,
                            mipLevel: 0,
                            origin: new GPUOrigin3D(
                                {
                                    x: 0,
                                    y: 0,
                                    z: 0,
                                }
                            ),
                            aspect: GPUTextureAspect.ALL,
                        }
                    ); 
                }, 
                data: this.arrayBuffer, 
                dataLayout: () => { 
                    return new GPUImageDataLayout(
                        {
                            offset: 0,
                            bytesPerRow: this.size.width * 4,
                            rowsPerImage: this.size.height,
                        }
                    ); 
                }, 
                size: () => {
                    return new GPUExtent3D(
                        {
                            width: this.size.width,
                            height: this.size.height,
                            depthOrArrayLayers: 1,
                        }
                    );
                }
            }
        );
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