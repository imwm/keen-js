var Request = require("../request");
module.exports = function(query, callback) {
  var queries = [],
      request;

  if (query instanceof Array) {
    queries = query;
  } else {
    queries.push(query);
  }
  request = new Request(this, queries, callback).refresh();
  return request;
};
