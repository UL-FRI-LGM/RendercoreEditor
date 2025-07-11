import { BufferBindingLayout } from "../resource_binding/BufferBindingLayout.js";
import { BufferBindingType } from "./BufferBindingType.js";

import { TextureBindingLayout } from "./TextureBindingLayout.js";
import { TextureSamplingType } from "./TextureSamplingType.js";
import { TextureViewDimension } from "./TextureViewDimension.js";

import { SamplerBindingLayout } from "./SamplerBindingLayout.js";
import { SamplerBindingType } from "./SamplerBindingType.js";

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

    static CONFIGURATION = {
        BGLE00_VVF_RB_TU: new BindGroupLayoutEntry(
            {
                binding: 0,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                buffer: new BufferBindingLayout(
                    {
                        type: BufferBindingType.UNIFORM,
                        hasDynamicOffset: false,
                        minBindingSize: 0,
                    }
                ),
            }
        ),
        BGLE01_VVF_RB_TU: new BindGroupLayoutEntry(
            {
                binding: 1,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                buffer: new BufferBindingLayout(
                    {
                        type: BufferBindingType.UNIFORM,
                        hasDynamicOffset: false,
                        minBindingSize: 0,
                    }
                ),
            }
        ),
        BGLE01_VVF_RB_TS_RO: new BindGroupLayoutEntry(
            {
                binding: 1,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                buffer: new BufferBindingLayout(
                    {
                        type: BufferBindingType.READ_ONLY_STORAGE,
                        hasDynamicOffset: false,
                        minBindingSize: 0,
                    }
                ),
            }
        ),
        BGLE10_VVF_RB_TU: new BindGroupLayoutEntry(
            {
                binding: 10,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                buffer: new BufferBindingLayout(
                    {
                        type: BufferBindingType.UNIFORM,
                        hasDynamicOffset: false,
                        minBindingSize: 0,
                    }
                ),
            }
        ),
        BGLE10_VVF_RT_TF: new BindGroupLayoutEntry(
            {
                binding: 10,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                texture: new TextureBindingLayout(
                    {
                        sampleType: TextureSamplingType.FLOAT,
                        viewDimension: TextureViewDimension.D2,
                        multisampled: false
                    }
                ),
            }
        ),
        BGLE10_VVF_RT_TUF: new BindGroupLayoutEntry(
            {
                binding: 10,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                texture: new TextureBindingLayout(
                    {
                        sampleType: TextureSamplingType.UNFILTERABLE_FLOAT,
                        viewDimension: TextureViewDimension.D2,
                        multisampled: false
                    }
                ),
            }
        ),
        BGLE11_VVF_RT_TF: new BindGroupLayoutEntry(
            {
                binding: 11,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                texture: new TextureBindingLayout(
                    {
                        sampleType: TextureSamplingType.FLOAT,
                        viewDimension: TextureViewDimension.D2,
                        multisampled: false
                    }
                ),
            }
        ),
        BGLE12_VVF_RT_TF: new BindGroupLayoutEntry(
            {
                binding: 12,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                texture: new TextureBindingLayout(
                    {
                        sampleType: TextureSamplingType.FLOAT,
                        viewDimension: TextureViewDimension.D2,
                        multisampled: false
                    }
                ),
            }
        ),
        BGLE13_VVF_RT_TF: new BindGroupLayoutEntry(
            {
                binding: 13,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                texture: new TextureBindingLayout(
                    {
                        sampleType: TextureSamplingType.FLOAT,
                        viewDimension: TextureViewDimension.D2,
                        multisampled: false
                    }
                ),
            }
        ),
        BGLE20_VVF_RS_TF: new BindGroupLayoutEntry(
            {
                binding: 20,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                sampler: new SamplerBindingLayout(
                    {
                        type: SamplerBindingType.FILTERING
                    }
                ),
            }
        ),
        BGLE20_VVF_RS_TUF: new BindGroupLayoutEntry(
            {
                binding: 20,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                sampler: new SamplerBindingLayout(
                    {
                        type: SamplerBindingType.NON_FILTERING
                    }
                ),
            }
        ),
        BGLE21_VVF_RS_TF: new BindGroupLayoutEntry(
            {
                binding: 21,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                sampler: new SamplerBindingLayout(
                    {
                        type: SamplerBindingType.FILTERING
                    }
                ),
            }
        ),
        BGLE22_VVF_RS_TF: new BindGroupLayoutEntry(
            {
                binding: 22,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                sampler: new SamplerBindingLayout(
                    {
                        type: SamplerBindingType.FILTERING
                    }
                ),
            }
        ),
        BGLE23_VVF_RS_TF: new BindGroupLayoutEntry(
            {
                binding: 23,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                sampler: new SamplerBindingLayout(
                    {
                        type: SamplerBindingType.FILTERING
                    }
                ),
            }
        ),

        BGLE32_VVF_RT_TF: new BindGroupLayoutEntry(
            {
                binding: 32,
                visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
                texture: new TextureBindingLayout(
                    {
                        sampleType: TextureSamplingType.FLOAT,
                        viewDimension: TextureViewDimension.D2_ARRAY,
                        multisampled: false
                    }
                ),
            }
        ),
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