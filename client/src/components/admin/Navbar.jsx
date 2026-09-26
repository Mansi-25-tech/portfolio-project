import React, { useState } from "react";

import {
    FaBars,
    FaBell,
    FaSearch,
    FaUserCircle,
    FaUser,
    FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import API from "../../services/api";


function Navbar({ setSidebarOpen }) {


    const { admin } = useAuth();

    const navigate = useNavigate();

    const [profileOpen, setProfileOpen] = useState(false);



    const date = new Date().toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );



    // LOGOUT

    const handleLogout = async () => {

        try {

            const res = await API.get(
                "/admin/logout",
                {
                    withCredentials: true
                }
            );


            alert(res.data.message);


            setProfileOpen(false);


            navigate("/admin/login");


        }
        catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Logout Failed"
            );

        }

    };



    return (

        <header
            className="
fixed
top-0
right-0
left-0
lg:left-72
h-20
bg-slate-950/90
backdrop-blur-xl
border-b
border-slate-800
z-30
px-4
sm:px-6
lg:px-8
flex
items-center
justify-between
"
        >


            {/* LEFT */}

            <div className="flex items-center gap-4">


                <button

                    onClick={() => setSidebarOpen(true)}

                    className="
lg:hidden
bg-slate-800
p-3
rounded-xl
text-white
"

                >

                    <FaBars />

                </button>



                <div>

                    <h2 className="text-xl md:text-2xl font-bold text-white">

                        Admin Dashboard

                    </h2>


                    <p className="text-xs text-slate-400">

                        {date}

                    </p>


                </div>


            </div>




            {/* RIGHT */}

            <div className="flex items-center gap-4">


                {/* SEARCH */}

                <div
                    className="
hidden
md:flex
items-center
bg-slate-900
border
border-slate-800
px-4
py-2
rounded-xl
"
                >


                    <FaSearch className="text-slate-400 mr-3" />


                    <input

                        type="text"

                        placeholder="Search..."

                        className="
bg-transparent
outline-none
text-white
w-40
"

                    />


                </div>




                {/* NOTIFICATION */}

                <button

                    className="
relative
bg-slate-900
border
border-slate-800
p-3
rounded-xl
"

                >

                    <FaBell className="text-white" />


                    <span
                        className="
absolute
top-2
right-2
w-2
h-2
bg-red-500
rounded-full
"
                    />


                </button>





                {/* PROFILE */}

                <div className="relative">


                    <button

                        onClick={() => setProfileOpen(!profileOpen)}

                        className="
flex
items-center
gap-3
"

                    >


                        <div className="hidden sm:block text-right">


                            <h4 className="text-white font-semibold">

                                {admin?.name || "Admin"}

                            </h4>


                            <p className="text-xs text-slate-400">

                                {admin?.email || "Administrator"}

                            </p>


                        </div>



                        <FaUserCircle
                            size={42}
                            className="text-cyan-400"
                        />


                    </button>





                    {
                        profileOpen &&


                        <div
                            className="
absolute
right-0
mt-3
w-56
bg-slate-900
border
border-slate-700
rounded-xl
shadow-xl
p-3
"
                        >


                            <button

                                onClick={() => navigate("/admin/profile")}

                                className="
w-full
flex
gap-3
items-center
px-4
py-3
text-white
hover:bg-slate-800
rounded-lg
"

                            >

                                <FaUser />

                                Profile

                            </button>




                            <button

                                onClick={handleLogout}

                                className="
w-full
flex
gap-3
items-center
px-4
py-3
text-red-400
hover:bg-slate-800
rounded-lg
"

                            >

                                <FaSignOutAlt />

                                Logout

                            </button>



                        </div>

                    }



                </div>



            </div>


        </header>

    )

}


export default Navbar;