import { useState, useEffect } from "react";
import {ethers} from "ethers";
import Styles from "./Withdraw.module.css";
import Web3Modal from "web3modal";
import information from "../information.json";
import TimeLocker from "../artifacts/contracts/TimeLocker.sol/TimeLocker.json";

const Withdraw = () => {
  const [amount, setAmount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [withdrawTime, setWithdrawTime] = useState();
  useEffect( () => {
    getInformation();
  },[]);
  const getInformation = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(information.timeLockerAddress, TimeLocker.abi, signer);
    let balance = await contract.myDepositedAmount();
    balance = ethers.utils.formatEther(balance);
    setBalance(balance.toString());
    const withdrawTime = await contract.myWithdrawalTime();
    // Date is invalid 
    // Have to find a way to convert unix time to human readable time
    console.log(new Date(withdrawTime * 1000));
    // Problem with date object
    const date = new Date(withdrawTime * 1000);
    setWithdrawTime(date.toDateString());
  } 
  const withdraw = async (amount) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(information.timeLockerAddress, TimeLocker.abi, signer);
    amount = ethers.utils.parseUnits(amount.toString(), 'ether');
    const tx = await contract.withdraw(amount);
    await tx.wait();
  }
  return (
    <div className={Styles.container}>
      <form className={Styles.form}>
        <p>Balance: {balance} ETH</p>
        <p>Withdraw Date: {withdrawTime}</p>
        <label className={Styles.label} htmlFor="amount">Withdraw Amount:</label>
        <input type="text" name="amount" id="amount" className={Styles.input} placeholder="Enter Amount in ETH" onBlur={(e) => setAmount(e.target.value)} />
        <input type="button" value="Withdraw" className={Styles.button} onClick={()=> withdraw(amount)} />
      </form>
  </div>
  );
}

export default Withdraw