export class GLDevice { //GL device descriptor


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