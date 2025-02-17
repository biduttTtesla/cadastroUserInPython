import { useEffect, useState } from "react";
import Style from "./AllUsers.module.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const AllUsers = () => {
  const navigate = useNavigate();
  const [data, setDados] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/getUsers");
      const data = response.data;
      setDados(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/deletUser/${id}`);
      setDados(data.filter(user => user.id !== id));  // Remove o usuário da lista sem recarregar a página
    } catch (error) {
      console.log("Erro ao deletar usuário:", error);
    }
  };

  const EditUserRoute = (id) => {
    navigate(`/putUser/${id}`);
  };
  
  

  return (
    <div>

      <div className={Style.DivTable}>
        <table border="1">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>
                  <button className={Style.buttonEdit} onClick={()=>EditUserRoute(user.id)}>Editar</button>
                </td>
                <td>
                  <button onClick={() => deleteUser(user.id)} className={Style.buttonDelet}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={Style.aButtonAddUser}>
        <NavLink to="/addUser"><button>Add user</button></NavLink>      
        </div>

      </div>

    
    </div>
  );
};

export default AllUsers;
