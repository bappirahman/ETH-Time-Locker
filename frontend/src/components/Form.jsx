import {useState} from 'react';
import Styles from './Form.module.css';
const Form = ({deposit}) => {
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(null);
  return (
    <div className={Styles.container}>
      <form className={Styles.form}>
        <label className={Styles.label} htmlFor="amount">Enter Amount:</label>
        <input type="text" name="amount" id="amount" className={Styles.input} placeholder="Enter Amount in ETH" onBlur={(e) => setAmount(e.target.value)} />
        <label className={Styles.label} htmlFor="date">Enter Date :</label>
        <input type="date" name="date" id="date" className={Styles.input} onBlur={(e) => setDate(e.target.value)} />
        <input type="button" value="Deposit" className={Styles.button} onClick={()=> deposit(amount, date)} />
      </form>
  </div>
  );
}

export default Form;

