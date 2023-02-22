export class ProgrammableStage {


    static DEFAULT = {
        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,
    };


    #module;
    #entryPoint;
    #constants;


    constructor(args = {}) {
        this.module = (args.module !== undefined) ? args.module : ProgrammableStage.DEFAULT.MODULE;
        this.entryPoint = (args.entryPoint !== undefined) ? args.entryPoint : ProgrammableStage.DEFAULT.ENTRY_POINT;
        this.constants = (args.constants !== undefined) ? args.constants : ProgrammableStage.DEFAULT.CONSTANTS;
    }


    get module() { return this.#module; }
    set module(module) { this.#module = module; }
    get entryPoint() { return this.#entryPoint; }
    set entryPoint(entryPoint) { this.#entryPoint = entryPoint; }
    get constants() { return this.#constants; }
    set constants(constants) { this.#constants = constants; }
};