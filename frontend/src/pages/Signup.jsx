
import Heading from "../Components/Heading"
import SubHeading from "../Components/SubHeading"
import InputBox from "../Components/InputBox"
import Button from "../Components/Button"
import BottomWarning from "../Components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {BACKEND_URL} from "../../config"

export default function Signup() {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const navigate = useNavigate()

    return   <div className="bg-white mx-auto max-w-5xl">

        <Heading label={"SignUp"} />
        <SubHeading label={"Enter your Information"} />
        <InputBox label={"User-Name"} placeholder={"Manoj N"} onchange={(e) => {
            setUserName(e.target.value)
        }} type="text" />
        <InputBox label={"First-Name"} placeholder={"Manoj "} onchange={(e) => {
            setFirstName(e.target.value)
        }} type="text" />
        <InputBox label={"Last-Name"} placeholder={"Noochila "} onchange={(e) => {
            setLastName(e.target.value)
        }} type="text" />
        <InputBox label={"E-mail"} placeholder={"manojnoochila@gmail.com"} onchange={(e) => {
            setEmail(e.target.value)
        }} type="email" />
        <InputBox label={"Password"} placeholder={"Enter your password"} onchange={(e) => {
            setPassword(e.target.value)
        }} type="password" />
        <div className="flex justify-center">
            <Button onclick={async () => {

                try {
                    const response = await axios.post(BACKEND_URL+"/api/v1/user/signup", {
                        username,
                        email,
                        password,
                        firstName,
                        lastName
                    });

                    if (response.status === 200) {
                        localStorage.setItem("token", response.data.token);
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
            }} label={"Sign-Up"} />
        </div>
        <BottomWarning label={"Sign-In"} message={"Already have an account"} to={"/signin"} />





    </div>
}
