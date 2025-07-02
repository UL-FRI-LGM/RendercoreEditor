export class Division extends Number {


    static NONE =           new Division(0b00000000);
    static ALL =            new Division(0b11111111);

    static RENDER_CORE =    new Division(0b00000001);
    static WEBGL2 =         new Division(0b00000010);
    static WEBGPU =         new Division(0b00000100);


    constructor(args = {}) {
        super(args);
    }
};
