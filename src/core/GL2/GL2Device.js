export class GL2Device { //GL device wrapper


    #device;


    constructor() {
        return (async () => {

            this.device = null;


            return this;
        })();
    }


    get device() { return this.#device; }
    set device(device) { this.#device = device; }
};