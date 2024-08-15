import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/FirebaseProvider";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const [error, setError] = useState('')
    const { signInUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const { email, password } = data
        signInUser(email, password)
            .then(() => {
                toast.success("Login Successful")
                navigate("/")
            })
            .catch(() => {
                setError("Please check your email and password")
            })
    }
    //google sign in
    const handleGoogleSignIn = () => {
        googleLogin()
        .then(()=>{
            toast.success("Login Successful");
            navigate('/');
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="hero bg-base-200 h-screen">
            <div>
                <h1 className="text-5xl font-bold mb-12">Login now!</h1>
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
                            <button type="submit" className="btn bg-red-400 hover:bg-red-500">Login</button>
                        </div>
                    </form>
                </div>
                <p className="text-xs text-center sm:px-6 text-gray-600">Do not have an account?
                    <Link className="text-red-400 font-bold" to="/register"> Sign Up</Link>
                </p>
                <div className="divider">OR</div>
                <button className="btn btn-ghost text-3xl mx-auto w-full" onClick={handleGoogleSignIn}><FaGoogle></FaGoogle></button>
            </div>
        </div>
    );
};

export default Login;