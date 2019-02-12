var Increments = artifacts.require("./Increments.sol");

contract('Increments', (accounts) => {
    

    it("Should have an initial increment value.", async () => {
        console.log("");
        console.log("Constructor:");
        let instance = await Increments.deployed();
        let _increment = await instance.incrementBy();
        assert.equal(_increment, 2);
    });

    it("Should set owner correctly.", async () => {
        let instance = await Increments.deployed();
        let _owner = await instance.owner();
        assert.equal(_owner, accounts[0]);
    });


    it("Should allow owner to call functions with the onlyOwner modifier", async () => {
        console.log("");
        console.log("Modifier:");
        let instance = await Increments.deployed();
        await instance.changeIncrement(4, {from: accounts[0]});
        let _newIncrement = await instance.incrementBy();
        assert.equal(_newIncrement, 4);
    });
    
    
    it("Should fail if non-owner calls functions with the onlyOwner modifier", async () => {
        let instance = await Increments.deployed();

        try {
            await instance.changeIncrement(6, {from: accounts[1]});
            let _newIncrement = await instance.incrementBy();
            assert.equal(_newIncrement, 6);
        } catch (err) {
            let _newIncrement = await instance.incrementBy();
            assert.equal(_newIncrement, 4);
        }
    });

    it("Should allow any user to increment the currentValue by incrementBy.", async () => {
        console.log("");
        console.log("Increment:");
        let instance = await Increments.deployed();
        await instance.increment({from: accounts[0]});
        let _currentValue = await instance.currentValue();
        assert.equal(_currentValue, 4);
        await instance.increment({from: accounts[1]});
        let _currentValue2 = await instance.currentValue();
        assert.equal(_currentValue2, 8);
    });

    it("Should allow owner to set a new incrementBy value.", async () => {
        console.log("");
        console.log("changeIncrement:");
        let instance = await Increments.deployed();
        await instance.changeIncrement(6, {from: accounts[0]});
        let _currentValue = await instance.currentValue();
        assert.equal(_currentValue, 8);
        await instance.increment({from: accounts[1]});
        let _currentValue2 = await instance.currentValue();
        assert.equal(_currentValue2, 14);
    });

});
