export class GL2Context { //WebGL context wrapper (canvas context + device context)


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
            this.gpu = null;
            this.adapter = null;
            this.device = null;

            this.canvasContext = null;
            this.renderContext = this.canvas.getContext(args.contextType = "webgl2", args.contextAttributes);

            this.configuration = null;


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
	set configuration(configuration) { this.#configuration = configuration; }
};
