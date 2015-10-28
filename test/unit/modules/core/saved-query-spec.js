var expect = require("chai").expect;
var JSON2 = require("JSON2");

var Keen = require("../../../../src/server");
var keenHelper = require("../../helpers/test-config");
var mock = require("../../helpers/mockServerRequests");

describe("Keen.SavedQuery", function() {
  beforeEach(function() {
    this.client = new Keen({
      projectId: keenHelper.projectId,
      readKey: keenHelper.readKey,
      masterKey: keenHelper.masterKey
    });
  });

  afterEach(function() {
    this.client = undefined;
    this.countQuery = undefined;
  });

  describe("#all", function() {
    it("returns a response when successful", function(done) {
      var savedQueriesResponse = [
        { query_name: "page-visit-count" },
        { query_name: "extraction-saved-queries" },
      ];
      mock.get("/queries/saved", 200, JSON2.stringify(savedQueriesResponse));

      this.client.SavedQuery().all(function(err, res) {
        expect(res).to.deep.equal(savedQueriesResponse);
        done();
      });
    });
  });

  describe("#get", function() {
    it("returns a response when successful", function(done) {
      var savedQueryResponse = { query_name: "page-visit-count" };
      mock.get("/queries/saved/page-visit-count", 200, JSON2.stringify(savedQueryResponse));

      this.client.SavedQuery().get("page-visit-count", function(err, res) {
        expect(res).to.deep.equal(savedQueryResponse);
        done();
      });
    });
  })

  describe("#update", function() {
    it("returns a response when successful", function(done) {
      var updatedQueryResponse = { query_name: "page-visit-counts" };
      mock.put("/queries/saved/page-visit-count", 200, JSON2.stringify(updatedQueryResponse));

      this.client.SavedQuery().update("page-visit-count", updatedQueryResponse, function(err, res) {
        expect(res).to.deep.equal(updatedQueryResponse);
        done();
      });
    });
  });

  describe("#create", function() {
    it("returns a response when successful", function(done) {
      var createdQueryResponse = { query_name: "page-visit-counts" };
      mock.put("/queries/saved/page-visit-count", 201, JSON2.stringify(createdQueryResponse));

      this.client.SavedQuery().create("page-visit-count", createdQueryResponse, function(err, res) {
        expect(res).to.deep.equal(createdQueryResponse);
        done();
      });
    });
  });

  describe("#destroy", function() {
    it("returns a response when successful", function(done) {
      mock.del("/queries/saved/page-visit-count", 204, "");

      this.client.SavedQuery().destroy("page-visit-count", function(err, res) {
        expect(res).to.be.empty()
        done();
      });
    });
  });

});
