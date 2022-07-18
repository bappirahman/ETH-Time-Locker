// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeLocker {
  struct DepositInformation {
    uint value;
    uint withdrawTime;
  }
  mapping (address => DepositInformation) myFunds;
  
  function deposit(uint _myWithdrawalTime)  payable public {
    myFunds[msg.sender] = DepositInformation({value: msg.value, withdrawTime: _myWithdrawalTime});
  }
  function withdraw(uint _amount) public {
    uint currentTime = block.timestamp;
    DepositInformation storage myDepositInformation;
    myDepositInformation = myFunds[msg.sender];
    uint withdrawTime = myDepositInformation.withdrawTime;
    require(withdrawTime <= currentTime, "Wait until withdrawal time");
    require(_amount <= myDepositInformation.value, "Insufficient funds");
    payable(msg.sender).transfer(_amount);
    myDepositInformation.value = myDepositInformation.value - _amount;
  }
  function myDepositedAmount() view public returns (uint) {
    DepositInformation storage myDepositInformation;
    myDepositInformation = myFunds[msg.sender];
    return myDepositInformation.value;
  }
  function myWithdrawalTime() view public returns (uint) {
    DepositInformation storage myDepositInformation;
    myDepositInformation = myFunds[msg.sender];
    return myDepositInformation.withdrawTime;
  }
}