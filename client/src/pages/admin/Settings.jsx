import React, { useState } from "react";
import API from "../../services/api";

function Settings() {

    const [form, setForm] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.put(
                "/admin/change-password",
                form,
                {
                    withCredentials:true
                }
            );


            alert(res.data.message);


            setForm({
                oldPassword:"",
                newPassword:"",
                confirmPassword:""
            });


        } catch(error){

            console.log(error);


            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };


    return (

        <div className="p-6">


            <h1 className="text-4xl font-bold text-white mb-8">
                Settings
            </h1>



            <div className="
                bg-slate-900
                border
                border-slate-800
                rounded-3xl
                p-8
                max-w-xl
            ">


                <h2 className="
                    text-2xl
                    font-bold
                    text-white
                    mb-6
                ">
                    Change Password
                </h2>



                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >


                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Old Password"
                        value={form.oldPassword}
                        onChange={handleChange}
                        className="
                        w-full
                        bg-slate-800
                        p-4
                        rounded-xl
                        text-white
                        outline-none
                        "
                    />



                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="
                        w-full
                        bg-slate-800
                        p-4
                        rounded-xl
                        text-white
                        outline-none
                        "
                    />



                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="
                        w-full
                        bg-slate-800
                        p-4
                        rounded-xl
                        text-white
                        outline-none
                        "
                    />



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
                        Update Password
                    </button>


                </form>


            </div>


        </div>

    );

}

export default Settings;