import React, { useEffect, useState } from "react";

import {
  FaProjectDiagram,
  FaLaptopCode,
  FaServicestack,
  FaEnvelope,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";


function Dashboard() {


  const navigate = useNavigate();



  const [stats, setStats] = useState([


    {
      title: "Projects",
      value: 0,
      icon: <FaProjectDiagram />,
      bg: "from-cyan-500 to-blue-600"
    },


    {
      title: "Skills",
      value: 0,
      icon: <FaLaptopCode />,
      bg: "from-green-500 to-emerald-600"
    },


    {
      title: "Services",
      value: 0,
      icon: <FaServicestack />,
      bg: "from-purple-500 to-pink-600"
    },


    {
      title: "Messages",
      value: 0,
      icon: <FaEnvelope />,
      bg: "from-orange-500 to-red-600"
    }


  ]);





  const fetchDashboard = async () => {


    try {


      const projectRes =
        await API.get("/getAllProjects");


      const serviceRes =
        await API.get("/getAllServices");


      const aboutRes =
        await API.get("/getAbout");



      setStats([


        {
          title: "Projects",
          value: projectRes.data.projects.length,
          icon: <FaProjectDiagram />,
          bg: "from-cyan-500 to-blue-600"
        },


        {
          title: "Skills",
          value: aboutRes.data.about.skills.length,
          icon: <FaLaptopCode />,
          bg: "from-green-500 to-emerald-600"
        },


        {
          title: "Services",
          value: serviceRes.data.services.length,
          icon: <FaServicestack />,
          bg: "from-purple-500 to-pink-600"
        },


        {
          title: "Messages",
          value: 0,
          icon: <FaEnvelope />,
          bg: "from-orange-500 to-red-600"
        }


      ])


    }
    catch (error) {

      console.log(error);

    }


  }




  useEffect(() => {

    fetchDashboard();

  }, [])




  return (

    <div>



      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">

          Welcome Back 👋

        </h1>


        <p className="text-slate-400">

          Portfolio Admin Dashboard

        </p>


      </div>




      <div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-6
">


        {
          stats.map((item, index) => (


            <div

              key={index}

              className={`
bg-gradient-to-r
${item.bg}
rounded-2xl
p-6
shadow-xl
hover:scale-105
transition
text-white
`}

            >


              <div className="flex justify-between items-center">


                <div>

                  <p>
                    {item.title}
                  </p>


                  <h2 className="text-4xl font-bold mt-3">

                    {item.value}

                  </h2>


                </div>



                <div className="text-4xl">

                  {item.icon}

                </div>


              </div>


            </div>


          ))
        }


      </div>





      <div className="
bg-slate-900
border
border-slate-800
rounded-2xl
mt-10
p-6
">


        <h2 className="text-2xl text-white font-semibold mb-6">

          Quick Actions

        </h2>



        <div className="
grid
grid-cols-2
md:grid-cols-3
gap-4
">


          <button

            onClick={() => navigate("/admin/projects")}

            className="
bg-cyan-600
py-3
rounded-xl
text-white
"

          >

            Add Project

          </button>



          <button

            onClick={() => navigate("/admin/services")}

            className="
bg-purple-600
py-3
rounded-xl
text-white
"

          >

            Add Service

          </button>




          <button

            onClick={() => navigate("/admin/about")}

            className="
bg-pink-600
py-3
rounded-xl
text-white
"

          >

            Edit About

          </button>



        </div>


      </div>



    </div>

  )

}


export default Dashboard;