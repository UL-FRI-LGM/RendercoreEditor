import { ColorWrite } from "./ColorWrite.js";


export class ColorTargetState {


    static DEFAULT = {
        FORMAT: undefined,
        
        BLEND: undefined,
        WRITE_MASK: ColorWrite.ALL,
    };


    #format;

    #blend;
    #writeMask;


    constructor(args = {}) {
        this.format = (args.format !== undefined) ? args.format : ColorTargetState.DEFAULT.FORMAT;

        this.blend = (args.blend !== undefined) ? args.blend : ColorTargetState.DEFAULT.BLEND;
        this.writeMask = (args.writeMask !== undefined) ? args.writeMask : ColorTargetState.DEFAULT.WRITE_MASK;
    }


    get format() { return this.#format; }
    set format(format) { this.#format = format; }
    
    get blend() { return this.#blend; }
    set blend(blend) { this.#blend = blend; }
    get writeMask() { return this.#writeMask; }
    set writeMask(writeMask) { this.#writeMask = writeMask; }
};