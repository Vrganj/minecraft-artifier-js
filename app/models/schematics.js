import Zlib from 'zlibjs/bin/zlib_and_gzip.min.js'
import Nbt from 'nbt'

function SchematicsHelper() {
	this.Zlib = Zlib.Zlib

	this.encode = (obj) => {
		const writer = new Nbt.Writer()
		writer.compound(obj);
		const output = new Uint8Array(writer.getData());
		const gzip = new this.Zlib.Gzip(output)
		const compressed = gzip.compress()
		return compressed
	}

	this.decode = (arr, callback) => {
		const gzip = new this.Zlib.Gunzip(arr)
		Nbt.parse(arr, callback)
	}
}

export default SchematicsHelper