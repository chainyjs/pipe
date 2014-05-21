module.exports = function(destinationStream){
	"use strict";

	var PassThrough = require('stream').PassThrough
	var sourceStream = new PassThrough()

	sourceStream.pipe(destinationStream)

	sourceStream.end(this.data)
}