// import React from 'react'
// import { useState } from 'react'
// import TextInput from '../components/shared/TextInput'
// import PasswordInput from '../components/shared/PasswordInput'
// import { Link } from "react-router-dom";
// import makeUnauthenticatedPOSTRequests from '../utils/serverHelpers'
// import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';
// import { Icon } from '@iconify/react';
// import ThemeToggle from '../components/shared/ThemeToggle';

// const LoginComponent = () => {
//     const [cookie, setCookie] = useCookies(['token']);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();
//     const login = async () => {
//         const data = {
//             email,
//             password
//         };

//         try {
//             const response = await makeUnauthenticatedPOSTRequests("/auth/login", data);

//             console.log(response);
//             const token = response.token;



//             const date = new Date();
//             date.setDate(date.getDate() + 30);

//             setCookie('token', token, { path: '/', expires: date });
//             setCookie('user', JSON.stringify({ firstName: response.firstName, lastName: response.lastName, username: response.username }), { path: '/', expires: date });

//             if (response && !response.err) {
//                 console.log(response);
//                 alert("Logged In Successfully");
//                 navigate('/dashboard');
//             } else {
//                 alert(`Login failed: ${response.err}`);
//             }
//         } catch (error) {
//             console.error('SignUp failed:', error);
//             alert(`Login failed: ${error.message}`);
//         }
//     };
//     return (
//         <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-app-black relative overflow-hidden transition-colors duration-200">
//             {/* Nav Bar */}
//             <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
//                 <Link to="/home" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-primary transition-colors font-medium">
//                     <Icon icon="material-symbols:arrow-back-rounded" className="text-xl" />
//                     Back to Home
//                 </Link>
//                 <div className='bg-white dark:bg-black/40 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-200 dark:border-white/10'>
//                     <ThemeToggle />
//                 </div>
//             </div>

//             {/* Background elements */}
//             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
//                 <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px]"></div>
//                 <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-secondary/20 rounded-full blur-[100px]"></div>
//             </div>

//             <div className="z-10 bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
//                 <div className='mb-6'>
//                     <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Melofy</span>
//                 </div>

//                 <h2 className='text-2xl font-bold text-white mb-8 text-center'>
//                     Log in to continue
//                 </h2>

//                 <TextInput
//                     label="Email or Username"
//                     placeholder="Enter your email or username"
//                     className="mb-4"
//                     value={email}
//                     setValue={setEmail}
//                     labelClass="text-gray-300"
//                 />

//                 <PasswordInput
//                     label='Password'
//                     placeholder='Password'
//                     value={password}
//                     setValue={setPassword}
//                     className="mb-6"
//                 />

//                 <button
//                     className='w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg mb-6'
//                     onClick={(e) => {
//                         e.preventDefault();
//                         login();
//                     }}
//                 >
//                     LOG IN
//                 </button>

//                 <div className='w-full border-t border-white/10 my-4'></div>

//                 <div className='text-gray-400 font-medium mb-4'>Don't have an account?</div>

//                 <Link to="/signup" className="w-full">
//                     <button className='w-full bg-transparent border border-gray-600 text-white hover:border-white font-semibold py-3 rounded-full transition-colors duration-200'>
//                         SIGN UP FOR MELOFY
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     )
// }

// export default LoginComponent


import React, { useState } from 'react'
import TextInput from '../components/shared/TextInput'
import PasswordInput from '../components/shared/PasswordInput'
import { Link, useNavigate } from "react-router-dom";
import makeUnauthenticatedPOSTRequests from '../utils/serverHelpers'
import { useCookies } from 'react-cookie';
import { Icon } from '@iconify/react';
import ThemeToggle from '../components/shared/ThemeToggle';

const LoginComponent = () => {
    const [cookie, setCookie] = useCookies(['token']);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        const data = {
            email,
            password
        };

        try {
            const response = await makeUnauthenticatedPOSTRequests("/auth/login", data);

            console.log("Login Response:", response);

            const token = response.token;

            // ✅ expiry set
            const date = new Date();
            date.setDate(date.getDate() + 30);

            // ✅ save token
            setCookie('token', token, { path: '/', expires: date });

            // ✅ DECODE TOKEN (IMPORTANT 🔥)
            const payload = JSON.parse(atob(token.split(".")[1]));

            const user = {
                _id: payload.identifier,
                email: payload.email,
                firstName: response.firstName,
                lastName: response.lastName,
                username: response.username
            };

            // ✅ SAVE USER (MAIN FIX 🔥)
            localStorage.setItem("user", JSON.stringify(user));

            // optional cookie
            setCookie('user', JSON.stringify(user), { path: '/', expires: date });

            console.log("Saved User:", user);

            if (response && !response.err) {
                alert("Logged In Successfully");
                navigate('/dashboard');
            } else {
                alert(`Login failed: ${response.err}`);
            }

        } catch (error) {
            console.error('Login failed:', error);
            alert(`Login failed: ${error.message}`);
        }
    };

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-app-black relative overflow-hidden transition-colors duration-200">

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

            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-secondary/20 rounded-full blur-[100px]"></div>
            </div>

            {/* Login Box */}
            <div className="z-10 bg-black/40 backdrop-blur-md border border-white/10 p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
                
                <div className='mb-6'>
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Melofy</span>
                </div>

                <h2 className='text-2xl font-bold text-white mb-8 text-center'>
                    Log in to continue
                </h2>

                <TextInput
                    label="Email or Username"
                    placeholder="Enter your email or username"
                    className="mb-4"
                    value={email}
                    setValue={setEmail}
                    labelClass="text-gray-300"
                />

                <PasswordInput
                    label='Password'
                    placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    className="mb-6"
                />

                <button
                    className='w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-full transition-all duration-200 transform hover:scale-[1.02] shadow-lg mb-6'
                    onClick={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    LOG IN
                </button>

                <div className='w-full border-t border-white/10 my-4'></div>

                <div className='text-gray-400 font-medium mb-4'>Don't have an account?</div>

                <Link to="/signup" className="w-full">
                    <button className='w-full bg-transparent border border-gray-600 text-white hover:border-white font-semibold py-3 rounded-full transition-colors duration-200'>
                        SIGN UP FOR MELOFY
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default LoginComponent;