var request = require('request');

module.exports = {

	jumioAuthToken : function(scanReference, callback) {

		var userAgent = '',
				httpAuthorization = '', // APITOKEN:APIKEY base64 encoded
				successUrl = '',
				errorUrl = '',
				callbackUrl = ''; 

		var options = {
			method : "POST",
			url : "https://netverify.com/api/netverify/v2/initiateNetverify",
			headers : {
				"Accept" : "application/json",
				"Content-type" : "application/json",
				"User-Agent" : userAgent,
				"Authorization" : httpAuthorization,
			},
			json : {
				"merchantIdScanReference" : scanReference, // used to identify each ID scan
				"successUrl" :  successUrl,
				"errorUrl" :  errorUrl,
				"callbackUrl" : callbackUrl,
				"country" : "USA",
			}
		};
		request(options, function(err, response, body) {
			if (err) { return callback(new Error(err)) }
			else if (body) {
				return callback(null, body);

			// returned data from jumio
			// {
			// 	timestamp: '2014-05-26T17:52:35.811Z',
		  // 	authorizationToken: '** AUTH TOKEN **',
		  // 	clientRedirectUrl: 'https://netverify.com/widget/jumio-verify/2.0/form?authorizationToken=** AUTH TOKEN **',
		  // 	jumioIdScanReference: '** JUMIO SCAN REFERENCE **'
			// }
			}
		});
	},
}
