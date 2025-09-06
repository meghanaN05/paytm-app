
import Heading from "../Components/Heading"
import SubHeading from "../Components/SubHeading"
import InputBox from "../Components/InputBox"
import Button from "../Components/Button"
import BottomWarning from "../Components/BottomWarning"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {BACKEND_URL} from "../../config"
export default function Signin() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return   <div className="bg-white mx-auto max-w-5xl">
        <Heading label={"SignIn"} />
        <SubHeading label={"Enter your Information"} />
        <InputBox label={"E-mail"} placeholder={"meghananoochila@gmail.com"} onchange={(e) => {
            setEmail(e.target.value)
        }} type="email" />
        <InputBox label={"Password"} placeholder={"Enter your password"} onchange={(e) => {
            setPassword(e.target.value)
        }} type="password" />
        <Button onclick={async () => {
            try {
                const response = await axios.post(BACKEND_URL+"/api/v1/user/signin", {
                    email,
                    password,
                });

                if (response.status !== 200) {
                    alert(`Error: ${response.data.message}`);
                } else {
                    localStorage.setItem("token", response.data.token);
                    navigate("/dashboard");
                    alert(response.data.message);
                }
            } catch (error) {
                if (error.response) {

                    alert(`Error: ${error.response.data.message}`);
                } else if (error.request) {

                    alert("Error: No response was received");
                } else {
                    // Something happened in setting up the request that triggered an Error

                    alert(`Error: ${error.message}`);
                }
            }



        }} label={"Sign-In"} />
        <BottomWarning label={"Sign-Up"} message={"Don't have an account"} to={"/signup"} />




    </div>
}
