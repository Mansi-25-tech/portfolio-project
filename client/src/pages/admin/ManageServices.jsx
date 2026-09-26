import React, { useEffect, useState } from "react";
import API from "../../services/API";

function ManageServices() {

    const [services, setServices] = useState([]);

    const [open, setOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    const [editId, setEditId] = useState(null);


    const [form, setForm] = useState({
        title: "",
        description: "",
        icon: ""
    });


    // ================= FETCH SERVICES =================

    const fetchServices = async () => {

        try {

            const res = await API.get("/getAllServices");

            setServices(res.data.services || []);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchServices();

    }, []);



    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };



    // ================= ADD SERVICE =================

    const handleAdd = async (e) => {

        e.preventDefault();

        try {


            const res = await API.post(
                "/createService",
                form,
                {
                    withCredentials: true
                }
            );


            alert(res.data.message);


            setAddOpen(false);


            setForm({
                title: "",
                description: "",
                icon: ""
            });


            fetchServices();


        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }

    };



    // ================= EDIT OPEN =================

    const handleEdit = (service) => {


        setEditId(service._id);


        setForm({

            title: service.title,
            description: service.description,
            icon: service.icon

        });


        setOpen(true);


    };



    // ================= UPDATE =================

    const handleUpdate = async (e) => {

        e.preventDefault();


        try {


            const res = await API.put(

                `/updateService/${editId}`,

                form,

                {
                    withCredentials: true
                }

            );


            alert(res.data.message);


            setOpen(false);


            setForm({

                title: "",
                description: "",
                icon: ""

            });


            fetchServices();


        } catch (error) {

            console.log(error);


            alert(
                error.response?.data?.message ||
                "Update failed"
            );

        }

    };



    // ================= DELETE =================

    const handleDelete = async (id) => {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete?"
        );


        if (!confirmDelete) return;


        try {


            const res = await API.delete(

                `/deleteService/${id}`,

                {
                    withCredentials: true
                }

            );


            alert(res.data.message);


            fetchServices();


        } catch (error) {


            console.log(error);


            alert(
                error.response?.data?.message ||
                "Delete failed"
            );


        }


    };



    return (

        <div className="p-6">


            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">


                <h1 className="text-4xl font-bold text-white">
                    Manage Services
                </h1>


                <button

                    onClick={() => {

                        setForm({

                            title: "",
                            description: "",
                            icon: ""

                        });

                        setAddOpen(true);

                    }}

                    className="bg-cyan-500 px-6 py-3 rounded-xl text-white font-semibold"

                >

                    + Add Service

                </button>


            </div>




            {/* CARDS */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">


                {

                    services.map((service) => (


                        <div

                            key={service._id}

                            className="bg-slate-900 border border-slate-800 rounded-3xl p-8"

                        >


                            <div className="text-5xl text-cyan-400 mb-5">

                                {service.icon}

                            </div>



                            <h2 className="text-2xl font-bold text-white">

                                {service.title}

                            </h2>



                            <p className="text-slate-400 my-5">

                                {service.description}

                            </p>



                            <div className="flex gap-4">


                                <button

                                    onClick={() => handleEdit(service)}

                                    className="bg-yellow-500 px-5 py-2 rounded-xl text-white"

                                >

                                    Edit

                                </button>



                                <button

                                    onClick={() => handleDelete(service._id)}

                                    className="bg-red-500 px-5 py-2 rounded-xl text-white"

                                >

                                    Delete

                                </button>



                            </div>



                        </div>


                    ))

                }


            </div>





            {/* ADD MODAL */}

            {

                addOpen &&

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">


                    <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-xl">


                        <button

                            onClick={() => setAddOpen(false)}

                            className="text-white float-right text-xl"

                        >
                            ✕

                        </button>



                        <h2 className="text-3xl text-white font-bold mb-6">

                            Add Service

                        </h2>




                        <form onSubmit={handleAdd} className="space-y-5">


                            <input

                                name="title"

                                value={form.title}

                                onChange={handleChange}

                                placeholder="Title"

                                className="w-full p-4 bg-slate-800 text-white rounded-xl"

                            />



                            <textarea

                                name="description"

                                value={form.description}

                                onChange={handleChange}

                                placeholder="Description"

                                className="w-full p-4 bg-slate-800 text-white rounded-xl"

                            />



                            <input

                                name="icon"

                                value={form.icon}

                                onChange={handleChange}

                                placeholder="Icon"

                                className="w-full p-4 bg-slate-800 text-white rounded-xl"

                            />



                            <button

                                className="w-full bg-green-500 p-4 rounded-xl text-white font-bold"

                            >

                                Add Service

                            </button>


                        </form>


                    </div>

                </div>

            }





            {/* UPDATE MODAL */}

            {

                open &&

                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">


                    <div className="bg-slate-900 p-8 rounded-3xl w-full max-w-xl">


                        <button

                            onClick={() => setOpen(false)}

                            className="text-white float-right text-xl"

                        >
                            ✕

                        </button>



                        <h2 className="text-3xl text-white font-bold mb-6">

                            Update Service

                        </h2>



                        <form onSubmit={handleUpdate} className="space-y-5">


                            <input

                                name="title"

                                value={form.title}

                                onChange={handleChange}

                                className="w-full p-4 bg-slate-800 text-white rounded-xl"

                            />



                            <textarea

                                name="description"

                                value={form.description}

                                onChange={handleChange}

                                className="w-full p-4 bg-slate-800 text-white rounded-xl"

                            />



                            <input

                                name="icon"

                                value={form.icon}

                                onChange={handleChange}

                                className="w-full p-4 bg-slate-800 text-white rounded-xl"

                            />



                            <button

                                className="w-full bg-cyan-500 p-4 rounded-xl text-white font-bold"

                            >

                                Update Service

                            </button>



                        </form>



                    </div>


                </div>

            }



        </div>

    )

}

export default ManageServices;