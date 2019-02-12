pragma solidity >=0.4.21 <0.6.0;

contract Increments {
    address public owner;
    uint public currentValue;
    uint public incrementBy;

    constructor(uint _initIncrement) public {
        owner = msg.sender;
        incrementBy = _initIncrement;
    }

    modifier onlyOwner() {
        require (msg.sender == owner, "You are not the owner.");
        _;
    }

    function increment() public {
        currentValue += incrementBy;
    }

    function changeIncrement(uint _newIncrement) public onlyOwner {
        incrementBy = _newIncrement;
    }

}