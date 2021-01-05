import React from 'react';
import './App.css';
import { Stack, PrimaryButton, TextField, initializeIcons } from 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';

//initialization of icons - without calling this function icons for DatePicker would not be shown
initializeIcons();

//this interface contains description of state and properties for Dialog application
export interface IAccountDialogState {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  hcn: string | undefined;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  city: string | undefined;
  state: string | undefined;
  postalCode: string | undefined;
  phoneNumber: string | undefined;

  errors:{
    firstName: string | undefined,
    lastName: string | undefined,
    hcn: string | undefined,
    email: string | undefined
    addressLine1: string | undefined;
    addressLine2: string | undefined;
    city: string | undefined;
    state: string | undefined;
    postalCode: string | undefined;
    phoneNumber: string | undefined;
  }
}

class AccountDialog extends React.Component<IAccountDialogState, IAccountDialogState> {
  constructor(props: IAccountDialogState) {
    super(props);

    //passing of data from properties to state of control during initialization
    this.state = {
      firstName: "",
      lastName: "",
      hcn: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      phoneNumber: "",

      errors:{
        firstName: "",
        lastName: "",
        hcn: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        phoneNumber: ""
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validateNames = this.validateNames.bind(this);
  }

  validateEmail = (event:any): boolean => {
      let val = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let emailAddress = event.target.value;
      let error = this.state.errors;

      if (emailAddress === null || emailAddress === undefined || emailAddress === ""){
        this.setState({email: emailAddress});
        error.email = "Email is a required field";
        return false;
      }
      else if (val.test(emailAddress) ) {
          this.setState({email: emailAddress});
          error.email = "";
          return true;
      }
      else {
        this.setState({email: emailAddress});
        error.email = "Please enter a valid email id";
        return false;
      }
  }

  validateNames = (event:any, originalLabel:string) : boolean => {
    let id = event.target.id;
    let value = event.target.value;
    let label = originalLabel;
    let name = event.target.name;
    let isValid = true;
    let prevErrorState = Object.assign({}, this.state.errors as Pick<IAccountDialogState, any>);

    const regrexForAlpha = /^[a-zA-Z]+$/;
    const regrexForAplhaNum = /^[a-zA-Z0-9]+$/;
    const regrexForPhoneNum = /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    switch (id) {
      case "string":
        if (value === null || value === undefined || value === ""){
          prevErrorState[name] = label + " is a required field";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          isValid = false;
        }
        else if (!regrexForAlpha.test(value)){
          prevErrorState[name] = "Please enter only characters";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          isValid = false;
        }
        else 
          prevErrorState[name] = "";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          this.setState({[name]: value} as Pick<IAccountDialogState, any>);
          isValid = true;
        break;

      case "alphaNum":
        if (value === null || value === undefined || value === ""){
          prevErrorState[name] = label + " is a required field";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          isValid = false;
        }
        else if (!regrexForAplhaNum.test(value)){
          prevErrorState[name] = "Please enter only alphanumeric characters";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          isValid = false;
        }
        else 
          prevErrorState[name] = "";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          this.setState({[name]: value} as Pick<IAccountDialogState, any>);
          isValid = true;
        break;

      case "address":
        if (value === null || value === undefined || value === ""){
          prevErrorState[name] = label + " is a required field";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          isValid = false;
        }
        else 
          prevErrorState[name] = "";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          this.setState({[name]: value} as Pick<IAccountDialogState, any>);
          isValid = true;
        break;
      
      case "phonenumber":
        if (value === null || value === undefined || value === ""){
          prevErrorState[name] = label + " is a required field";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          isValid = false;
        }
        else if (!regrexForPhoneNum.test(value)){
          prevErrorState[name] = "Please enter a valid phone number";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          isValid = false;
        }
        else 
          prevErrorState[name] = "";
          this.setState({errors: prevErrorState} as Pick<IAccountDialogState, any>);
          this.setState({[name]: value} as Pick<IAccountDialogState, any>);
          isValid = true;
        break;
      
      default:
        isValid = false;
        break;
    }

    return isValid;
  }

  onSubmit = (e:any) => {
    e.preventDefault();
    let error = this.state.errors;

    if ((this.state.firstName === undefined || this.state.firstName === "") && (this.state.lastName === undefined || this.state.lastName === "") && (this.state.email === undefined || this.state.email === "") && (this.state.hcn === undefined || this.state.hcn === "")
    && (this.state.addressLine1 === undefined || this.state.addressLine1 === "") && (this.state.addressLine2 === undefined || this.state.addressLine2 === "") && (this.state.city === undefined || this.state.city === "") && (this.state.state === undefined || this.state.state === "")
    && (this.state.postalCode === undefined || this.state.postalCode === "") && (this.state.phoneNumber === undefined || this.state.phoneNumber === "")){
      error.firstName = "First Name is a required field";
      error.lastName = "Last Name is a required field";
      error.email = "Email is a required field";
      error.hcn = "HCN is a required field";
      error.addressLine1 = "Address Line 1 is a required field";
      error.addressLine2 = "Address Line 2 is a required field";
      error.city = "City is a required field";
      error.state = "State is a required field";
      error.postalCode = "Postal Code is a required field";
      error.phoneNumber = "Phone number is a required field";
    }
    else if (this.state.firstName === undefined || this.state.firstName === ""){
      error.firstName = "First Name is a required field";
    }
    else if (this.state.lastName === undefined || this.state.lastName === ""){
      error.lastName = "Last Name is a required field";
    }
    else if (this.state.email === undefined || this.state.email === ""){
      error.email = "Email is a required field";
    }
    else if (this.state.hcn === undefined || this.state.hcn === ""){
      error.hcn = "HCN is a required field";
    }
    else if (this.state.phoneNumber === undefined || this.state.phoneNumber === ""){
      error.phoneNumber = "Phone number is a required field";
    }
    else if (this.state.addressLine1 === undefined || this.state.addressLine1 === ""){
      error.addressLine1 = "Address Line 1 is a required field";
    }
    else if (this.state.addressLine2 === undefined || this.state.addressLine2 === ""){
      error.addressLine2 = "Address Line 2 is a required field";
    }
    else if (this.state.city === undefined || this.state.city === ""){
      error.city = "City is a required field";
    }
    else if (this.state.state === undefined || this.state.state === ""){
      error.state = "State is a required field";
    }
    else if (this.state.postalCode === undefined || this.state.postalCode === ""){
      error.postalCode = "Postal Code is a required field";
    }
    else{
      //post the data anywhere u want
      (global as any).window.returnValue = this.state;
      window.close();
    }

    this.setState({errors: error});
  }  

  //heart of application that returns React markup
  render() {
    return (
      <>
        <form onSubmit={this.onSubmit} >
          <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row ms-mdOffset0 ms-lgOffset2 ms-xlOffset3 ms-xlOffset2">
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg5 ms-xl5 parent">
              <TextField
                  id="string"
                  name="firstName"
                  label="First Name"
                  placeholder="John"
                  value={this.state.firstName}
                  onChange={(e) => this.validateNames(e, "First Name")}
                  errorMessage={this.state.errors.firstName} />
                <TextField
                  id="string"
                  name="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  value={this.state.lastName}
                  onChange={(e) => this.validateNames(e, "Last Name")}
                  errorMessage={this.state.errors.lastName} />
                <TextField
                  id="string"
                  name="email"
                  label="Email"
                  placeholder="johndoe@msdn.com"
                  input-type="email"
                  value={this.state.email}
                  onChange={this.validateEmail}
                  errorMessage={this.state.errors.email} />
                <TextField
                  id="alphaNum"
                  name="hcn"
                  label="HCN"
                  placeholder="123456"
                  value={this.state.hcn}
                  onChange={(e) => this.validateNames(e, "HCN")}
                  errorMessage={this.state.errors.hcn} />
                <TextField
                  id="phonenumber"
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="Your Phone Number"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.validateNames(e, "Phone Number")}
                  errorMessage={this.state.errors.phoneNumber} />
              </div>
              <div className="ms-Grid-col ms-sm12 ms-md6 ms-lg5 ms-xl5 parent">
              <TextField
                  id="address"
                  name="addressLine1"
                  label="Address line 1"
                  placeholder="Your Address line 1"
                  value={this.state.addressLine1}
                  onChange={(e) => this.validateNames(e, "Address line 1")}
                  errorMessage={this.state.errors.addressLine1} />
                <TextField
                  id="address"
                  name="addressLine2"
                  label="Address line 2"
                  placeholder="Your Address line 2"
                  value={this.state.addressLine2}
                  onChange={(e) => this.validateNames(e, "Address line 2")}
                  errorMessage={this.state.errors.addressLine2} />
                <TextField
                  id="address"
                  name="city"
                  label="City"
                  placeholder="Your City"
                  value={this.state.city}
                  onChange={(e) => this.validateNames(e, "City")}
                  errorMessage={this.state.errors.city} />
                <TextField
                  id="address"
                  name="state"
                  label="State"
                  placeholder="Your State"
                  value={this.state.state}
                  onChange={(e) => this.validateNames(e, "State")}
                  errorMessage={this.state.errors.state} />
                <TextField
                  id="address"
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Your Postal Code"
                  value={this.state.postalCode}
                  onChange={(e) => this.validateNames(e, "Postal Code")}
                  errorMessage={this.state.errors.postalCode} />
              </div>
            </div>
            <div className="ms-Grid-row">
              <Stack horizontal horizontalAlign={"center"} tokens={{ childrenGap: 20, padding: '30px 0px 0px 0px' }}>
                <PrimaryButton id="btnCreateAccount" text="Create Account" type="submit"/>
                <PrimaryButton id="btnCancel" text="Cancel" onClick={() => {
                    window.close();
                }} />
              </Stack>
            </div>
          </div>
        </form>
      </>);
  }
}

export default AccountDialog;