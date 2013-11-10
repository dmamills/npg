var should = require('should');
	//npg = require('./../index');

describe('npg',function() {
	it('test',function() {
		true.should.be.true;
	});
	it('should exist',function(){
		var x = { lol:'lol'}
		x.lol.should.equal('lol');
		x.lol.should.be.ok;
		x.should.be.ok;
	});
});
