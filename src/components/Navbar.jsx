import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/FirebaseProvider";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)

    const navLinks = <>
        <Link to="/" className="text-base font-medium mr-12 transition-all duration-75 hover:border-b-2 border-red-400">Home</Link>
        <Link className="text-base font-medium mr-12 transition-all duration-75 hover:border-b-2 border-red-400">About</Link>
        <Link className="text-base font-medium mr-12 transition-all duration-75 hover:border-b-2 border-red-400">Contact</Link>
    </>
    return (
        <div>
            <div className="navbar bg-red-50 md:px-12 md:py-4 shadow-md">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="text-xl font-bold">Shop<span className="text-red-500">Sphere</span></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 py-4">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="photo"
                                        src={user?.photoURL} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><a>{user?.displayName}</a></li>
                                <li><a onClick={logout}>Logout</a></li>
                            </ul>
                        </div> : <Link to="/login" className="btn bg-red-400">Login</Link>
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;