export class RenderPassColorAttachment {


    #view;
    #resolveTarget;

    #clearValue;
    #loadOp;
    #storeOp;


    constructor(args = {}) {
        this.view = args.view !== undefined ? args.view : undefined;
        this.resolveTarget = args.resolveTarget !== undefined ? args.resolveTarget : undefined;

        this.clearValue = args.clearValue !== undefined ? args.clearValue : undefined;
        this.loadOp = args.loadOp !== undefined ? args.loadOp : undefined;
        this.storeOp = args.storeOp !== undefined ? args.storeOp : undefined;
    }


    get view() { return this.#view; }
    set view(view) { this.#view = view; }
    get resolveTarget() { return this.#resolveTarget; }
    set resolveTarget(resolveTarget) { this.#resolveTarget = resolveTarget; }

    get clearValue() { return this.#clearValue; }
    set clearValue(clearValue) { this.#clearValue = clearValue; }
    get loadOp() { return this.#loadOp; }
    set loadOp(loadOp) { this.#loadOp = loadOp; }
    get storeOp() { return this.#storeOp; }
    set storeOp(storeOp) { this.#storeOp = storeOp; }
};