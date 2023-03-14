export class RenderPassDepthStencilAttachment {


    #view;

    #depthClearValue;
    #depthLoadOp;
    #depthStoreOp;
    #depthReadOnly;

    #stencilClearValue;
    #stencilLoadOp;
    #stencilStoreOp;
    #stencilReadOnly;


    constructor(args = {}) {
        this.view = args.view !== undefined ? args.view : undefined;

        this.depthClearValue = args.depthClearValue !== undefined ? args.depthClearValue : undefined;
        this.depthLoadOp = args.depthLoadOp !== undefined ? args.depthLoadOp : undefined;
        this.depthStoreOp = args.depthStoreOp !== undefined ? args.depthStoreOp : undefined;
        this.depthReadOnly = args.depthReadOnly !== undefined ? args.depthReadOnly : undefined;

        this.stencilClearValue = args.stencilClearValue !== undefined ? args.stencilClearValue : undefined;
        this.stencilLoadOp = args.stencilLoadOp !== undefined ? args.stencilLoadOp : undefined;
        this.stencilStoreOp = args.stencilStoreOp !== undefined ? args.stencilStoreOp : undefined;
        this.stencilReadOnly = args.stencilReadOnly !== undefined ? args.stencilReadOnly : undefined;
    }


    get view() { return this.#view; }
    set view(view) { this.#view = view; }

    get depthClearValue() { return this.#depthClearValue; }
    set depthClearValue(depthClearValue) { this.#depthClearValue = depthClearValue; }
    get depthLoadOp() { return this.#depthLoadOp; }
    set depthLoadOp(depthLoadOp) { this.#depthLoadOp = depthLoadOp; }
    get depthStoreOp() { return this.#depthStoreOp; }
    set depthStoreOp(depthStoreOp) { this.#depthStoreOp = depthStoreOp; }
    get depthReadOnly() { return this.#depthReadOnly; }
    set depthReadOnly(depthReadOnly) { this.#depthReadOnly = depthReadOnly; }

    get stencilClearValue() { return this.#stencilClearValue; }
    set stencilClearValue(stencilClearValue) { this.#stencilClearValue = stencilClearValue; }
    get stencilLoadOp() { return this.#stencilLoadOp; }
    set stencilLoadOp(stencilLoadOp) { this.#stencilLoadOp = stencilLoadOp; }
    get stencilStoreOp() { return this.#stencilStoreOp; }
    set stencilStoreOp(stencilStoreOp) { this.#stencilStoreOp = stencilStoreOp; }
    get stencilReadOnly() { return this.#stencilReadOnly; }
    set stencilReadOnly(stencilReadOnly) { this.#stencilReadOnly = stencilReadOnly; }
};