import React, { useEffect, useState } from "react";
import API from "../../services/api";

function Profile() {


    const [admin, setAdmin] = useState(null);

    const [loading, setLoading] = useState(true);


    const [form, setForm] = useState({
        name: "",
        email: ""
    });



    // ================= FETCH PROFILE =================

    const fetchProfile = async () => {

        try {

            const res = await API.get(
                "/admin/profile",
                {
                    withCredentials: true
                }
            );


            setAdmin(res.data.admin);


            setForm({
                name: res.data.admin.name,
                email: res.data.admin.email
            });


        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    }



    useEffect(() => {

        fetchProfile();

    }, [])




    // ================= CHANGE =================


    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }




    // ================= UPDATE =================


    const handleUpdate = async (e) => {

        e.preventDefault();


        try {


            const res = await API.put(

                "/admin/update-profile",

                form,

                {
                    withCredentials: true
                }

            );


            alert(res.data.message);


            fetchProfile();


        }
        catch (error) {

            console.log(error);


            alert(
                error.response?.data?.message ||
                "Update failed"
            );

        }


    }




    if (loading) {

        return (

            <div className="text-white text-center p-10">

                Loading Profile...

            </div>

        )

    }




    return (

        <div className="p-6">


            <h1 className="
text-4xl
font-bold
text-white
mb-8
">

                Admin Profile

            </h1>




            <div className="
bg-slate-900
border
border-slate-800
rounded-3xl
p-8
max-w-2xl
">





                {/* PROFILE HEADER */}


                <div className="
flex
items-center
gap-6
mb-10
">


                    <div
                        className="
w-24
h-24
rounded-full
bg-gradient-to-r
from-cyan-500
to-blue-600
flex
items-center
justify-center
text-4xl
text-white
font-bold
"
                    >

                        {
                            admin?.name?.charAt(0)
                        }


                    </div>



                    <div>


                        <h2 className="
text-2xl
font-bold
text-white
">

                            {admin?.name}

                        </h2>


                        <p className="
text-slate-400
">

                            {admin?.email}

                        </p>


                    </div>



                </div>





                <form
                    onSubmit={handleUpdate}
                    className="space-y-6"
                >



                    <div>


                        <label className="
text-white
block
mb-2
">

                            Name

                        </label>



                        <input

                            type="text"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                            className="
w-full
bg-slate-800
p-4
rounded-xl
text-white
outline-none
focus:ring-2
focus:ring-cyan-500
"

                        />


                    </div>






                    <div>


                        <label className="
text-white
block
mb-2
">

                            Email

                        </label>



                        <input

                            type="email"

                            name="email"

                            value={form.email}

                            onChange={handleChange}

                            className="
w-full
bg-slate-800
p-4
rounded-xl
text-white
outline-none
focus:ring-2
focus:ring-cyan-500
"

                        />


                    </div>





                    <button

                        className="
w-full
bg-cyan-500
hover:bg-cyan-600
py-4
rounded-xl
text-white
font-bold
transition
"

                    >

                        Update Profile

                    </button>



                </form>


            </div>



        </div>

    )

}

export default Profile;