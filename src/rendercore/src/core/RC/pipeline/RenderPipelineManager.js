import { ObjectBase } from "../../ObjectBase.js";
import { PipelineLayoutManager } from "../resource_binding/PipelineLayoutManager.js";
import { VertexState } from "./VertexState.js";
import { VertexStateManager } from "./VertexStateManager.js";
import { PrimitiveState } from "./PrimitiveState.js";
import { PrimitiveStateManager } from "./PrimitiveStateManager.js";
import { DepthStencilState } from "./DepthStencilState.js";
import { DepthStencilStateManager } from "./DepthStencilStateManager.js";
import { MultisampleState } from "./MultisampleState.js";
import { MultisampleStateManager } from "./MultisampleStateManager.js";
import { FragmentState } from "./FragmentState.js";
import { FragmentStateManager } from "./FragmentStateManager.js";
import { PipelineLayoutDescriptor } from "../../../renderers/PipelineLayoutDescriptor.js";
import { BindGroupLayoutManager } from "../resource_binding/BindGroupLayoutManager.js";


export class RenderPipelineManager extends ObjectBase { //RC render pipeline manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "RenderPipelineManager",
    };


	#context;

    #descriptors = new Set();
    #renderPipelines = new Map();


	constructor(contextManager, args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : RenderPipelineManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : RenderPipelineManager.DEFAULT.TYPE,
			}
		);

        this.context = (contextManager.context !== undefined) ? contextManager.context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.renderPipelines = (args.renderPipelines !== undefined) ? args.renderPipelines : new Map();
	

        this.pipelineLayoutManager = contextManager.pipelineLayoutManager;
        this.vertexStateManager = new VertexStateManager(this.context, {});
        this.primitiveStateManager = new PrimitiveStateManager(this.context, {});
        this.depthStencilStateManager = new DepthStencilStateManager(this.context, {});
        this.multisampleManager = new MultisampleStateManager(this.context, {});
        this.fragmentManager = new FragmentStateManager(this.context, {});

        this.bindGroupLayoutManager = contextManager.bindGroupLayoutManager;
    }


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get renderPipelines() { return this.#renderPipelines; }
    set renderPipelines(renderPipelines) { this.#renderPipelines = renderPipelines; }


    #getShader(path, args = {}) {
        const camera = args.camera;
        const lightManager = args.lightManager;

        const object = args.object;
        const geometry = args.object.geometry;
        const material = args.object.material;

        const renderPassManager = args.renderPassManager;


		const source = renderPassManager.shaderCache.get(path);

        const flags = new Set([...material.flags, ...lightManager.flags]);
		const values = new Map([...material.values, ...lightManager.values]);

        const shaderPreprocessed = renderPassManager.shaderPreprocessor.preprocess(path, source, flags, values);


        return shaderPreprocessed;
    }

    #prepaireRenderPipelineDescriptor(descriptor, args = {}) {
        const pipelineLayoutDescriptor = descriptor.layoutDescriptor;
        pipelineLayoutDescriptor.bindGroupLayouts = pipelineLayoutDescriptor.bindGroupLayoutDescriptors.map((x) => { return this.bindGroupLayoutManager.getBindGroupLayout(x); });

        descriptor.layout = this.context.createPipelineLayout(pipelineLayoutDescriptor);

        const vertShader = this.#getShader(descriptor.vertex.path, args);
        descriptor.vertex.module = this.context.createShaderModule({ code: vertShader });

        const fragShader = this.#getShader(descriptor.fragment.path, args);
        descriptor.fragment.module = this.context.createShaderModule({ code: fragShader });
    }
    #createRenderPipeline(descriptor, args = {}, descriptor2 = undefined) {

        if (descriptor2) {
            this.#prepaireRenderPipelineDescriptor(descriptor2, args);

            const renderPipeline = this.context.createRenderPipeline(descriptor2);
            this.renderPipelines.set(descriptor2, renderPipeline);
    
            descriptor2.dirty = false;
    
    
            return renderPipeline;
        }

        descriptor.layout = this.pipelineLayoutManager.getPipelineLayout(
            new PipelineLayoutDescriptor(),
            args
        );
        descriptor.vertex = this.vertexStateManager.getVertexState(
            new VertexState(),
            args
        );
        descriptor.primitive = this.primitiveStateManager.getPrimitiveState(
            new PrimitiveState(),
            args
        );
        descriptor.depthStencil = this.depthStencilStateManager.getDepthStencilState(
            new DepthStencilState(),
            args
        );
        descriptor.multisample = this.multisampleManager.getMultisampleState(
            new MultisampleState(),
            args
        );
        descriptor.fragment = this.fragmentManager.getFragmentState(
            new FragmentState(),
            args
        );

        const renderPipeline = this.context.createRenderPipeline(descriptor);
        this.renderPipelines.set(descriptor, renderPipeline);

        descriptor.dirty = false;


        return renderPipeline;
    }
    createRenderPipeline(descriptor, args = {}, descriptor2 = undefined) {
        if (this.renderPipelines.has(descriptor)) this.#deleteRenderPipeline(descriptor);
        const renderPipeline = this.#createRenderPipeline(descriptor, args, descriptor2);


        return renderPipeline;
    }
    #updateRenderPipeline(descriptor, args = {}) {
        return this.createRenderPipeline(descriptor, args);
    }
    getRenderPipeline(descriptor, args = {}) {
        return (this.renderPipelines.has(descriptor)) ? ((descriptor.dirty) ? this.#updateRenderPipeline(descriptor, args) : this.renderPipelines.get(descriptor)) : this.createRenderPipeline(descriptor, args);
    }
    #deleteRenderPipeline(descriptor) {
        // this.renderPipelines.get(descriptor).destroy();
        const deleted = this.renderPipelines.delete(descriptor);


        return deleted;
    }
    deleteRenderPipeline(descriptor) {
        return (this.renderPipelines.has(descriptor)) ? this.#deleteRenderPipeline(descriptor) : false;
    }
};