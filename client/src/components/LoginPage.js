import React from "react";

const LoginPage = ({show, setSignUp, loginData, setLoginData, loginCallback}) => {
    const handleChange = e => {
        setLoginData({...loginData, [e.target.name]: e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        var validUser = true
        var validPassword = true

        if (loginData.username === "") validUser = false
        if (loginData.password === "") validPassword = false

        if (!(validUser && validPassword)) {
            setLoginData({...loginData, validUser: validUser, validPassword: validPassword})
            return
        } else {
            loginCallback()
        }
    }

    return (
        <form className={`bg-light flex-col w-50 ${show?'visible':'hidden'}`} onSubmit={handleLogin}>
            <input
                type="text"
                placeholder="Username"
                className={`input-text ${loginData.validUser?"":"invalid"}`}
                name="username"
                value={loginData.username}
                onChange={handleChange}
                />
            <input
                type="password"
                placeholder="Password"
                className={`input-text ${loginData.validPassword?"":"invalid"}`}
                name="password"
                value={loginData.password}
                onChange={handleChange}
                />
            <div className="w-50 flex-row">
                <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    onChange={handleChange}
                    />
                <label htmlFor="remember">Remember me</label>
            </div>
            <button className="bg-blue btn w-50" type="submit">Login</button>
            <button className="bg-light btn w-50" type="button" onClick={setSignUp}>Sign Up</button>
        </form>
    );
};

export default LoginPage;