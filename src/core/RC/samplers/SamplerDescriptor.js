import { ObjectBase } from "../../ObjectBase.js";
import { GPUAddressMode } from "../../ENUM/GPUAddressMode.js";
import { GPUFilterMode } from "../../ENUM/GPUFilterMode.js";


export class SamplerDescriptor extends ObjectBase { //RC sampler descriptor (WebGL / WebGPU)


    static DEFAULT = {
        NAME: "",
		TYPE: "SamplerDescriptor",

        ADDRESS: {
            U: GPUAddressMode.CLAMP_TO_EDGE,
            V: GPUAddressMode.CLAMP_TO_EDGE,
            W: GPUAddressMode.CLAMP_TO_EDGE,
        },

        FILTER: {
            MAG: GPUFilterMode.NEAREST,
            MIN: GPUFilterMode.NEAREST,
            MIPMAP: GPUFilterMode.NEAREST,
        },

        LOD: {
            CLAMP: {
                MIN: 0,
                MAX: 32,
            },
        },
        COMPARE: undefined,
        ANISOTROPY: {
            MAX: 1,
        }
    };

    
    #dirtyCache;

    #addressModeU = "clamp-to-edge";
    #addressModeV = "clamp-to-edge";
    #addressModeW = "clamp-to-edge";
    
    #magFilter = "nearest";
    #minFilter = "nearest";
    #mipmapFilter = "nearest";

    #lodMinClamp = 0;
    #lodMaxClamp = 32;
    #compare;
    #maxAnisotropy = 1;


    constructor(args = {}) {
        super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : SamplerDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : SamplerDescriptor.DEFAULT.TYPE,
			}
		);

        this.dirtyCache = new Map();

        this.addressModeU = (args.addressModeU !== undefined) ? args.addressModeU : SamplerDescriptor.DEFAULT.ADDRESS.U;
        this.addressModeV = (args.addressModeV !== undefined) ? args.addressModeV : SamplerDescriptor.DEFAULT.ADDRESS.V;
        this.addressModeW = (args.addressModeW !== undefined) ? args.addressModeW : SamplerDescriptor.DEFAULT.ADDRESS.W;

        this.magFilter = (args.magFilter !== undefined) ? args.magFilter : SamplerDescriptor.DEFAULT.FILTER.MAG;
        this.minFilter = (args.minFilter !== undefined) ? args.minFilter : SamplerDescriptor.DEFAULT.FILTER.MIN;
        this.mipmapFilter = (args.mipmapFilter !== undefined) ? args.mipmapFilter : SamplerDescriptor.DEFAULT.FILTER.MIPMAP;

        this.lodMinClamp = (args.lodMinClamp !== undefined) ? args.lodMinClamp : SamplerDescriptor.DEFAULT.LOD.CLAMP.MIN;
        this.lodMaxClamp = (args.lodMaxClamp !== undefined) ? args.lodMaxClamp : SamplerDescriptor.DEFAULT.LOD.CLAMP.MAX;
        this.compare = (args.compare !== undefined) ? args.compare : SamplerDescriptor.DEFAULT.COMPARE;
        this.maxAnisotropy = (args.maxAnisotropy !== undefined) ? args.maxAnisotropy : SamplerDescriptor.DEFAULT.ANISOTROPY.MAX;

        this.samplerBinding = (args.samplerBinding !== undefined) ? args.samplerBinding : 10;
    }


    get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }

    get addressModeU() { return this.#addressModeU; }
    set addressModeU(addressModeU) { this.#addressModeU = addressModeU; }
    get addressModeV() { return this.#addressModeV; }
    set addressModeV(addressModeV) { this.#addressModeV = addressModeV; }
    get addressModeW() { return this.#addressModeW; }
    set addressModeW(addressModeW) { this.#addressModeW = addressModeW; }

    get magFilter() { return this.#magFilter; }
    set magFilter(magFilter) { this.#magFilter = magFilter; }
    get minFilter() { return this.#minFilter; }
    set minFilter(minFilter) { this.#minFilter = minFilter; }
    get mipmapFilter() { return this.#mipmapFilter; }
    set mipmapFilter(mipmapFilter) { this.#mipmapFilter = mipmapFilter; }

    get lodMinClamp() { return this.#lodMinClamp; }
    set lodMinClamp(lodMinClamp) { this.#lodMinClamp = lodMinClamp; }
    get lodMaxClamp() { return this.#lodMaxClamp; }
    set lodMaxClamp(lodMaxClamp) { this.#lodMaxClamp = lodMaxClamp; }
    get compare() { return this.#compare; }
    set compare(compare) { this.#compare = compare; }
    get maxAnisotropy() { return this.#maxAnisotropy; }
    set maxAnisotropy(maxAnisotropy) { this.#maxAnisotropy = maxAnisotropy; }


    setup(context) {
        // this.sampler = context.createSampler(this);
	}
    updateBufferObject(context) {
		// for (const [name, desc] of this.dirtyCache) {
		// 	context.queue.writeTexture(desc.destination(), desc.data, desc.dataLayout(), desc.size());
		// }
        // this.dirtyCache.clear();
	}
};