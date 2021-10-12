import React from "react";

const SignUp = ({show, setLogin, signUpData, setSignUpData, signUpCallback}) => {
    const handleChange = (e) => {
        setSignUpData({...signUpData, [e.target.name]: e.target.value})
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        
        var validUser = true
        var validMail = true
        var validPassword = true

        if ( signUpData.username === "" ) validUser = false
        if ( signUpData.email === "" ) validMail = false
        if ( signUpData.password === "" ) validPassword = false

        setSignUpData({
            ...signUpData,
            validUser: validUser,
            validMail: validMail,
            validPassword: validPassword
        })

        if ( !(validUser && validMail && validPassword) ) return

        if ( signUpData.validUser && signUpData.validMail && signUpData.validPassword ) {
            signUpCallback()
        }
    }

    return (
        <form className={`bg-light flex-col w-50 ${show?'visible':'hidden'}`} onSubmit={handleSignUp}>
            <input
                type="text"
                placeholder="Username"
                name="username"
                className={`input-text ${signUpData.validUser?"":"invalid"}`}
                onChange={handleChange}
                />
            <input
                type="email"
                placeholder="Email"
                name="email"
                className={`input-text ${signUpData.validMail?"":"invalid"}`}
                onChange={handleChange}
                />
            <input
                type="password"
                placeholder="Password"
                name="password"
                className={`input-text ${signUpData.validPassword?"":"invalid"}`}
                onChange={handleChange}
                />
            <button className="bg-blue btn w-50" type="submit">Sign Up</button>
            <button className="bg-light btn w-50" type="button" onClick={setLogin}>Login</button>
        </form>
    );
};

export default SignUp;