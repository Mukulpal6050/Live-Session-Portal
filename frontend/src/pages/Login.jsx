import React, { useState, useContext } from "react";
import API from "../api/api";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";
import { AuthContext } from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res = await API.post("/auth/login",{email,password});
      const {token,role,id,name,email:userEmail} = res.data;

      localStorage.setItem("token",token);
      localStorage.setItem("role",role);
      localStorage.setItem("user",JSON.stringify({id,name,email:userEmail,role}));
      setAuth({token,role,user:{id,name,email:userEmail,role}});

      toast.success("Logged in successfully!");
      navigate(role==="admin"?"/admin/dashboard":"/student/dashboard");

    }catch(err){
      toast.error(err?.response?.data?.message || "Invalid credentials");
    }finally{
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      footer={<>
        Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </>}
    >
      <form onSubmit={handleLogin}>
        <AuthInput type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <AuthInput type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 rounded-md flex items-center justify-center gap-2">
          {loading ? <Loader size={16}/> : "Login" }
        </button>
      </form>
    </AuthLayout>
  )
}
