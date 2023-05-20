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
            web3.eth.defaultAccount = selectedAccount;
            document.getElementById("connect-wallet").innerHTML = selectedAccount;
        })
        .catch(error => {
            console.error("Error connecting to wallet:", error);
        });
}

const contractAddress = "0x9F069f5A9280e24D1b8e9e3bDbD3F12DE113c532";
    const contractABI = [
        {
            "inputs": [],
            "name": "enter",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pickWinner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getParticipantsCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "manager",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "minimumEntryFee",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "participants",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // Create a contract instance
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Function to handle enrollment when the button is clicked
function enroll() {
    
    contractInstance.methods.enter().send({
        value: web3.utils.toWei("0.00055", "ether"),
        from: web3.eth.defaultAccount
    })
}

function refreshCount() {
    contractInstance.methods.getParticipantsCount().call()
    .then(function(count) {
      const participantsElement = document.getElementById("participants");
      participantsElement.innerHTML = "The number of participants: " + count;
    })
}
function refreshBalance(){
    contractInstance.methods.getBalance().call()
    .then(function(balance) {
        const balanceElement = document.getElementById("total-balance");
        balanceElement.innerHTML = "The balance: " + (balance/1000000000000000000) + " eth";
    })
}