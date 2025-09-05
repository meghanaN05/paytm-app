/* eslint-disable react/prop-types */
import Button from "./Button"
import { useNavigate } from "react-router-dom";
import Round from "./Round";
import { useState } from "react";
import image from "../assets/hamburger.png"

export default function AppBar({ name }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex flex-col bg-white p-4 m-2 relative">
            <div className="fixed top-5 right-5 z-50">
                <button className="block md:hidden" onClick={toggleMenu}>
                    <img src={image} alt="Menu Icon" className="w-8 h-8 visible" />
                </button>
            </div>
            <h1 className="font-bold text-3xl self-start">Paytm</h1>
            <div className={`flex flex-col items-center justify-end space-y-4 ${isMenuOpen ? 'block' : 'hidden'} md:flex md:flex-row md:space-x-4 md:space-y-0 md:block`}>
                <div className="flex items-center">
                    <h3 className="p-2 font-bold">Hello {name}</h3>
                    <Round label={name} />
                </div>

                <Button label={"Update"} onclick={() => {
                    navigate("/update")
                }} />
                <Button label={"Log-Out"} onclick={() => {
                    navigate("/logout")
                }} />
            </div>
        </div>
    )
}
