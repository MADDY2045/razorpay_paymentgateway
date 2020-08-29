import React from 'react';
import LandingPage from '../src/components/LandingPage';
import PaymentPage from '../src/components/PaymentPage';
import Success from '../src/components/Success';
import Failure from '../src/components/Failure';
import { Switch,Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/razorpay/:receiptid" component={PaymentPage}/>
      <Route exact path="/success" component={Success}/>
      <Route exact path="/failure" component={Failure}/>
      <Route path="*" component={()=><h1>404 NOT FOUND</h1>} />
      </Switch>
   </div>
  );
}

export default App;
