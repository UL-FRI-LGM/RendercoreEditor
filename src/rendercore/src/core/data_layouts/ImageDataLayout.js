export class ImageDataLayout {


	#offset = 0;
	#bytesPerRow;
	#rowsPerImage;


	constructor(args = {}) {
		this.offset = (args.offset !== undefined) ? args.offset : undefined;
		this.bytesPerRow = (args.bytesPerRow !== undefined) ? args.bytesPerRow : undefined;
		this.rowsPerImage = (args.rowsPerImage !== undefined) ? args.rowsPerImage : undefined;
	}


	get offset() { return this.#offset; }
	set offset(offset) { this.#offset = offset; }
	get bytesPerRow() { return this.#bytesPerRow; }
	set bytesPerRow(bytesPerRow) { this.#bytesPerRow = bytesPerRow; }
	get rowsPerImage() { return this.#rowsPerImage; }
	set rowsPerImage(rowsPerImage) { this.#rowsPerImage = rowsPerImage; }
};
