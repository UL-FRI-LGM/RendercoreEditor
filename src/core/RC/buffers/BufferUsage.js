export class BufferUsage {


    static MAP_READ      = 0x0001;
    static MAP_WRITE     = 0x0002;
    static COPY_SRC      = 0x0004;
    static COPY_DST      = 0x0008;
    static INDEX         = 0x0010;
    static VERTEX        = 0x0020;
    static UNIFORM       = 0x0040;
    static STORAGE       = 0x0080;
    static INDIRECT      = 0x0100;
    static QUERY_RESOLVE = 0x0200;


    constructor(args = {}) {}
};