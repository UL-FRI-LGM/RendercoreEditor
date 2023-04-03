import { PipelineDescriptor } from "./PipelineDescriptor.js";


export class RenderPipelineDescriptor extends PipelineDescriptor {
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "RenderPipelineDescriptor",

        LABEL: "",
        DIRTY_CACHE: new Map(),

        LAYOUT: null,

        VERTEX: undefined,
        PRIMITIVE: undefined,
        DEPTH_STENCIL: undefined,
        MULTISAMPLE: undefined,
        FRAGMENT: undefined,
    };


    #vertex;
    #primitive;
    #depthStencil;
    #multisample;
    #fragment;


	constructor(args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : RenderPipelineDescriptor.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : RenderPipelineDescriptor.DEFAULT.TYPE,
			
                label: (args.label !== undefined) ? args.label : RenderPipelineDescriptor.DEFAULT.LABEL,
                dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(RenderPipelineDescriptor.DEFAULT.DIRTY_CACHE), //copy

                layout: (args.layout !== undefined) ? args.layout : RenderPipelineDescriptor.DEFAULT.LAYOUT,
            }
		);

        this.vertex = (args.vertex !== undefined) ? args.vertex : RenderPipelineDescriptor.DEFAULT.VERTEX;
        this.primitive = (args.primitive !== undefined) ? args.primitive : RenderPipelineDescriptor.DEFAULT.PRIMITIVE;
        this.depthStencil = (args.depthStencil !== undefined) ? args.depthStencil : RenderPipelineDescriptor.DEFAULT.DEPTH_STENCIL;
        this.multisample = (args.multisample !== undefined) ? args.multisample : RenderPipelineDescriptor.DEFAULT.MULTISAMPLE;
        this.fragment = (args.fragment !== undefined) ? args.fragment : RenderPipelineDescriptor.DEFAULT.FRAGMENT;
	}


    get vertex() { return this.#vertex; }
    set vertex(vertex) { this.#vertex = vertex; }
    get primitive() { return this.#primitive; }
    set primitive(primitive) { this.#primitive = primitive; }
    get depthStencil() { return this.#depthStencil; }
    set depthStencil(depthStencil) { this.#depthStencil = depthStencil; }
    get multisample() { return this.#multisample; }
    set multisample(multisample) { this.#multisample = multisample; }
    get fragment() { return this.#fragment; }
    set fragment(fragment) { this.#fragment = fragment; }
};