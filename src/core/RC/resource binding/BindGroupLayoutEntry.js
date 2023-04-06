import { GPUBufferBindingLayout } from "../../DICTS/GPUBufferBindingLayout.js";
import { GPUBufferBindingType } from "../../ENUM/GPUBufferBindingType.js";
import { ShaderStage } from "./ShaderStage.js";


export class BindGroupLayoutEntry {


    static DEFAULT = {
        BINDING: undefined,
        VISIBILITY: undefined,
        BUFFER: undefined,
        SAMPLER: undefined,
        TEXTURE: undefined,
        STORAGE_TEXTURE: undefined,
        EXTERNAL_TEXTURE: undefined,
    };


    #binding;
    #visibility;
    
    #buffer;
    #sampler;
    #texture;
    #storageTexture;
    #externalTexture;


    constructor(args = {}) {
        this.binding = (args.binding !== undefined) ? args.binding : BindGroupLayoutEntry.DEFAULT.BINDING;
        this.visibility = (args.visibility !== undefined) ? args.visibility : BindGroupLayoutEntry.DEFAULT.VISIBILITY;

        this.buffer = (args.buffer !== undefined) ? args.buffer : BindGroupLayoutEntry.DEFAULT.BUFFER; //ONLY ONE
        this.sampler = (args.sampler !== undefined) ? args.sampler : BindGroupLayoutEntry.DEFAULT.SAMPLER;
        this.texture = (args.texture !== undefined) ? args.texture : BindGroupLayoutEntry.DEFAULT.TEXTURE;
        this.storageTexture = (args.storageTexture !== undefined) ? args.storageTexture : BindGroupLayoutEntry.DEFAULT.STORAGE_TEXTURE;
        this.externalTexture = (args.externalTexture !== undefined) ? args.externalTexture : BindGroupLayoutEntry.DEFAULT.EXTERNAL_TEXTURE;
    }

    
    get binding() { return this.#binding; }
    set binding(binding) { this.#binding = binding; }
    get visibility() { return this.#visibility}
    set visibility(visibility) { this.#visibility = visibility; }

    get buffer() { return this.#buffer; }
    set buffer(buffer) { this.#buffer = buffer; }
    get sampler() { return this.#sampler; }
    set sampler(sampler) { this.#sampler = sampler; }
    get texture() { return this.#texture; }
    set texture(texture) { this.#texture = texture; }
    get storageTexture() { return this.#storageTexture; }
    set storageTexture(storageTexture) { this.#storageTexture = storageTexture; }
    get externalTexture() { return this.#externalTexture; }
    set externalTexture(externalTexture) { this.#externalTexture = externalTexture; }
};