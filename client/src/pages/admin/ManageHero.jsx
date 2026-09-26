import React, { useEffect, useState } from "react";
import API from "../../services/api";


function ManageHero() {

  const [hero, setHero] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({

    name: "",
    frontendTitle: "",
    backendTitle: "",
    subtitle: "",
    description: "",
    resumeLink: "",
    github: "",
    linkedin: "",
    instagram: ""

  });

  // ================= FETCH HERO =================


  const fetchHero = async () => {
    try {
      const res = await API.get("/getAllHero");
      setHero(res.data.hero);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {

    fetchHero();

  }, []);

  // ================= OPEN EDIT =================

  const handleEdit = () => {


    if (!hero) {
      return;
    }


    setOpenModal(true);


    setForm({

      name: hero.name || "",
      frontendTitle: hero.frontendTitle || "",
      backendTitle: hero.backendTitle || "",
      subtitle: hero.subtitle || "",
      description: hero.description || "",
      resumeLink: hero.resumeLink || "",
      github: hero.github || "",
      linkedin: hero.linkedin || "",
      instagram: hero.instagram || ""

    });


  }





  // ================= INPUT CHANGE =================


  const handleChange = (e) => {


    setForm({

      ...form,

      [e.target.name]: e.target.value

    })


  }




  // ================= IMAGE =================


  const handleImage = (e) => {


    setImage(e.target.files[0]);

  }





  // ================= UPDATE HERO =================


  const handleUpdate = async (e) => {


    e.preventDefault();



    if (!form.name.trim()) {

      alert("Name is required");
      return;

    }



    if (!form.description.trim()) {

      alert("Description is required");
      return;

    }



    try {


      setLoading(true);



      const formData = new FormData();



      formData.append("name", form.name);

      formData.append("subtitle", form.subtitle);

      formData.append(
        "frontendTitle",
        form.frontendTitle
      );


      formData.append(
        "backendTitle",
        form.backendTitle
      );


      formData.append(
        "description",
        form.description
      );


      formData.append(
        "resumeLink",
        form.resumeLink
      );


      formData.append(
        "github",
        form.github
      );


      formData.append(
        "linkedin",
        form.linkedin
      );


      formData.append(
        "instagram",
        form.instagram
      );





      if (image) {

        formData.append(
          "image",
          image
        );

      }





      const res = await API.put(

        `/updateHero/${hero._id}`,

        formData,

        {

          withCredentials: true

        }

      );



      alert(res.data.message);



      setOpenModal(false);


      setImage(null);


      fetchHero();



    } catch (error) {


      console.log(error);


      alert(
        error.response?.data?.message ||
        "Update Failed"
      );



    } finally {


      setLoading(false);


    }



  }
  return (

    <div className="p-6">


      {/* HEADING */}

      <h1 className="text-4xl font-bold mb-8 text-white">
        Manage Hero
      </h1>



      {/* HERO CARD */}

      <div className="bg-slate-900 rounded-3xl overflow-hidden">


        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-40"></div>



        <div className="p-8 relative">


          {/* IMAGE */}

          <div className="absolute -top-16 left-8">

            <img
              src={hero?.profileImage}
              alt={hero?.name}
              className="w-32 h-32 rounded-full border-4 border-slate-900 object-cover"
            />

          </div>



          {/* EDIT BUTTON */}

          <div className="flex justify-end">


            <button

              onClick={handleEdit}

              className="bg-yellow-500 hover:bg-yellow-600 px-5 py-3 rounded-xl text-white font-semibold"

            >

              Edit Hero

            </button>


          </div>




          <div className="mt-16 grid lg:grid-cols-2 gap-10">



            {/* LEFT */}

            <div>


              <h2 className="text-4xl font-bold text-white">

                {hero?.name}

              </h2>



              <p className="text-cyan-400 mt-3 text-lg">

                {hero?.subtitle}

              </p>



              <p className="text-slate-300 mt-6">

                {hero?.description}

              </p>



            </div>




            {/* RIGHT */}

            <div className="grid sm:grid-cols-2 gap-6">



              <div className="bg-slate-800 p-5 rounded-2xl">

                <h3 className="text-slate-400">
                  Frontend
                </h3>


                <p className="text-white font-semibold">

                  {hero?.frontendTitle}

                </p>


              </div>





              <div className="bg-slate-800 p-5 rounded-2xl">

                <h3 className="text-slate-400">
                  Backend
                </h3>


                <p className="text-white font-semibold">

                  {hero?.backendTitle}

                </p>


              </div>






              <div className="bg-slate-800 p-5 rounded-2xl">

                <h3 className="text-slate-400">
                  Resume
                </h3>


                <a
                  href={hero?.resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400"
                >

                  Open Resume

                </a>


              </div>





              <div className="bg-slate-800 p-5 rounded-2xl">

                <h3 className="text-slate-400">
                  Github
                </h3>


                <a
                  href={hero?.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400"
                >

                  Open Github

                </a>


              </div>






              <div className="bg-slate-800 p-5 rounded-2xl">

                <h3 className="text-slate-400">
                  LinkedIn
                </h3>


                <a
                  href={hero?.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400"
                >

                  Open LinkedIn

                </a>


              </div>

              <div className="bg-slate-800 p-5 rounded-2xl">

                <h3 className="text-slate-400">
                  Instagram
                </h3>


                <a
                  href={hero?.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400"
                >

                  Open Instagram

                </a>


              </div>



            </div>


          </div>



        </div>


      </div>





      {/* ================= MODAL ================= */}


      {
        openModal &&

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5">


          <div className="bg-slate-900 rounded-3xl p-8 w-full max-w-4xl overflow-y-auto max-h-[90vh]">



            <div className="flex justify-between items-center mb-8">


              <h2 className="text-3xl font-bold text-white">

                Update Hero

              </h2>



              <button

                onClick={() => setOpenModal(false)}

                className="text-white text-4xl"

              >

                ×

              </button>


            </div>





            <form

              onSubmit={handleUpdate}

              className="grid md:grid-cols-2 gap-5"

            >




              <input

                type="text"

                name="name"

                placeholder="Name"

                value={form.name}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />




              <input

                type="text"

                name="subtitle"

                placeholder="Subtitle"

                value={form.subtitle}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />






              <input

                type="text"

                name="frontendTitle"

                placeholder="Frontend Title"

                value={form.frontendTitle}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />





              <input

                type="text"

                name="backendTitle"

                placeholder="Backend Title"

                value={form.backendTitle}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />






              <input

                type="text"

                name="resumeLink"

                placeholder="Resume Link"

                value={form.resumeLink}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />






              <input

                type="text"

                name="github"

                placeholder="Github Link"

                value={form.github}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />






              <input

                type="text"

                name="linkedin"

                placeholder="LinkedIn Link"

                value={form.linkedin}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />






              <input

                type="text"

                name="instagram"

                placeholder="Instagram Link"

                value={form.instagram}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white"

              />





              <textarea

                name="description"

                placeholder="Description"

                value={form.description}

                onChange={handleChange}

                className="bg-slate-800 p-4 rounded-xl text-white md:col-span-2 h-32"

              />







              <div className="md:col-span-2">


                <label className="text-white block mb-2">

                  Profile Image

                </label>


                <input

                  type="file"

                  onChange={handleImage}

                  className="text-white"

                />


              </div>






              <button

                disabled={loading}

                className="md:col-span-2 bg-cyan-500 hover:bg-cyan-600 py-4 rounded-xl text-white font-bold"

              >

                {
                  loading ? "Updating..." : "Update Hero"
                }


              </button>





            </form>



          </div>


        </div>

      }



    </div>

  );



}


export default ManageHero;