import Button from "../Components/Button";
import InputBox from "../Components/InputBox";
import Heading from "../Components/Heading";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Round from "../Components/Round";
import {BACKEND_URL} from "../../config"
/* eslint-disable react/prop-types */
export default function SendMoney() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(0)
    const [searchParams] = useSearchParams();
    const to = searchParams.get('userId');
    
    const name = searchParams.get('username');
    return (
        <div className="bg-white mx-auto max-w-5xl">
            <div className="card bg-gray-100 shadow-lg rounded-lg p-6">
                <Heading label="Send Money" />
                <div className="flex items-center space-x-4">
                    <Round label={name} />
                    <h5 className="text-xl font-semibold">{name}</h5>
                </div>
                <div className="mt-4">
                   
                    <p className="text-lg font-semibold text-gray-700 p-2 m-2 text-left">Amount in Rs: {amount}</p>
                    <InputBox placeholder="Enter Amount" onchange={(e) => {
                        setAmount(e.target.value)
                    }} />
                </div>
                <div className="mt-4">
                    <Button label="Send" onclick={() => {
                        const sendMoney = async () => {
                            try {
                                const response = await axios.post(BACKEND_URL+"/api/v1/account/transfer", {
                                    to,
                                    amount: amount
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`
                                    }
                                });
                                if (response.status === 200) {
                                    alert(`Money sent successfully to ${name}`);
                                    navigate("/dashboard")
                                } else {
                                    alert(`Failed to send money: ${response.data.message}`);
                                }
                            } catch (error) {
                                if (error.response) {
                                    alert(`Error: ${error.response.data.message}`);
                                } else if (error.request) {
                                    alert("Error: No response was received");
                                } else {
                                    alert(`Error: ${error.message}`);
                                }
                            }
                        };
                        sendMoney();
                    }} />
                </div>
            </div>
            </div>
                      
    )
}

