var Increments = artifacts.require("./Increments.sol");

module.exports = function(deployer) {
  deployer.deploy(Increments, 2);
};
