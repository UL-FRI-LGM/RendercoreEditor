export class ErrorT2 extends Error {


	static MESSAGE = {
		WRONG_TYPE: "WRONG TYPE",
		WRONG_INSTANCE : "WRONG INSTANCE",

		NOT_IMPLEMENTED: "NOT IMPLEMENTED",
		DEPRECATED: "DEPRECATED",
		NO_MATCH: "NO MATCH",

		HAS: {
			FALSE: "HAS FALSE",
			TRUE: "HAS TRUE",
		},
	};

	static WRONG_TYPE = new ErrorT2(ErrorT2.MESSAGE.WRONG_TYPE);
	static WRONG_INSTANCE = new ErrorT2(ErrorT2.MESSAGE.WRONG_INSTANCE);

	static NOT_IMPLEMENTED = new ErrorT2(ErrorT2.MESSAGE.NOT_IMPLEMENTED);
	static DEPRECATED = new ErrorT2(ErrorT2.MESSAGE.DEPRECATED);
	static NO_MATCH = new ErrorT2(ErrorT2.MESSAGE.NO_MATCH);

	static HAS = {
		FALSE: new ErrorT2(ErrorT2.MESSAGE.HAS.FALSE),
		TRUE: new ErrorT2(ErrorT2.MESSAGE.HAS.TRUE),
	};


	constructor(...args) {
		super(...args);
	}


	static throw(...args) {
		throw (args[0] instanceof ErrorT2) ? args[0] : new ErrorT2(...args);
	}
};
