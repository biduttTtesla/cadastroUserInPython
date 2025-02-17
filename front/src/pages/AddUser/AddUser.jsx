import axios from "axios";
import { useState } from "react";

import { NavLink } from "react-router-dom";

import Style from "./AddUser.module.css";

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmitFormAddUser = async(e)=>{
    e.preventDefault();

    const User = {
      name,
      email
    };

    try {
      const response = await axios.post("http://127.0.0.1:3000/addUser", User);
      console.log(response.data);
      setName("");
      setEmail("");
      
    } catch (error) {
      const erro = error.response.data.erro;
      setError(erro);
      setEmail("");
    }

  };

  return (
    <div>
        <h1>addUser</h1>

      <div className={Style.divFormAddUser}>
        <form onSubmit={handleSubmitFormAddUser}>
          
          <label>
            <span>Nome:</span>
            <input type="text" name="name" placeholder="Digite seu nome" value={name} onChange={(e)=>setName(e.target.value)} required/>
          </label>
          
          <label>
            <span>E-mail:</span>
            <input type="email" name="email" placeholder="Digite seu melhor E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          </label>

          <button style={{padding:"0 3rem"}}>Enviar</button>
        
        </form>

        <button style={{backgroundColor:"rgb(99, 99, 255)", border:"none", padding:".2rem 3rem"}}>
          <NavLink to="/" style={{color:"#FFF"}}>Voltar para todos os dados</NavLink>
        </button>
      </div>

        {error}

    </div>
  )
}

export default AddUser