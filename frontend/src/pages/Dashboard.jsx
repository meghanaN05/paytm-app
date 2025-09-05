import AppBar from "../Components/AppBar";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Balance from "../Components/Balance"
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import Users from "../Components/Users";
import {BACKEND_URL} from "../../config"



// eslint-disable-next-line react/prop-types
export default function Dashboard() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [bal, setBal] = useState("")
    const [users, setUsers] = useState([])

    const [query, setQuery] = useState("")

    const fetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(BACKEND_URL+"/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const { username } = response.data.user;
            setName(username);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            } else {
                console.error("Failed to fetch user data:", error);
            }
        }
    }, [navigate]);

    const fetchUserBalance = useCallback(async () => {
        try {
            const response = await axios.get(BACKEND_URL+"/api/v1/account/balance", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const { balance } = response.data;
            setBal(balance);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/");
            } else {
                console.error("Failed to fetch user balance:", error);
            }
        }
    }, [navigate]);

    useEffect(() => {
        fetchUserData();
        fetchUserBalance();
    }, [fetchUserData, fetchUserBalance]);


    useEffect(() => {
        const fetchUsers = async () => {
            let url = BACKEND_URL+`/api/v1/user/bulk`;
            if (query) url += `?filter=${query}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setUsers(response.data.users)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    navigate("/");
                } else {
                    console.error("Failed to fetch users:", error);
                }
            }
        };

        const debounceFetch = setTimeout(() => {
            fetchUsers();
        }, 200);

        return () => clearTimeout(debounceFetch);
    }, [query, navigate]);



    return (
        <div className="bg-white mx-auto max-w-5xl">
            <AppBar name={name} />
            <Balance bal={bal} />
            <Heading text={"Users"} />
           

            <InputBox placeholder={"Search for a user"} onchange={(e) => {
                setQuery(e.target.value)
            }} />

            {Array.isArray(users) && users.map((user) => (
                user.username !== name && <Users key={user._id} name={user.firstName} onclick={() => {
                    navigate(`/send?userId=${user._id}&username=${user.firstName}`);
                }} />
            ))}
          


        </div>
    )
}

