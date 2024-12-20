export class ProgrammableStage {


    static DEFAULT = {
        PATH: undefined,

        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,
    };


    #path;

    #module;
    #entryPoint;
    #constants;


    constructor(args = {}) {
        this.path = (args.path !== undefined) ? args.path : ProgrammableStage.DEFAULT.PATH;

        this.module = (args.module !== undefined) ? args.module : ProgrammableStage.DEFAULT.MODULE;
        this.entryPoint = (args.entryPoint !== undefined) ? args.entryPoint : ProgrammableStage.DEFAULT.ENTRY_POINT;
        this.constants = (args.constants !== undefined) ? args.constants : ProgrammableStage.DEFAULT.CONSTANTS;
    }


    get path() { return this.#path; }
    set path(path) { this.#path = path; }

    get module() { return this.#module; }
    set module(module) { this.#module = module; }
    get entryPoint() { return this.#entryPoint; }
    set entryPoint(entryPoint) { this.#entryPoint = entryPoint; }
    get constants() { return this.#constants; }
    set constants(constants) { this.#constants = constants; }
};