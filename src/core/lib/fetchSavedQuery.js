var Query = require('../query');
var request = require('superagent');
var responseHandler = require('../helpers/superagent-handle-response');

module.exports = function(queryName, callback){
  var url = this.url('/queries/saved/' + queryName);

  request
    .get(url)
    .set('Content-Type', 'application/json')
    .set('Authorization', this.masterKey())
    .end(handleResponse);

  function handleResponse(err, res){
    responseHandler(err, res, callback);
    callback = null;
  }
}
