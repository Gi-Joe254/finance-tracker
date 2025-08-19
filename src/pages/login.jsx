import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
const [userEmail, setUserEmail] = useState('j38555521@gmail.com')
const [userPassword, setUserPassword] = useState('1234')

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //add validation logic here
        navigate("/dashboard")
    }
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Finance Tracker</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)}
                        required />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={userPassword} 
                        onChange={(e) => setUserPassword(e.target.value)}
                        required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}