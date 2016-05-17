/*jshint node:true*/
module.exports = {
  description: '',

  normalizeEntityName: function() {

  },

  afterInstall: function(options) {
    return this.addPackageToProject('ember-one-way-controls');
  }
};
