export class MultisampleState {


    static DEFAULT = {
        COUNT: 1,
        MASK: 0xFFFFFFFF,
        ALPHA_TO_COVERAGE_ENABLED: false,
    };

    static CONFIGURATION = {
        C1_M0xFFFFFFFF: new MultisampleState(
            {
                count: 1,
                mask: 0xFFFFFFFF,
                alphaToCoverageEnabled: false,
            }
        ),
    };


    #count;
    #mask;
    #alphaToCoverageEnabled;


    constructor(args = {}) {
        this.count = (args.count !== undefined) ? args.count : MultisampleState.DEFAULT.COUNT;
        this.mask = (args.mask !== undefined) ? args.mask : MultisampleState.DEFAULT.MASK;
        this.alphaToCoverageEnabled = (args.alphaToCoverageEnabled !== undefined) ? args.alphaToCoverageEnabled : MultisampleState.DEFAULT.ALPHA_TO_COVERAGE_ENABLED;
    }


    get count() { return this.#count; }
    set count(count) { this.#count = count; }
    get mask() { return this.#mask; }
    set mask(mask) { this.#mask = mask; }
    get alphaToCoverageEnabled() { return this.#alphaToCoverageEnabled; }
    set alphaToCoverageEnabled(alphaToCoverageEnabled) { this.#alphaToCoverageEnabled = alphaToCoverageEnabled; }
};