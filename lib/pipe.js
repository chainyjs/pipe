"use strict";
module.exports = function(value, destinationStream, next){
	var PassThrough = require('stream').PassThrough
	var sourceStream = new PassThrough()
	sourceStream.pipe(destinationStream)
	destinationStream.on('finish', function(err){
		return next(err)
	})
	sourceStream.end(value)
}
module.exports.extensionType = 'action'