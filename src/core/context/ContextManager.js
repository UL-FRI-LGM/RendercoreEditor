import { ObjectBase } from "../ObjectBase.js";
import { BufferManager } from "../RC/buffers/BufferManager.js";
import { Context } from "./Context.js";
import { ContextDescriptor } from "./ContextDescriptor.js";
import { TextureManager } from "../RC/textures/TextureManager.js";
import { CanvasManager } from "../../canvas/CanvasManager.js";


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

            this.canvasManager = new CanvasManager(api, args);
            this.canvas = this.canvasManager.canvas;

            this.contextDescriptor = new ContextDescriptor(
                {
                    canvas: this.canvas,

                    powerPreference: args.powerPreference,
                    forceFallbackAdapter: args.forceFallbackAdapter,
            
                    requiredFeatures: args.requiredFeatures,
                    requiredLimits: args.requiredLimits,
                    defaultQueue: args.defaultQueue,
                
                    configuration: {
                        format: args.format,
                        usage: args.usage,
                        viewFormats: args.viewFormats,
                        colorSpace: args.colorSpace,
                        alphaMode: args.alphaMode,
                    },
                }
            );
            this.CONTEXT = (await new Context(api, this.contextDescriptor)); //this will be final version of context
            this.context = this.CONTEXT.renderContext; //this is currently webgpu device, this will get replaced by the this.CONTEXT

            this.bufferManager = new BufferManager(this.context, {});
            this.textureManager = new TextureManager(this.context, {});


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
