import React,{useState} from 'react';
import '../App.css';
import axios from 'axios';

const LandingPage = () => {
    const [amount,setAmount] = useState('');
    const [paymentCapture,setPaymentCapture] = useState('1');

    const handleChange=(e)=>{
        e.preventDefault();
        // console.log(e.target.name);
        if(e.target.name === 'amount'){
            setAmount(e.target.value);
        }else{
            setPaymentCapture(e.target.value)
        }
        // console.log(paymentCapture)
    }

    const handleRazorpay = (e) =>{
        e.preventDefault();
        console.clear();
        console.log(`amount is ${amount} ,paymentcapture is ${paymentCapture}`);
        let data = {
            amount:amount,
            paymentcapture:paymentCapture
        }
        axios.post('http://localhost:7000/orders',{data:data}).then(response=>{
            console.log(response.data);
            let { amount,currency,id } = response.data;
            var options = {
                key: "rzp_test_XPENsOw3ma17Yl",
                amount: amount,
                currency:currency,
                name: "TRIMED Solutions Private Ltd.",
                description: "Test Transaction",
                image: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg",
                order_id:id,
                prefill: {
                    name: "Madhavan S",
                    email: "madhavaneee08@gmail.com",
                    contact: "9894948839"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                    hide_topbar:false
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        }).catch(err=>console.log(`error in posting orders ${err}`))
    }

    return (
        <div className="container card" id="container">
               <div className="row">
                    <form className="form-group">
                            <div className="form-inline" id="amount">
                                <label id="amount-label">Amount</label>
                                <input
                                onChange={handleChange}
                                id="amount-value" type="text" name="amount" className="form-control"/>
                            </div>
                            <div className="form-inline" id="paymentcapture">
                            <label id="paymentcapture-label">Payment Capture</label>
                               <select
                               onChange={handleChange}
                               className="custom-select" name="paymentcapture" >
                                    <option defaultValue="1">1</option>
                                    <option value="0">0</option>
                               </select>
                            </div>
                    </form>
                    <button
                    onClick={handleRazorpay}
                    className="btn btn-outline-success">Click to Pay</button>
               </div>
        </div>
    );
}

export default LandingPage;
