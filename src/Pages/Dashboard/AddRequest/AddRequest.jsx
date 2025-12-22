import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';


const AddRequest = () => {

    const [upazilas, setUpazilas] = useState([])
    const [districts, setDistricts] = useState([])
    const { user } = useContext(AuthContext)
    
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axios.get('/upazila.json')
            .then(res => setUpazilas(res.data.upazilas))

        axios.get('/district.json')
            .then(res => (setDistricts(res.data.districts)))
    }, [])

    const handleSubmit =(e)=>{
        e.preventDefault()
        const form = e.target;

    const requestData = {
        requesterName: user?.displayName,
        requesterEmail: user?.email,

        recipientName: form.recipientName.value,
        bloodGroup: form.bloodGroup.value,

        district: form.district.value,
        upazila: form.upazila.value,

        hospital: form.hospital.value,
        address: form.address.value,

        donationDate: form.donationDate.value,
        donationTime: form.donationTime.value,

        message: form.message.value,

        status: "pending"
        
    };
    // console.log(requestData)
    
     axiosSecure.post('/requests',requestData)
       .then(res=>alert(res.data.insertedId))
       .catch(err=>console.log(err))
    }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Blood Donation Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Requester Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Requester Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="label">Requester Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Recipient Name</label>
            <input
              name="recipientName"
              type="text"
              placeholder="Recipient full name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select
              name="bloodGroup"
              className="select select-bordered w-full"
              required
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Recipient District</label>
            <select
              name="district"
              className="select select-bordered w-full"
              required
            >
              <option value="">Select your district</option>
              {districts.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Recipient Upazila</label>
            <select
              name="upazila"
              className="select select-bordered w-full"
              required
            >
              <option value="">Select your upazila</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hospital & Address */}
        <div>
          <label className="label">Hospital Name</label>
          <input
            name="hospital"
            type="text"
            placeholder="Dhaka Medical College Hospital"
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Full Address</label>
          <input
            name="address"
            type="text"
            placeholder="Zahir Raihan Rd, Dhaka"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Donation Date</label>
            <input
              name="donationDate"
              type="date"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Donation Time</label>
            <input
              name="donationTime"
              type="time"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="label">Request Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Explain why blood is needed..."
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-error w-full text-white">
          Request Blood
        </button>
      </form>
    </div>
  );
};

export default AddRequest;
