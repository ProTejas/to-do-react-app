import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'

function Login() {
    const [validation, setValidation] = useState({
        email: '',
        password: '',
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });


    const [regexValidation, setRegexValidation] = useState({
        email: true,
        password: true,
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;

        setValidation((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));


        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setRegexValidation((prev) => ({
                ...prev,
                email: value.trim() === '' ? true : emailRegex.test(value),
            }));
        }

        /*  if (name === 'password') {
             setRegexValidation((prev) => ({
                 ...prev,
                 password: value.trim() === '' ? true : value.length >= 6,
             }));
         } */
    }

    async function handleClick(e) {
        e.preventDefault(); // prevent page reload

        try {
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(validation)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                navigate('/users-todos');
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
                    <h1 className='font-bold text-3xl'>Log in</h1>
                    <form className='flex flex-col mt-4' onSubmit={handleClick}>
                        {/* Email */}
                        <label htmlFor="email" className='font-semibold text-sm mt-2.5'>Email*</label>
                        <input type="email" id='email' name='email' value={validation.email} onChange={handleChange} className='w-96 border-2 rounded-md border-gray-300 p-1 pl-2' />
                        {touched.email && validation.email.trim() === '' && <p className='text-sm mt-1 text-red-500'>Field required</p>}
                        {touched.email && validation.email.trim() !== '' && !regexValidation.email && <p className='text-sm mt-1 text-red-500'>Enter a valid email</p>}

                        {/* Password */}
                        <label htmlFor="password" className='font-semibold text-sm mt-2.5'>Password*</label>
                        <input type="password" id='password' name='password' value={validation.password} onChange={handleChange} className='w-96 border-2 rounded-md border-gray-300 p-1 pl-2' />


                        <button type='submit' className='w-96 bg-black text-white mt-5 p-2.5 rounded-md cursor-pointer'>Log In</button>
                    </form>

                    <div className='text-center w-96 mt-2.5'>
                        <p className='text-gray-400 text-sm'>
                            Don't have account
                            <span className='text-black'> <Link to='/sign-up'>Sign Up</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login