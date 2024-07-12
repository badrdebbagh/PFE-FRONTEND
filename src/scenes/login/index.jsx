import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../state/authentication/Action";
import { Modal } from "@mui/material";
import { Box } from "lucide-react";

import { ToastAction } from "../../componentsShadn/ui/toast";
import { useToast } from "../../componentsShadn/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { toast } = useToast();
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleSignIn = async (e) => {
  //   e.preventDefault(); // Prevent the form from submitting traditionally

  //   try {
  //     const response = await axios.post("http://localhost:8080/auth/signin", {
  //       email,
  //       password,
  //     });

  //     console.log(response.data); // Process the response as needed

  //     navigate("/");
  //   } catch (error) {
  //     console.error("Login error", error.response);
  //     setError(
  //       error.response?.data?.message || "An error occurred during login."
  //     );
  //     // Optionally update the UI to reflect the error
  //   }
  // };

  const handleSignIn = (values) => {
    dispatch(loginUser({ userData: { email, password }, navigate }));
  };

  return (
    <div className="flex items-center h-full bg-white flex-col justify-center ">
      {/* <div className="relative bottom-[100px] w-[150px] bg-red-900 h-[100px]">
        <img
          className=" rounded w-[200px] h-full"
          src="../../assets/bcp_tech_maroc_logo.jpeg  "
          // sx={{ boxShadow: 3 }}
        />
      </div> */}
      <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 w-[700px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-semibold  text-orange-600">Bienvenue</h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Entrer vos details
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent cursor-text text-black"
              placeholder="Entrez votre mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-medium">Mot de passe</label>
            <input
              className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent cursor-text text-black"
              placeholder="Entrez votre Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <div className="mt-8 flex flex-col">
            <button
              onClick={handleSignIn}
              className="bg-[#f2762a] text-white text-lg font-bold py-3 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out"
            >
              Se Connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
