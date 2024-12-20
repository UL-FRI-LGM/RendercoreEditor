export class GL2Device { //GL device wrapper


    #device;


    constructor() {
        return (async (canvas, args = {}) => {

            this.device = canvas.getContext(args.contextType = "webgl2", args.contextAttributes);


            return this;
        })();
    }


    get device() { return this.#device; }
    set device(device) { this.#device = device; }
};
