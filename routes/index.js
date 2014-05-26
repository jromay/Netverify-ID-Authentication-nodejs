var express = require('express');
var router = express.Router();
var request = require('request');
var main = require('../lib/main.js');

// Every ping to this url creates a new authorizationToken in Jumio
router.get('/token', function(req, res) { // /jumio/token
  var scanReference = 'Scan1'; // reference the user's account
  main.jumioAuthToken(scanReference, function(err, data) {
    if (err) { return res.send(500) };
    res.json({ authorizationToken : data.authorizationToken });
  })
})


// webhook url from jumio hit after every verification
router.post('/callback', function(req, res) {
  var response = req.body;
  if (response.verificationStatus === 'APPROVED_VERIFIED') {
    console.log('Success! Real ID');
    // do stuff
  }
  else {
    console.log('Unable to verify ID');
  }
  // SAMPLE SUCCESSFUL RESPONSE DATA
  // { idExpiry: 'YYYY-MM-DD',
  //    idType: 'DRIVING_LICENSE',
  //    idCheckSignature: 'OK',
  //    idDob: 'YYYY-MM-DD',
  //    idCheckDataPositions: 'OK',
  //    idCheckHologram: 'OK',
  //    idCheckMicroprint: 'OK',
  //    idCheckDocumentValidation: 'OK',
  //    idCountry: 'USA',
  //    idScanSource: 'WEB_CAM',
  //    idFirstName: 'FIRSTNAME MIDDLENAME',
  //    verificationStatus: 'APPROVED_VERIFIED',
  //    jumioIdScanReference: '**JUMIOSCANREFERENCE**',
  //    merchantIdScanReference: '**SCANREFERENCE**',
  //    idCheckSecurityFeatures: 'OK',
  //    idUsState: 'CA',
  //    idCheckMRZcode: 'N/A',
  //    idScanImage: 'https://netverify.com/recognition/v1/idscan/**JUMIOIDSCANREFERENCE**/front',
  //    callBackType: 'NETVERIFYID',
  //    clientIp: '123.456.789.0',
  //    idLastName: '**ID LASTNAME**',
  //    idScanStatus: 'SUCCESS',
  //    idNumber: '**DRIVERS LICENSE ID**' },

})

router.get('/success', function(req, res) {
  console.log(req.body);
  console.log(req.query);
});

router.get('/error', function(req, res) {
  console.log(req.body);
  console.log(req.query);
});



module.exports = router;
