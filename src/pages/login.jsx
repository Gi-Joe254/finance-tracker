import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


export default function Login() {
const [userEmail, setUserEmail] = useState('j38555521@gmail.com')
const [userPassword, setUserPassword] = useState('12345678')

    const navigate = useNavigate();
    async function handleSubmit (e, type) {
        e.preventDefault();
        
        try{
            if (type === "login" )    
                {await signInWithEmailAndPassword(auth, userEmail, userPassword);
                navigate("/dashboard")}
            else{
                await createUserWithEmailAndPassword(auth, userEmail, userPassword);
                alert('account created. Now login')}
        }
        catch(err) {
            alert('failed')
        }
    }
  
        
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Finance Tracker</h1>
                <form>
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={userEmail} 
                            onChange={(e) => setUserEmail(e.target.value)}
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={userPassword} 
                            onChange={(e) => setUserPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <button onClick={(e)=>{handleSubmit(e, 'login')}}>Login</button>
                        <span>Don't Have an Account?</span>
                        <button onClick={(e)=>{handleSubmit(e, 'signup')}}>Signup</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
