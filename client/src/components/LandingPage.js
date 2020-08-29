import React,{useState,useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const LandingPage = (props) => {
    const [amount,setAmount] = useState('');
    const [paymentCapture,setPaymentCapture] = useState('1');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [name,setName] = useState('');
    const [customer,setCustomer] = useState('');
    const [copyFlag,setCopyFlag] = useState(false);
    const [url,setUrl] = useState('');
    const [copied,setCopied] = useState(false);

    const handleChange=(e)=>{
        e.preventDefault();
        // console.log(e.target.name);
        if(e.target.name === 'amount'){
            setAmount(e.target.value);
        }else if(e.target.name === 'paymentcapture'){
            setPaymentCapture(e.target.value)
        }else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }else if(e.target.name === 'contact'){
            setContact(e.target.value)
        }else if(e.target.name === 'name'){
            setName(e.target.value)
        }else if(e.target.name === 'customer'){
            setCustomer(e.target.value)
        }
    }

    useEffect(() => {
       if( url !== '' && url !== undefined){
            setCopyFlag(true);
       }
    }, [url])

    const generateUrl = (e) =>{
        e.preventDefault();
        console.clear();
        //console.log(`amount is ${amount} ,paymentcapture is ${paymentCapture}, email: ${email},name: ${name}, contact: ${contact},customer: ${customer}`);
        let data = {
            amount:amount,
            paymentcapture:paymentCapture,
            email:email,
            name:name,
            contact:contact,
            customer:customer
        }
        axios.post('http://localhost:7000/orders',{data:data}).then(response=>{
            console.log(response.data);
            setUrl(response.data);
            setCopied(false);
           })
        .catch(err=>console.log(`error in posting orders ${err}`))
        }

   return (
        <div className="container card" id="container">
               <div className="row">
                    <form onSubmit={generateUrl} className="form-group">
                            <div className="form-inline" id="amount">
                                <label id="amount-label">Amount</label>
                                <input
                                required={true}
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
                            <div className="form-inline" id="email">
                            <label id="email-label">Email</label>
                               <select
                               required
                               onChange={handleChange}
                               className="custom-select" name="email" >
                                    <option value="">Choose ...</option>
                                    <option value="madhavaneee08@gmail.com">Madhavan</option>
                                    <option value="Prasad@gmail.com">Prasad</option>
                                    <option value="Rajesh@gmail.com">Rajesh</option>
                                    <option value="Raj@gmail.com">Raj</option>
                                    <option value="yuvaraj@gmail.com">Yuvaraj</option>
                               </select>
                            </div>
                            <div className="form-inline" id="contact">
                            <label id="contact-label">Contact</label>
                               <select
                               required
                               onChange={handleChange}
                               className="custom-select" name="contact" >
                                   <option value="">Choose ...</option>
                                    <option value="9894948839">Madhavan</option>
                                    <option value="8610251005">Prasad</option>
                                    <option value="9940790170">Rajesh</option>
                                    <option value="9952216817">Raj</option>
                                    <option value="9952262001">Yuvaraj</option>
                               </select>
                            </div>
                            <div className="form-inline" id="name">
                            <label id="name-label">Name</label>
                               <select
                               required
                               onChange={handleChange}
                               className="custom-select" name="name" >
                                   <option value="">Choose ...</option>
                                    <option value="Madhavan">Madhavan</option>
                                    <option value="Prasad">Prasad</option>
                                    <option value="Rajesh">Rajesh</option>
                                    <option value="Raj">Raj</option>
                                    <option value="Yuvaraj">Yuvaraj</option>
                               </select>
                            </div>
                            <div className="form-inline" id="customer">
                            <label id="customer-label">Customer</label>
                               <select
                               required
                               onChange={handleChange}
                               className="custom-select" name="customer" >
                                   <option value="">Choose ...</option>
                                    <option value="AUDI">AUDI</option>
                                    <option value="BMW">BMW</option>
                                    <option value="DUCATI">DUCATI</option>
                                    <option value="BOEING">BOEING</option>
                                    <option value="LOCKHEED MARTIN">LOCKHEED MARTIN</option>
                               </select>
                            </div>
                            <button
                            type="submit"
                            className="btn btn-outline-success">Generate URL</button>
                            <br/>
                            {copyFlag ?
                            <div>
                           <CopyToClipboard text={url}
                            onCopy={() => {
                                console.log(copied);
                                alert('copied')
                                return setCopied(true)}}>
                            <button className="btn btn-warning mt-3 ml-3">Copy Url</button>
                            </CopyToClipboard>
                            </div>:null}

                    </form>
                </div>
        </div>
    );
}

export default LandingPage;
