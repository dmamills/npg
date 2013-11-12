module.exports = {
	extend: function(consumer,provider) {
		for(var k in provider) {
			if(provider.hasOwnProperty(k))
				consumer[k] = provider[k];
		}
	},
	arrayToString: function(arr) {
		var s = '[', i;
		
		for(i =0; i < arr.length;i++) {
			if(i!==0) s +=',';
			s += '"'+arr

			[i]+'"';
		}
		s += ']';
		return s;
	} 
};