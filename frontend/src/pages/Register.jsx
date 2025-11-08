import React, { useState } from "react";
import API from "../api/api";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [role,setRole] = useState("student");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const [loading,setLoading] = useState(false);

  const validate = ()=>{
    if(!name.trim() || !email.trim() || !password) return toast.error("Please fill required fields");
    const re = /\S+@\S+\.\S+/;
    if(!re.test(email)) return toast.error("Enter valid email");
    if(password.length<6) return toast.error("Password min 6 chars");
    if(password!==confirm) return toast.error("Passwords do not match");
    return true;
  };

  const submit = async(e)=>{
    e.preventDefault();
    if(!validate()) return;
    try{
      setLoading(true);
      const res = await API.post("/auth/register",{name,email,password,role});
      toast.success(res?.data?.message || "Registered successfully");
      nav("/login");
    }catch(err){
      toast.error(err?.response?.data?.message || "Registration failed");
    }finally{ setLoading(false); }
  };

  return (
    <AuthLayout
      title="Create Account"
      footer={<>
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </>}
    >
      <form onSubmit={submit}>
        <AuthInput placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
        <AuthInput placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        
        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 mb-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <AuthInput placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <AuthInput placeholder="Confirm password" type="password" value={confirm} onChange={e=>setConfirm(e.target.value)} />

        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-2 rounded-md flex items-center justify-center">
          {loading ? <Loader size={16}/> : "Register"}
        </button>
      </form>
    </AuthLayout>
  );
}
