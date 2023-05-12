// A GPUCanvasContext object is created via the getContext() method of an HTMLCanvasElement instance by passing the string literal 'webgpu' as its contextType argument.


import { CanvasConfiguration } from "../CanvasConfiguration.js";
import { GPU } from "./GPU.js";
import { GPUAdapter } from "./GPUAdapter.js";
import { GPUDevice } from "./GPUDevice.js";


export class GPUContext { //WebGPU context wrapper (canvas context + device context)


    // readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;

    // undefined configure(GPUCanvasConfiguration configuration);
    // undefined unconfigure();

    // GPUTexture getCurrentTexture();


    #canvas;

    #navigator;
    #gpu;
    #adapter
    #device

    #canvasContext;
    #renderContext;

    #configuration;


    constructor(args = {}) {
        return (async () => {
            // super(args);

            this.canvas = args.canvas;

            this.navigator = window.navigator;
            this.gpu = new GPU(this.navigator);
            this.adapter = await new GPUAdapter(this.gpu, args);
            this.device = await new GPUDevice(this.adapter, args);

            this.canvasContext = this.canvas.getContext(args.contextType = "webgpu", args.contextAttributes);
            this.renderContext = this.device.device;

            this.configuration = new CanvasConfiguration(this.renderContext, args.configuration);


            return this;
        })();
    }

    
    get canvas() { return this.#canvas; }
    set canvas(canvas) { this.#canvas = canvas; }

    get navigator() { return this.#navigator; }
    set navigator(navigator) { this.#navigator = navigator; }
    get gpu() { return this.#gpu; }
    set gpu(gpu) { this.#gpu = gpu; }
    get adapter() { return this.#adapter; }
    set adapter(adapter) { this.#adapter = adapter; }
    get device() { return this.#device; }
    set device(device) { this.#device = device; }

    get canvasContext() { return this.#canvasContext; }
    set canvasContext(canvasContext) { this.#canvasContext = canvasContext; }
    get renderContext() { return this.#renderContext; }
    set renderContext(renderContext) { this.#renderContext = renderContext; }

    get configuration() { return this.#configuration; }
	set configuration(configuration) {
        this.#configuration = configuration;
    

        this.configure(configuration);
        
        this.renderContext.lost.then((info) => {
            console.error(`Rendering context was lost!`, `Reason: [${info.reason}].`, `Message: [${info.message}].`);

            this.renderContext = null;
    
            // Many causes for lost devices are transient, so applications should try getting a
            // new device once a previous one has been lost unless the loss was caused by the
            // application intentionally destroying the device. Note that any WebGPU resources
            // created with the previous device (buffers, textures, etc) will need to be
            // re-created with the new one.
            if (info.reason !== "destroyed") {
                // initialize
            }
        });
    }


    // undefined configure(GPUCanvasConfiguration configuration);
	configure(configuration) {
		this.canvasContext.configure(configuration);
	}
	// undefined unconfigure();
    unconfigure() {
		this.canvasContext.unconfigure();
	}

	// GPUTexture getCurrentTexture();
	getCurrentTexture() {
		return this.canvasContext.getCurrentTexture();
	}
};
