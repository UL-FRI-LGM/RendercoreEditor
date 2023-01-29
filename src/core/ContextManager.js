import { BufferManager } from "./BufferManager.js";
import { Context } from "./Context.js";
import { ContextDescriptor } from "./ContextDescriptor.js";
import { ObjectBase } from "./ObjectBase.js";
import { TextureManager } from "./TextureManager.js";


export class ContextManager extends ObjectBase { //RC context manager //mapping (RC context descriptor -> context)

    
    static DEFAULT = {
        NAME: "",
		TYPE: "ContextManager",
    };


    #api;
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
            this.contextDescriptor = new ContextDescriptor(args);
            this.context = (await new Context(api, this.contextDescriptor)).context;
            this.context.lost.then((info) => {
                console.error(`Context was lost: ${info.message}`);
                console.error(info);
        
                this.context = null;
        
                // Many causes for lost devices are transient, so applications should try getting a
                // new device once a previous one has been lost unless the loss was caused by the
                // application intentionally destroying the device. Note that any WebGPU resources
                // created with the previous device (buffers, textures, etc) will need to be
                // re-created with the new one.
                if (info.reason !== "destroyed") {
                    // initialize
                }
            });

            this.bufferManager = new BufferManager(this.context, {});
			this.textureManager = new TextureManager(this.context, {});


            return this;
        })();
    }

    
    get api() { return this.#api; }
    set api(api) { this.#api = api; }
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
};