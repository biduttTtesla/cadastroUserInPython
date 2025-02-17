import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { id } = useParams();

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:3000/putUser/${id}`, { name });
  
      if(response.status == 200){
        navigate("/");
      };

    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <NavLink to="/">Voltar</NavLink>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <form onSubmit={handleEditUser}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <span>Nome:</span>
            <input
              type="text"
              name="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button>Editar</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
