import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import '../sign-up/sign-up.css'; // Optional: consider using only Tailwind

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

    const [emailExists, setEmailExists] = useState(false);
    const [loading, setLoading] = useState(false);

    const [regexValidation, setRegexValidation] = useState({
        name: true,
        mobile: true,
        email: true,
        password: true,
    });

    const regexMap = {
        name: /^[A-Za-z]+ [A-Za-z]+$/,
        mobile: /^[0-9]{10}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValidation((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));

        if (name === 'email') setEmailExists(false); // reset existence state

        setRegexValidation((prev) => ({
            ...prev,
            [name]:
                value.trim() === ''
                    ? true
                    : name === 'password'
                        ? value.length >= 6
                        : regexMap[name]
                            ? regexMap[name].test(value)
                            : true,
        }));
    };

    const isFormValid =
        validation.name &&
        validation.mobile &&
        validation.email &&
        validation.password &&
        Object.values(regexValidation).every(Boolean);

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);

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
                navigate('/log-in');
            } else {
                console.log('Server error:', data.msg || 'Something went wrong');
                if (data.msg === "Email already exists") {
                    setEmailExists(true);
                }
            }

        } catch (err) {
            console.log('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <div className="form-div flex justify-center p-5 w-[50vw] bg-white rounded-md shadow">
                <div className='form-container w-full'>
                    <h1 className='font-bold text-3xl'>Create account</h1>
                    <p className='text-sm text-gray-400'>Join our 100% free creative network</p>

                    <div className='sign-up-google'>
                        <button type="button" className='border-gray-300 border-2 flex justify-center p-2 rounded-md mt-4 font-bold cursor-pointer w-full'>
                            <FcGoogle size={24} className='mr-1.5' /> Sign up with Google
                        </button>
                    </div>

                    <form className='flex flex-col mt-4' onSubmit={handleClick}>
                        {/* Name */}
                        <label htmlFor="name" className='font-semibold text-sm mt-2.5'>Name*</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            value={validation.name}
                            onChange={handleChange}
                            className='border-2 rounded-md border-gray-300 p-1 pl-2'
                        />
                        {touched.name && validation.name.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.name && validation.name.trim() !== '' && !regexValidation.name && <p className='text-sm mt-1 text-red-500'>Enter valid full name (e.g., John Doe)</p>}

                        {/* Mobile */}
                        <label htmlFor="mobile" className='font-semibold text-sm mt-2.5'>Mobile*</label>
                        <input
                            type="text"
                            id='mobile'
                            name='mobile'
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={validation.mobile}
                            onChange={handleChange}
                            className='border-2 rounded-md border-gray-300 p-1 pl-2'
                        />
                        {touched.mobile && validation.mobile.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.mobile && validation.mobile.trim() !== '' && !regexValidation.mobile && <p className='text-sm mt-1 text-red-500'>Enter valid 10-digit mobile number</p>}

                        {/* Email */}
                        <label htmlFor="email" className='font-semibold text-sm mt-2.5'>Email*</label>
                        <input
                            type="email"
                            id='email'
                            name='email'
                            value={validation.email}
                            onChange={handleChange}
                            className='border-2 rounded-md border-gray-300 p-1 pl-2'
                        />
                        {touched.email && validation.email.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.email && validation.email.trim() !== '' && !regexValidation.email && <p className='text-sm mt-1 text-red-500'>Enter a valid email</p>}
                        {emailExists && <p className='text-sm mt-1 text-red-500'>Email already exists</p>}

                        {/* Password */}
                        <label htmlFor="password" className='font-semibold text-sm mt-2.5'>Password*</label>
                        <input
                            type="password"
                            id='password'
                            name='password'
                            value={validation.password}
                            onChange={handleChange}
                            className='border-2 rounded-md border-gray-300 p-1 pl-2'
                        />
                        {touched.password && validation.password.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.password && validation.password.trim() !== '' && !regexValidation.password && <p className='text-sm mt-1 text-red-500'>Password must be at least 6 characters</p>}

                        <button
                            type='submit'
                            className='bg-black text-white mt-5 p-2.5 rounded-md cursor-pointer disabled:opacity-50'
                            disabled={!isFormValid || loading}
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </button>
                    </form>

                    <div className='text-center mt-2.5'>
                        <p className='text-gray-400 text-sm'>
                            Already have an account?
                            <span className='text-black'> <Link to='/log-in'>Log In</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
