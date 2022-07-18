import Form from "./Form";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import information from "../information.json";
import TimeLocker from "../artifacts/contracts/TimeLocker.sol/TimeLocker.json";

const Home = () => {
  const deposit = async (amount, date) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(information.timeLockerAddress, TimeLocker.abi, signer);
    console.log(date);
    const withdrawTime = new Date(date).getTime() / 1000;
    const value = ethers.utils.parseUnits(amount.toString(), 'ether');
    const tx = await contract.deposit(withdrawTime, {value: value});
    await tx.wait();
  }
  return (
    <div className="App">
      <Form deposit={deposit} />
    </div>
  );
}

export default Home;
