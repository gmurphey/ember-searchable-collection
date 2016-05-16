/*jshint node:true*/
module.exports = {
  description: '',

  afterInstall: function(options) {
    return this.addPackageToProject('ember-one-way-controls');
  }
};
