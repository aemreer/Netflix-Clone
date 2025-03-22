import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

function Login() {


    const [signState, setSignState] = useState('Sign In')

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const user_auth = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (signState === 'Sign In') {
            await login(email, password);
        }
        else {
            await signup(name, email, password);
        }
        setLoading(false)
    }

    return (
        loading ? <div className="login-spinner">
            <img src={netflix_spinner} alt="" />
        </div> :
            <div className="login">
                <img src={logo} alt="" className='login-logo' />
                <div className="login-form">
                    <h1>{signState}</h1>
                    <form>
                        {
                            signState === 'Sign Up' ?
                                <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Your Name' /> : <></>
                        }
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email ' />
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password ' />
                        <button type='submit' onClick={user_auth}>{signState}</button>
                        <div className="form-help">
                            <div className="remember">
                                <input type="checkbox" />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <p>Need Help?</p>
                        </div>
                    </form>
                    <div className="form-switch">
                        {
                            signState === 'Sign In' ? <p>New to Netflix? <span onClick={() => setSignState('Sign Up')}>Sign Up Now</span></p> :
                                <p>Already have account? <span onClick={() => setSignState('Sign In')}>Sign In Now</span></p>
                        }
                    </div>
                </div>
            </div>
    )
}

export default Login