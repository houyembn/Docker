import React, {useState ,useEffect} from "react";
import { Alert, Space } from 'antd';
import { useUser } from "./UserContext";
import './Login.css';
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const {userName, userRole, updateUser } = useUser();
  const navigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();
    if ( !email || !password) {
      setAlertType("error");
      setAlertMessage("Veuillez remplir tous les champs.");
      setAlertVisible(true);
      return;
    }

    console.log(email, password);
    fetch("http://localhost:3001/api/login/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");

      if (data.status === "usernotok") {
      setAlertType("error");
      setAlertMessage("L'utilisateur n'existe pas.");
      setAlertVisible(true);
      }

      if (data.status === "passnotok") {
      setAlertType("error");
      setAlertMessage("Le mot de passe est incorrect");
      setAlertVisible(true);
      }

      if (data.status === "ok" && data.user) {
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        window.location.href = "./Projet?name=" + encodeURIComponent(data.user.name) + "&role=" + encodeURIComponent(data.user.role);
        updateUser(data.user.name,data.user.role);
      }

    })
    .catch((error) => {
      console.error("Erreur lors de la requête fetch:", error);
    });
  }




  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  return (
    <div className="login">
      <div className="container" id="container">
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}  style={{marginTop:'2px'}}>
            <h1 className='titre'>Se connecter</h1>
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              {/* eslint-disable jsx-a11y/anchor-is-valid */}
            <a href="#">Mot de passe oublié?</a>
            <button>Se connecter</button>

            {alertVisible && (
              <Space direction="vertical" style={{ width: '100%', marginTop: '10px' }}>
                <Alert
                  message={alertMessage}
                  type={alertType}
                  showIcon
                  closable
                  onClose={handleAlertClose}
                />
              </Space>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

