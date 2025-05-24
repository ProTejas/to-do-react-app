import React, { useState } from 'react';
import { data, Link } from 'react-router-dom'; // FIX: should be from 'react-router-dom'

import { FcGoogle } from "react-icons/fc";
// import ragistrationImg from '../../assets/ragistration-img.jpg';
import '../sign-up/sign-up.css';

function SignUp() {
    const [validation, setValidation] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
    });

    const [touched, setTouched] = useState({
        name: false,
        mobile: false,
        email: false,
        password: false,
    });


    const [regexValidation, setRegexValidation] = useState({
        name: true,
        mobile: true,
        email: true,
        password: true,
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setValidation((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        // Regex checks
        if (name === 'name') {
            const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
            setRegexValidation((prev) => ({
                ...prev,
                name: value.trim() === '' ? true : nameRegex.test(value),
            }));
        }

        if (name === 'mobile') {
            const mobileRegex = /^[0-9]{10}$/;
            setRegexValidation((prev) => ({
                ...prev,
                mobile: value.trim() === '' ? true : mobileRegex.test(value),
            }));
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setRegexValidation((prev) => ({
                ...prev,
                email: value.trim() === '' ? true : emailRegex.test(value),
            }));
        }

        if (name === 'password') {
            setRegexValidation((prev) => ({
                ...prev,
                password: value.trim() === '' ? true : value.length >= 6,
            }));
        }
    }

    async function handleClick(e) {
        e.preventDefault(); // prevent page reload

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validation)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                // redirect or show success message here
            } else {
                console.log('Server error:', data.message || 'Something went wrong');
            }

        } catch (err) {
            console.log('Error:', err);
        }
    }

    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <div className="form-div flex justify-center p-5 w-[50vw] bg-white rounded-md shadow">
                <div className='form-container'>
                    <h1 className='font-bold text-3xl'>Create account</h1>
                    <p className='text-sm text-gray-400'>Join our 100% free creative network</p>

                    <div className='sign-up-google'>
                        <div className='border-gray-300 border-2 w-96 flex justify-center p-2 rounded-md mt-4 font-bold cursor-pointer'>
                            <FcGoogle size={24} className='mr-1.5' /> Sign up with Google
                        </div>
                    </div>

                    <form className='flex flex-col mt-4' onSubmit={handleClick}>
                        {/* Name */}
                        <label htmlFor="name" className='font-semibold text-sm mt-2.5'>Name*</label>
                        <input type="text" id='name' name='name' value={validation.name} onChange={handleChange} className='w-96 border-2 rounded-md border-gray-300 p-1 pl-2' />
                        {touched.name && validation.name.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.name && validation.name.trim() !== '' && !regexValidation.name && <p className='text-sm mt-1 text-red-500'>Enter valid full name (e.g., John Doe)</p>}

                        {/* Mobile */}
                        <label htmlFor="mobile" className='font-semibold text-sm mt-2.5'>Mobile*</label>
                        <input type="number" id='mobile' name='mobile' value={validation.mobile} onChange={handleChange} className='w-96 border-2 rounded-md border-gray-300 p-1 pl-2 no-spinner' />
                        {touched.mobile && validation.mobile.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.mobile && validation.mobile.trim() !== '' && !regexValidation.mobile && <p className='text-sm mt-1 text-red-500'>Enter valid 10-digit mobile number</p>}

                        {/* Email */}
                        <label htmlFor="email" className='font-semibold text-sm mt-2.5'>Email*</label>
                        <input type="email" id='email' name='email' value={validation.email} onChange={handleChange} className='w-96 border-2 rounded-md border-gray-300 p-1 pl-2' />
                        {touched.email && validation.email.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.email && validation.email.trim() !== '' && !regexValidation.email && <p className='text-sm mt-1 text-red-500'>Enter a valid email</p>}

                        {/* Password */}
                        <label htmlFor="password" className='font-semibold text-sm mt-2.5'>Password*</label>
                        <input type="password" id='password' name='password' value={validation.password} onChange={handleChange} className='w-96 border-2 rounded-md border-gray-300 p-1 pl-2' />
                        {touched.password && validation.password.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.password && validation.password.trim() !== '' && !regexValidation.password && <p className='text-sm mt-1 text-red-500'>Password must be at least 6 characters</p>}

                        <button type='submit' className='w-96 bg-black text-white mt-5 p-2.5 rounded-md cursor-pointer'>Sign up</button>
                    </form>

                    <div className='text-center w-96 mt-2.5'>
                        <p className='text-gray-400 text-sm'>
                            Already Have account?
                            <span className='text-black'> <Link to='/log-in'>Log In</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
