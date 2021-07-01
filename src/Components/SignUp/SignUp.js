import React, { useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import BlueSkyLogo from "../Images/loginHeader.png";
import {API_BASE_URL} from '../hooks/api';
import { withRouter } from "react-router-dom";

function SignUp(props) {
    const [state, setState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        // accountNumber: "",
        newPassword: "",
        confirmPassword: "",
        successMessage : null
    })

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState, 
            [id] : value
        }))
    }

    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/'); 
    }
  
    const sendDetailsToServer = () => {
        if(state.email.length && state.newPassword.length) {
            props.showError(null);
            const payload={
                "firstName":state.firstName,
                "lastName":state.lastName,
                "email":state.email,
                "password":state.newPassword, 
                "confirmPassword":state.confirmPassword,
                "successMessage": null
            }
            axios.post(API_BASE_URL+'user/', payload)
                .then(function (response) {
                    if(response.status === 200){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
    }
       
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.newPassword === state.confirmPassword) {
            sendDetailsToServer()
        } else {
            props.showError('Passwords do not match');
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center" style={{backgroundImage:"linear-gradient(to bottom, #99cfff, #e6f2ff"}}>
            <Image src={BlueSkyLogo} className="mx-auto" style={{maxWidth: "100%"}} />
            <p className="mt-3 w-80 mx-auto text-center" style={{fontSize:"11px", fontWeight:"bold", color:"#0a7ebd"}}>SERVING NEW YORK, NEW JERSEY & FLORIDA</p>
            <div className="w-75 mx-auto">
                <Form>
                    <Form.Label className="mt-1" style={{fontSize:"14px", fontWeight:"bold", color:"#434444"}}>REGISTER NEW USER</Form.Label>
                    <Form.Group size="lg" controlId="email">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="email"
                            value={state.email}
                            placeHolder="Email"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="firstName">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="text"
                            value={state.firstName}
                            placeHolder="First Name"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="lastName">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="text"
                            value={state.lastName}
                            placeHolder="Last Name"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* <Form.Group size="lg" controlId="accountNumber">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="text"
                            value={state.accountNumber}
                            placeHolder="Blue Sky Account # (if known)"
                            onChange={handleChange}
                        />
                    </Form.Group> */}
                    <Form.Group size="lg" controlId="newPassword">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="password"
                            value={state.newPassword}
                            placeHolder="New Password"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="confirmPassword">
                        <Form.Control
                            style={{fontSize:"14px"}}
                            type="password"
                            value={state.confirmPassword}
                            placeHolder="Confirm Password"
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button 
                        style={{fontWeight:"bold"}}
                        href="/home" 
                        block size="md" 
                        type="submit" 
                        onClick={handleSubmitClick}
                    >
                            SUBMIT
                    </Button>
                </Form>
            </div>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            <div className="mt-3 mb-5 w-75 mx-auto">
                <Button 
                    style={{fontWeight:"bold"}}
                    href="/login" 
                    variant="secondary" 
                    block size="md">                    
                        LOGIN
                </Button> 
            </div>
        </div>
    );
}

export default withRouter(SignUp);