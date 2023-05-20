// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract Lottery {
    address public manager;
    address payable[] public participants;
    uint public minimumEntryFee = 550000000000000;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value == minimumEntryFee, "You must send Ether to enter the lottery.");
        participants.push(payable(msg.sender));
        if(participants.length == 5){
            pickWinner();
        }

    }

    function getParticipantsCount() public view returns (uint) {
        return participants.length;
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants.length)));
    }

    function pickWinner() public restricted {
        require(participants.length > 0, "No participants");

        uint index = random() % participants.length;
        address payable winner = participants[index];
        uint totalPrize = address(this).balance;

        winner.transfer(totalPrize);
        participants = new address payable[](0);
        console.log("winner is %s", winner);
    }

    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    modifier restricted() {
        require(msg.sender == manager, "Restricted to manager");
        _;
    }
}
