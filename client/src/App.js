import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';

const App=()=>{

    const [paymentid,setPaymentid] = useState('');

  const handleOrder=()=>{
    console.log('clicked');
    axios.get("http://localhost:7000/orders").then(response=>{
          // console.log(response.data);
          setPaymentid(response.data.id);
    }).catch(err=>console.log(`error in getting order ${err}`))
  }

  const handlePay=async(e)=>{

      const API_URL = 'http://localhost:7000/';
      e.preventDefault();
      const orderUrl = `${API_URL}order`;
      const response = await axios.get("http://localhost:7000/orders");
      const { data } = response;
      console.log(`data is ${JSON.stringify(data)}`);
      let orderid = data.id;
      const options = {
        key: 'rzp_test_XPENsOw3ma17Yl',
        amount: data.amount_due, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStmPaMyYgvXjIzToG0l_1uByn2sbUpIJoN4Q&usqp=CAU",
    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    callback_url: `http://localhost:7000/callback/${orderid}`,
    prefill: {
        name: "Madhavan S",
        email: "madhavaneee08@gmail.com",
        contact: "9894948839"
    },
    notes: {
        address: "Razorpay Corporate Office"
    },
    theme: {
        color: "#3a69e0"
    }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

  }

  return (
    <div className="container card" id="container">
      <div className="row">
          <button
          onClick = {handleOrder}
          id="getorder"
          className="btn btn-outline-success">Get Order</button>
          <button
          onClick = {handlePay}
          id="getorder"
          className="btn btn-outline-success">Click to Pay</button>
      </div>
    </div>
  );
}

export default App;
