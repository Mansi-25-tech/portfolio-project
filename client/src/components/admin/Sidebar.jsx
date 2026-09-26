import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaInfoCircle,
  FaServicestack,
  FaProjectDiagram,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import API from "../../services/api";


function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const navigate = useNavigate();


  const handleLogout = async () => {

    try {

      const res = await API.get("/admin/logout", {
        withCredentials:true
      });

      alert(res.data.message);

      navigate("/admin/login");


    } catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Logout Failed"
      );

    }

  };


  const menuItems = [

    {
      icon:<FaTachometerAlt/>,
      name:"Dashboard",
      path:"/admin/dashboard"
    },

    {
      icon:<FaUser/>,
      name:"Manage Hero",
      path:"/admin/hero"
    },

    {
      icon:<FaInfoCircle/>,
      name:"Manage About",
      path:"/admin/about"
    },

    {
      icon:<FaServicestack/>,
      name:"Manage Services",
      path:"/admin/services"
    },

    {
      icon:<FaProjectDiagram/>,
      name:"Manage Projects",
      path:"/admin/projects"
    },

    {
      icon:<FaEnvelope/>,
      name:"Contact Messages",
      path:"/admin/contact"
    },

    {
      icon:<FaCog/>,
      name:"Settings",
      path:"/admin/settings"
    }

  ];


  return (

    <>

      {/* Mobile Overlay */}

      {
        sidebarOpen &&

        <div
          className="
          fixed inset-0
          bg-black/60
          backdrop-blur-sm
          z-40
          lg:hidden
          "
          onClick={()=>setSidebarOpen(false)}
        />

      }



      <aside

      className={`
      
      fixed top-0 left-0
      z-50
      h-screen
      w-72
      
      bg-slate-950
      
      border-r
      border-slate-800
      
      shadow-2xl
      
      flex
      flex-col
      justify-between
      
      p-6
      
      transition-transform
      duration-300
      
      ${sidebarOpen 
        ? "translate-x-0"
        :
        "-translate-x-full"
      }

      lg:translate-x-0

      `}

      >


        {/* TOP SECTION */}


        <div>


          {/* Mobile Header */}

          <div
          className="
          flex
          justify-between
          items-center
          mb-8
          lg:hidden
          "
          >

            <h1
            className="
            text-2xl
            font-bold
            text-cyan-400
            "
            >
              Admin
            </h1>


            <button
            onClick={()=>setSidebarOpen(false)}
            className="
            text-slate-300
            hover:text-white
            "
            >

              <FaTimes size={22}/>

            </button>


          </div>




          {/* Desktop Logo */}


          <div
          className="
          hidden
          lg:block
          text-center
          mb-10
          "
          >

            <h1
            className="
            text-3xl
            font-extrabold
            
            bg-gradient-to-r
            from-cyan-400
            via-blue-500
            to-purple-500
            
            bg-clip-text
            text-transparent
            "
            >

              Admin Panel

            </h1>


            <p
            className="
            text-slate-500
            text-sm
            mt-2
            "
            >

              Portfolio CMS

            </p>


          </div>




          {/* MENU */}


          <ul
          className="
          space-y-3
          "
          >


          {
            menuItems.map((item,index)=>(


              <li key={index}>


              <NavLink

              to={item.path}

              onClick={()=>setSidebarOpen(false)}


              className={({isActive})=>

              `

              flex
              items-center
              gap-4

              px-4
              py-3

              rounded-xl

              transition-all
              duration-300

              group


              ${
                isActive

                ?

                "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"

                :

                "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"

              }

              `

              }


              >


                <span
                className="
                text-xl
                group-hover:scale-110
                transition
                "
                >

                  {item.icon}

                </span>



                <span
                className="
                font-medium
                "
                >

                  {item.name}

                </span>


              </NavLink>


              </li>


            ))
          }


          </ul>



        </div>





        {/* Bottom */}


        <div>


          <button

          onClick={handleLogout}

          className="
          w-full

          flex
          items-center
          justify-center
          gap-3

          py-3

          rounded-xl

          bg-gradient-to-r
          from-red-500
          to-pink-600

          hover:scale-105

          transition

          font-semibold

          text-white

          "

          >


            <FaSignOutAlt/>

            Logout


          </button>



          <p
          className="
          text-center
          text-slate-600
          text-xs
          mt-5
          "
          >

            © 2026 Portfolio CMS

          </p>


        </div>



      </aside>


    </>

  );

}


export default Sidebar;