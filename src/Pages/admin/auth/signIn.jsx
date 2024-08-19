import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const [, setIsUserAuth] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

const signIn = async () =>{
    try{
        await createUserWithEmailAndPassword(auth, email, password)
            navigate("/admin/dashboard");
        
    } catch (err){
        console.error(err)
    }
    
}

const logout = async () =>{
    try{
        await signOut(auth)
        setIsUserAuth(false)
    } catch (err){
        console.error(err)
    }
    
}

  return (
    <>
      <div className="flex justify-center items-center">
        <section className="flex flex-col justify-center items-center p-4 w-fit gap-4 bg-white rounded-lg">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-gray-900 text-white w-full p-2"
            onClick={signIn}
          >
            Sign In
          </button>
          <button
            className="bg-gray-900 text-white w-full p-2"
            onClick={logout}
          >
            Log Out
          </button>
        </section>
      </div>
    </>
  );
}

export default SignIn