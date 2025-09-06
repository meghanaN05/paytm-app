import { useState } from "react"
import Heading from "../Components/Heading"
import SubHeading from "../Components/SubHeading"
import InputBox from "../Components/InputBox"

import Button from "../Components/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import {BACKEND_URL} from "../../config"



export default function Update() {
    const navigate = useNavigate()
    const [password, setPassword] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    return <div className="bg-white mx-auto max-w-5xl">
        <Heading label={"Update Section"} />
        <SubHeading label={"Enter your Information"} />
        <InputBox label={"First-Name"} placeholder={"Meghana"} onchange={(e) => {
            setFirstName(e.target.value)
        }} />
        <InputBox label={"Last-Name"} placeholder={"Noochila "} onchange={(e) => {
            setLastName(e.target.value)
        }} />
        <InputBox label={"password"} placeholder={"enter your password"} onchange={(e) => {
            setPassword(e.target.value)
        }} />
        <Button onclick={async () => {

            try {
                const requestBody = {};
                if (password !== null) {
                    requestBody.password = password;
                }
                if (firstName !== null) {
                    requestBody.firstName = firstName;
                }
                if (lastName !== null) {
                    requestBody.lastName = lastName;
                }

                const response = await axios.put(BACKEND_URL+"/api/v1/user/update", requestBody, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.status === 200) {
                    navigate("/dashboard");
                } else {
                    alert(`Error: ${response.data.message}`);
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
        }} label={"Update"} />


    </div>

}
