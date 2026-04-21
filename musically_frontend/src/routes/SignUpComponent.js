import React from 'react'
import { useState } from 'react'
import TextInput from '../components/shared/TextInput'
import PasswordInput from '../components/shared/PasswordInput'
import { Link } from "react-router-dom"
import makeUnauthenticatedPOSTRequests from '../utils/serverHelpers'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';
import ThemeToggle from '../components/shared/ThemeToggle';

const SignUpComponent = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState("");

    const [,] = useCookies(['token']);

    const signUp = async () => {

        const data = {
            firstName,
            lastName,
            email,
            confirmEmail,
            password,
            // confirmPassword,
            username
        };

        if (email !== confirmEmail) {
            alert("Email & confirm email do not match");
            return;
        }

        try {
            const response = await makeUnauthenticatedPOSTRequests("/auth/register", data);

            console.log(response)

            if (response && !response.err) {
                console.log(response);
                alert("Sign up successful. Please log in now.");
                navigate('/login');
            } else {
                alert(`Sign up failed: ${response.err}`);
            }
        } catch (error) {
            console.error('SignUp failed:', error);
            alert(`Sign up failed: ${error.message}`);
        }
    };
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-app-black relative overflow-hidden py-10 transition-colors duration-200">
            {/* Nav Bar */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                <Link to="/home" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-primary transition-colors font-medium">
                    <Icon icon="material-symbols:arrow-back-rounded" className="text-xl" />
                    Back to Home
                </Link>
                <div className='bg-white dark:bg-black/40 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200 dark:border-white/10'>
                    <ThemeToggle />
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-1/2 h-1/2 bg-secondary/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="z-10 bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col items-center">
                <div className='mb-6'>
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Melofy</span>
                </div>

                <h2 className='text-2xl font-bold text-white mb-8 text-center'>
                    Sign up for free to start listening
                </h2>

                <div className="w-full grid grid-cols-2 gap-4 mb-4">
                    <TextInput
                        label="First Name"
                        placeholder="First Name"
                        value={firstName}
                        setValue={setFirstName}
                        labelClass="text-gray-300"
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Last Name"
                        value={lastName}
                        setValue={setLastName}
                        labelClass="text-gray-300"
                    />
                </div>

                <TextInput
                    label="Email address"
                    placeholder="Enter your email"
                    className="mb-4"
                    value={email}
                    setValue={setEmail}
                    labelClass="text-gray-300"
                />

                <TextInput
                    label="Confirm Email address"
                    placeholder="Enter your email again"
                    className="mb-4"
                    value={confirmEmail}
                    setValue={setConfirmEmail}
                    labelClass="text-gray-300"
                />

                <TextInput
                    label="Username"
                    placeholder="Enter profile username"
                    className="mb-4"
                    value={username}
                    setValue={setUsername}
                    labelClass="text-gray-300"
                />

                <PasswordInput
                    label='Password'
                    placeholder='Create a strong password'
                    className="mb-8"
                    value={password}
                    setValue={setPassword}
                    labelClass="text-gray-300"
                />

                <button
                    className='w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg mb-6'
                    onClick={(e) => {
                        e.preventDefault();
                        signUp();
                    }}
                >
                    SIGN UP
                </button>

                <div className='w-full border-t border-white/10 my-4'></div>

                <div className='text-gray-400 font-medium mb-4'>Already have an account?</div>

                <Link to="/login" className="w-full">
                    <button className='w-full bg-transparent border border-gray-600 text-white hover:border-white font-semibold py-3 rounded-full transition-colors duration-200'>
                        LOG IN INSTEAD
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SignUpComponent
