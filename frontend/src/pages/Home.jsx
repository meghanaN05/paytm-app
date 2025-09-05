import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

export default function Home() {
    const navigate = useNavigate()
    return (
        <div className="p-5 m-5 bg-gray-200 font-sans flex justify-center items-center h-screen">
            <div className="text-center">
                <h1 className="font-bold">Welcome to Paytm</h1>
                <p className="font-bold">This is a simple and secure way to manage your finances. Sign in or sign up to get started.</p>
                <Button label={"Signin"} onclick={() => navigate('/signin')} />
                <Button label={"Signup"} onclick={() => navigate('/signup')} />
            </div>
        </div>
    )
}
