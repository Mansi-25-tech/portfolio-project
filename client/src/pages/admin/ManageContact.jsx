import React, { useEffect, useState } from "react";
import API from "../../services/api";

import {
    FaUser,
    FaTrash,
    FaEnvelope,
} from "react-icons/fa";


function ManageContact() {


const [contacts, setContacts] = useState([]);
const [loading, setLoading] = useState(true);


// FETCH CONTACTS

const fetchContacts = async () => {

    try {

        const res = await API.get("/getAllContact");

        setContacts(res.data.contacts);

    } catch(error){

        console.log(error);

    } finally {

        setLoading(false);

    }

};



useEffect(()=>{

    fetchContacts();

},[]);




// DELETE CONTACT

const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(
        "Are you sure you want to delete this message?"
    );


    if(!confirmDelete) return;



    try{


        const res = await API.delete(
            `/deleteContact/${id}`
        );


        alert(res.data.message);


        fetchContacts();


    }catch(error){


        console.log(error);


        alert(
            error.response?.data?.message ||
            "Delete Failed"
        );

    }

};





if(loading){

    return(
        <div className="text-white text-center py-20">
            Loading...
        </div>
    )

}




return (

<div>


{/* Heading */}

<div className="mb-8">

<h1 className="text-4xl font-bold text-white">
    Contact Messages
</h1>


<p className="text-slate-400 mt-2">
    Total Messages : {contacts.length}
</p>


</div>




{/* Table */}

<div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-xl">


<table className="w-full">


<thead className="bg-slate-800">

<tr>


<th className="p-4 text-left text-white">
Name
</th>


<th className="p-4 text-left text-white">
Email
</th>


<th className="p-4 text-left text-white">
Subject
</th>


<th className="p-4 text-left text-white">
Message
</th>


<th className="p-4 text-center text-white">
Action
</th>


</tr>

</thead>




<tbody>


{
contacts.length > 0 ?

contacts.map((item)=>(


<tr
key={item._id}
className="border-t border-slate-800 hover:bg-slate-800 transition"
>


<td className="p-4 text-white">

<div className="flex items-center gap-2">

<FaUser className="text-cyan-400"/>

{item.name}

</div>

</td>



<td className="p-4 text-slate-300">

<div className="flex items-center gap-2">

<FaEnvelope className="text-cyan-400"/>

{item.email}

</div>

</td>



<td className="p-4 text-slate-300">

{item.subject}

</td>



<td className="p-4 text-slate-400">

{item.message}

</td>



<td className="p-4 text-center">


<button

onClick={()=>handleDelete(item._id)}

className="
bg-red-500
hover:bg-red-600
text-white
p-3
rounded-xl
transition
"

>

<FaTrash/>

</button>


</td>



</tr>


))


:

<tr>

<td
colSpan="5"
className="text-center p-10 text-slate-400"
>

No Contact Messages Found

</td>

</tr>


}


</tbody>


</table>


</div>



</div>

)

}


export default ManageContact;