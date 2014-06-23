"use strict";
// Import
var expect = require('chai').expect,
	joe = require('joe'),
	fsUtil = require('fs')

// Test
joe.describe('pipe plugin', function(describe,it){
	var Chainy = require('chainy-core').subclass().require('set').addExtension('pipe', require('../'))
	var file = __dirname+'/.log'
	var cleanup = function(task, next){
		fsUtil.exists(file, function(exists){
			if ( exists ) {
				fsUtil.unlink(file, next)
			} else {
				next()
			}
		})
	}
	
	this.on('test.before', cleanup).on('test.after', cleanup)

	it("should work", function(next){
		var outputStream = fsUtil.createWriteStream(file)
		Chainy.create()
			.set('some data')
			.pipe(outputStream)
			.done(function(err, result){
				if (err)  return next(err)
				expect(result).to.equal('some data')
				fsUtil.readFile(file, function(err, data){
					expect(data.toString()).to.equal('some data')
					return next()
				})
			})
	})
})