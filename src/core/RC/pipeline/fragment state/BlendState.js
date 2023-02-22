export class BlendState{


    static DEFAULT = {
        COLOR: undefined,
        ALPHA: undefined,
    };


    #color;
    #alpha;


    constructor(args = {}) {
        this.color = (args.color !== undefined) ? args.color : BlendState.DEFAULT.COLOR;
        this.alpha = (args.alpha !== undefined) ? args.alpha : BlendState.DEFAULT.ALPHA;
    }


    get color() { return this.#color; }
    set color(color) { this.#color = color; }
    get alpha() { return this.#alpha; }
    set alpha(alpha) { this.#alpha = alpha; }
};