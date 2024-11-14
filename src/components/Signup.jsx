import { useEffect, useState } from "react";
import { useParams,useOutletContext,useNavigate } from "react-router-dom";
import Errors from "./Errors"
export default function SignUp (){
    const[first_name,setFirstName] = useState(null);
    const[last_name,setLastName] = useState(null);
    const[username,setUsername] = useState(null);
    const[password,setPassword] = useState(null);
    const[passwordConfirm,setPasswordConfirm] = useState(null);
    const[author,setAuthor] = useState(null);
    const[formErrors,setFormErrors] = useState(null);

    function handleFirstNameChange(e){
        setFirstName(e.target.value)
    }
    function handleLastNameChange(e){
        setLastName(e.target.value)
    }
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    function handlePasswordChange(e){
        setPassword(e.target.value)
    }
    function handlePasswordConfirmChange(e){
        setPasswordConfirm(e.target.value)
    }
    function handleAuthorChange(e){
        setAuthor(e.target.value)
    }
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch("https://blog-api-backend-59l7.onrender.com/signup", {
              method: "POST",
              mode:"cors",
              headers: {
                "Content-Type": "application/json"
                },
              body: JSON.stringify({ first_name,last_name,username,password,passwordConfirm,author }),
            });
            if(response.status != 200){
                const json = await response.json();
                setFormErrors(json.errors)
                
            }else{ 
                navigate('../homepage');
            }
          } catch (er) {
            console.error(er);
          }

       
    }
    return (
        <div className="content">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" id="first_name" value={first_name} onChange={handleFirstNameChange} required/>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" id="last_name" value={last_name} onChange={handleLastNameChange} required/>
                <label htmlFor="username">Email</label>
                <input type="email" name="username" id="username" value={username} onChange={handleUsernameChange} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={handlePasswordChange} required/>
                <label htmlFor="passwordConfirm">Password</label>
                <input type="password" name="passwordConfirm" id="passwordConfirm" value={passwordConfirm} onChange={handlePasswordConfirmChange} required/>
                <fieldset>
                    <legend>Sign up as an author? </legend>
                    <div>
                        <input type="radio" id="true" name="author" value="true" onChange={handleAuthorChange}/>
                        <label htmlFor="true">Yes</label>
                    </div>
                    <div>
                        <input type="radio" id="false" name="author" value="false" onChange={handleAuthorChange}/>
                        <label htmlFor="false">No</label>
                    </div>
                </fieldset>
                <button type="submit" >Submit</button>
            </form>
            <Errors errors={formErrors}/>
        </div>
    
    )
}


