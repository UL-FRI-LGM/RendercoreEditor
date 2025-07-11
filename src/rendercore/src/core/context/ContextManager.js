import { ObjectBase } from "../ObjectBase.js";
import { BindGroupLayoutManager } from "../RC/resource_binding/BindGroupLayoutManager.js";
import { BindGroupManager } from "../RC/resource_binding/BindGroupManager.js";
import { BufferManager } from "../RC/buffers/BufferManager.js";
import { Context } from "./Context.js";
import { ContextDescriptor } from "./ContextDescriptor.js";
import { AttributeLocationManager } from "../data_layouts/AttributeLocationManager.js";
import { UniformGroupManager } from "../data_layouts/UniformGroupManager.js";
import { SamplerManager } from "../RC/textures/SamplerManager.js";
import { TextureManager } from "../RC/textures/TextureManager.js";
import { RenderPipelineManager } from "../RC/pipeline/RenderPipelineManager.js";
import { ComputePipelineManager } from "../RC/pipeline/ComputePipelineManager.js";
import { PipelineLayoutManager } from "../RC/resource_binding/PipelineLayoutManager.js";
import { ResourceBindingManager } from "../data_layouts/ResourceBindingManager.js";
import { CanvasManager } from "../../canvas/CanvasManager.js";
import { CanvasDescriptor } from "../../canvas/CanvasDescriptor.js";


export class ContextManager extends ObjectBase { //RC context manager //mapping (RC context descriptor -> context)

    
    static DEFAULT = {
        NAME: "",
        TYPE: "ContextManager",
    };


    #api;

    #canvasManager;
    #canvas;

    #contextDescriptor;
    #context;

    #bufferManager;
    #textureManager;


    constructor(api, args = {}) {
        return (async () => {
            super(
                {
                    ...args,

                    name: (args.name !== undefined) ? args.name : ContextManager.DEFAULT.NAME,
                    type: (args.type !== undefined) ? args.type : ContextManager.DEFAULT.TYPE,
                }
            );

            this.api = api;

            this.canvasManager = new CanvasManager(args);

            const canvasDescriptor = args.attachmentTextureDescriptor.color.filter((td) => { return td instanceof CanvasDescriptor; })[0];
            this.canvas = this.canvasManager.createCanvas(canvasDescriptor);
            this.canvasManager.setCanvas(canvasDescriptor, this.canvas);

            this.contextDescriptor = new ContextDescriptor(
                {
                    canvas: this.canvas,

                    powerPreference: args.powerPreference,
                    forceFallbackAdapter: args.forceFallbackAdapter,
            
                    requiredFeatures: args.requiredFeatures,
                    requiredLimits: args.requiredLimits,
                    defaultQueue: args.defaultQueue,
                
                    configuration: {
                        format: canvasDescriptor.format,
                        usage: canvasDescriptor.usage,
                        viewFormats: canvasDescriptor.viewFormats,
                        colorSpace: canvasDescriptor.colorSpace,
                        alphaMode: canvasDescriptor.alphaMode,
                    },
                }
            );
            this.CONTEXT = (await new Context(api, this.contextDescriptor)); //this will be final version of context
            this.context = this.CONTEXT.renderContext; //this is currently webgpu device, this will get replaced by the this.CONTEXT

            this.bufferManager = new BufferManager(this.context, {});
            this.textureManager = new TextureManager(this.context, {});
            this.samplerManager = new SamplerManager(this.context, {});
            this.bindGroupLayoutManager = new BindGroupLayoutManager(this.context, {});
            this.bindGroupManager = new BindGroupManager(this.context, {});
            this.pipelineLayoutManager = new PipelineLayoutManager(this, {});

            this.resourceBindingManager = new ResourceBindingManager(this, {});

            this.attributeLocationManager = new AttributeLocationManager(this, {});
            this.uniformGroupManager = new UniformGroupManager(this, {});

            this.renderPipelineManager = new RenderPipelineManager(this, {});
            this.computePipelineManager = new ComputePipelineManager(this, {});


            return this;
        })();
    }

    
    get api() { return this.#api; }
    set api(api) { this.#api = api; }

    get canvasManager() { return this.#canvasManager; }
	set canvasManager(canvasManager) { this.#canvasManager = canvasManager; }
    get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }

    get contextDescriptor() { return this.#contextDescriptor; }
    set contextDescriptor(contextDescriptor) { this.#contextDescriptor = contextDescriptor; }
    get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get bufferManager() { return this.#bufferManager; }
    set bufferManager(bufferManager) { this.#bufferManager = bufferManager; }
    get textureManager() { return this.#textureManager; }
    set textureManager(textureManager) { this.#textureManager = textureManager; }


    #createContext() {

    }
    updateContext() {

    }
    getContext() {

    }
    deleteContext() {

    }
    update() {
        this.canvasManager.update();
    }
};
