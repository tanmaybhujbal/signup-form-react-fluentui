import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App firstName={""} lastName={""} hcn={""} email={""} addressLine1={""} addressLine2={""} city={""} state={""} postalCode={""} phoneNumber={""} 
        errors={{ firstName: "", lastName: "", hcn: "", email: "", addressLine1: "", addressLine2: "", city: "", state: "", postalCode: "", phoneNumber: "" }}/>,
  document.getElementById('root')
);