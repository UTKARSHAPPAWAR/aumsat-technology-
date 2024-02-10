    // with zod
    import React, { useState } from 'react';
    import { useForm } from 'react-hook-form';
    import { z } from 'zod'; // Import the zod library
    import supabase from '../supabase';
    import { useNavigate } from 'react-router-dom';
    import ''

    // Define a Zod schema for form validation
    const schema = z.object({
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, 'Invalid password format'),
    });

    const Login = () => {
    const { register, handleSubmit, setError, formState } = useForm();
    const { errors } = formState;
    const [apiError, setApiError] = useState(null);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
        // Validate the form data using the Zod schema
        schema.parse(data);

        // Attempt to sign up a new user
        const { user, error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (error) {
            setApiError(error.message);
        } else {
            // Redirect to the homepage after successful sign up
            navigate('/homepage');
        }
        } catch (error) {
        if (error.errors) {
            // Handle Zod validation errors
            error.errors.forEach((err) => {
            const field = err.path.join('.');
            setError(field, { type: 'manual', message: err.message });
            });

            setApiError(null);
        } else {
            // Handle other errors (e.g., API errors)
            console.error('Sign up error:', error.message);
            setApiError('Sign up failed');
        }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: 'url(https://www.gstatic.com/culturalinstitute/searchar/assets/earth/desktop_light.mp4)' }}>
        <div className="bg-white p-10 rounded-lg shadow-lg w-96">
            <div className="flex items-center justify-center mb-6">
            <img src="https://i.tracxn.com/logo/company/chrome-capture__20__68b3294f-5145-452a-96ac-6655afa0415e.jpg?height=120&width=120" alt="AUMSAT Technologies Logo" className="mr-2" />
            <h1 className="text-2xl font-semibold text-blue-600">AUMSAT TECHNOLOGIES</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input
                {...register('email', { required: 'Email is required' })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
                id="email"
                type="email"
                placeholder="Enter your Email here"
                required
                />
                {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input
                {...register('password', { required: 'Password is required' })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                id="password"
                type="password"
                placeholder="Enter your Password here"
                required
                />
                {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex items-center justify-center">
                <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                >
                Login
                </button>
            </div>
            </form>
            {apiError && <p className="text-red-500 mt-4">{apiError}</p>}
        </div>
        </div>
    );
    };

    export default Login;
