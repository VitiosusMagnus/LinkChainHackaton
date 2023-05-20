
// Check if Web3 is already injected by the browser (MetaMask)
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // If no injected Web3 instance is detected, fallback to a local Ganache instance
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:5500'));
}

// Function to connect to MetaMask when the button is clicked
function connectToWallet() {
    web3.eth.requestAccounts()
        .then(accounts => {
            const selectedAccount = accounts[0];
            console.log("Connected to wallet:", selectedAccount);
            // Perform any further actions with the connected account
            // ...
        })
        .catch(error => {
            console.error("Error connecting to wallet:", error);
        });
}

