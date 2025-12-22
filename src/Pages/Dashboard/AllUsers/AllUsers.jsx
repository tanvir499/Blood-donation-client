import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = () =>{
      axiosSecure.get("/users")
      .then((res) => {
      setUsers(res.data);
    });
  }

  useEffect(() => {
     fetchUsers()
  }, [axiosSecure]);

  const handleStatusChange = (email, status) => {
     axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
     .then(res=>{
        console.log(res.data);
        fetchUsers();
     })
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <th>Name</th>
            </th>
            <th>Role</th>
            <th>User Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            users?.map(user => 
             <tr>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img
                      src={user?.mainPhotoUrl}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{user?.fullName}</div>
                  <div className="text-sm opacity-50">{user?.email}</div>
                </div>
              </div>
            </td>
            <td>
              {user?.role}
              <br />
             
            </td>
            <td>{user?.status}</td>

            <th className="">
                {
                    user?.status == 'active' ? (<button  onClick={() => handleStatusChange(user?.email , 'block')} className="btn btn-error">Block</button>) :( <button onClick={() => handleStatusChange(user?.email , 'active')} className="btn mr-5 btn-primary">Active</button> )
                }
            </th>
           
          </tr>)
          }
         
        </tbody>
        
      
      </table>
    </div>
  );
};

export default AllUsers;
