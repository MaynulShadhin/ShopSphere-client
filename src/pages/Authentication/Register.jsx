import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/FirebaseProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { createUser, updateUser, logout } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, fullName, image, password } = data
        if (password.length < 6) {
            setError('Password should be at leaast 6 characters or longer')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setError('Must have an Uppercase letter in the password');
            return
        }
        else if (!/[a-z]/.test(password)) {
            setError('Must have a Lowercase letter in the password')
            return
        }
        setError('')
        //create user
        createUser(email, password)
            .then(() => {
                updateUser(fullName, image)
                    .then(() => {
                        toast.success('Registration Successful');
                        logout()
                        navigate('/login')
                    })
            })
            .catch(() => {
                setError('email already in use')
            })
    }

    return (
        <div>
            <div className="hero bg-base-200 h-screen">
                <div>
                    <h1 className="text-5xl font-bold mb-12">Register now!</h1>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"
                                    {...register("email", { required: true })}
                                    placeholder="email" className="input input-bordered" required />
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Your Name</span>
                                </label>
                                <input type="text"
                                    {...register("fullName", { required: true })}
                                    placeholder="Your name" className="input input-bordered" required />
                                {errors.fullName && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input type="text"
                                    {...register("image", { required: true })}
                                    placeholder="PhotoUrl" className="input input-bordered" required />
                                {errors.image && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                    {...register("password", { required: true })}
                                    placeholder="password" className="input input-bordered" required />
                                {errors.password && <span className="text-red-600">This field is required</span>}
                            </div>
                            {
                                error && <p className="text-red-600 text-center mb-2">{error}</p>
                            }
                            <div className="form-control mt-6">
                                <button type="submit" className="btn bg-red-400 hover:bg-red-500">Register</button>
                            </div>
                            <ToastContainer></ToastContainer>
                        </form>
                    </div>
                    <p className="text-xs text-center sm:px-6 text-gray-600">Already have an account?
                        <Link className="text-red-400 font-bold" to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;