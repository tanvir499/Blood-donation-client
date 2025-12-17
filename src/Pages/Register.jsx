import { FcGoogle } from "react-icons/fc";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { registerWithEmailPassword, setUser, handleGoogleSignIn } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const fullName = e.target.fullName.value;
    const photoURL = e.target.photoURL;
    const file = photoURL.files[0];
    const role = e.target.role.value;
    

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }
    if (!uppercase.test(password)) {
      return alert("Password must contain at least one uppercase letter");
    }
    if (!lowercase.test(password)) {
      return alert("Password must contain at least one lowercase letter");
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=dcbcdf508a83aba90cd5725d0c1a81b1`,
      { image: file },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      email,
      password,
      fullName,
      mainPhotoUrl,
      role
    };

    if (res.data.success == true) {
      registerWithEmailPassword(email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: mainPhotoUrl,
          })
            .then(() => {
              setUser(userCredential.user);
              axios
                .post("http://localhost:5000/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((error) => console.log(error));
              navigate("/");
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="rounded-2xl shadow-2xl p-8 w-[420px] border bg-white">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent mb-6">
          Create Your Paw Mart Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="font-medium">Full Name</label>
            <input
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 mt-1 rounded-lg border focus:ring focus:ring-sky-300 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 mt-1 rounded-lg border focus:ring focus:ring-sky-300 outline-none"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="font-medium">Photo URL</label>
            <input
              name="photoURL"
              type="file"
              placeholder="Enter your photo URL"
              className="w-full p-3 mt-1 rounded-lg border focus:ring focus:ring-sky-300 outline-none"
            />
          </div>
           {/* admin or user dropdown*/}
           <div>
             <label className="font-medium">Choose Role</label>
            <select
            name="role"
            defaultValue="Choose Role"
            placeholder="Enter Your Role"
            className="select select-neutral w-full p-3 mt-1 rounded-lg border focus:ring focus:ring-sky-300 outline-none">
            <option disabled={true}>Choose Role</option>
            <option value='manager'>Manager</option>
            <option value='buyer'>Buyer</option>
          </select>
           </div>
         

          {/* Password */}
          <div>
            <label className="font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 mt-1 rounded-lg border focus:ring focus:ring-sky-300 outline-none"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full text-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 hover:opacity-90 transition-all shadow-md"
          >
            Register
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 mt-2 font-semibold text-gray-700 rounded-lg border shadow-sm bg-white hover:shadow-md transition-all duration-300"
          >
            <FcGoogle />
            Continue with Google
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-sky-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
