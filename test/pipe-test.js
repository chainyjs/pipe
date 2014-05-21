(function(){
	"use strict";

	// Import
	var expect = require('chai').expect,
		joe = require('joe')

	// Test
	joe.describe('pipe plugin', function(describe,it){
		var Chainy = require('chainy-core').subclass().require('set').addExtension('pipe', require('../'))
		it("should work", function(next){
			var PassThrough = require('stream').PassThrough
			var outputStream = new PassThrough()
			Chainy.create()
				.set('some data')
				.pipe(outputStream)
				.done(function(err, result){
					if (err)  return next(err)
					expect(result).to.equal('some data')
					outputStream.on('data', function(data){
						expect(data.toString()).to.equal('some data')
					})
					outputStream.on('end', function(){
						return next()
					})
				})
		})
	})
})()