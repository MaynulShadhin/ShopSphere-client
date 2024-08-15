
const Login = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div>
                <h1 className="text-5xl font-bold mb-12">Login now!</h1>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-red-400 hover:bg-red-500">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;