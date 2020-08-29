import React,{useEffect,useState} from 'react';
import '../App.css';
import axios from 'axios';

const PaymentPage = (props) => {
    const [state, setState] = useState({ amount: "1", currency: "",name:"",email:"",contact:"",key:"",image:"",description:"",order_id:"",customer:"" });

    useEffect(()=>{
        console.clear();
        console.log(props.match.params.receiptid);

        axios.get(`http://localhost:7000/razorpay/getpaymentdetails/${props.match.params.receiptid}`)
        .then(response=>{
            console.log(response.data);
            setState(prevState=>({
                ...prevState,
                amount:response.data.optionsArray[0].amount,
                name:response.data.optionsArray[0].name,
                currency:response.data.optionsArray[0].currency,
                email:response.data.optionsArray[0].email,
                contact:response.data.optionsArray[0].contact,
                order_id:response.data.optionsArray[0].orderid,
                key:"rzp_test_XPENsOw3ma17Yl",
                image:response.data.customerimageurl,
                description:response.data.optionsArray[0].description,
                customer:response.data.optionsArray[0].customer
            }))
        })
        .catch(err=>console.log(`error in getting payment details ${err}`));
    },[])

   const handlePay = () =>{
        console.clear();
        // console.log(`amount is ${JSON.stringify(state,null,2)}`);
        const { key,amount,name,contact,description,email,order_id,currency,image,customer } = state;
        var options={
            key,amount,currency,name,description,image,order_id,
            prefill:{
                name,email,contact
            },
            callback_url: `http://localhost:7000/razorpay/clientcallback/${order_id}`,
            theme: {
                    color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
                    hide_topbar:false
                }
        }

        console.log(`options are : ${JSON.stringify(options,null,2)}`);
            var rzp1 = new window.Razorpay(options);
            rzp1.open();

    }

    return (
        <div className="container card" id="paymentcontainer">
            <div className="row card" id="paymentboard">
                <div>
                    <span>Amount</span>
                    <h5>1000</h5>
                </div>
                <div>
                    <span>Receipt</span>
                    <h5>12345</h5>
                </div>
                <div>
                    <span>Customer</span>
                    <h5>BMW</h5>
                </div>
                <button
                id="clickpay"
                onClick={handlePay} className="btn btn-primary">Pay Now</button>
            </div>
        </div>
    );
}

export default PaymentPage;
