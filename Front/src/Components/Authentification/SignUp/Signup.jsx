import React, { useState } from "react";
import '../Login/Login.css';
import { Alert, Space } from 'antd';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      // Validate form fields
      setAlertType("error");
      setAlertMessage("Veuillez remplir tous les champs.");
      setAlertVisible(true);
      return;
    }

    console.log(name, email, password);

    fetch("http://localhost:3001/api/register/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    })

    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status === "emailexiste") {
        // Email already exists, show an error alert
        setAlertType("error");
        setAlertMessage("Cette adresse e-mail existe déjà. Veuillez utiliser une autre adresse.");
        setAlertVisible(true);
      } else {
       // Registration successful, you may want to handle the token or redirect
       setAlertType("success");
       setAlertMessage("Inscription réussie. Vous pouvez vous connecter maintenant.");
       setAlertVisible(true);
      }
    })

    .catch((error) => {
      console.error("Erreur lors de l'inscription:", error);
      // Show an error alert
      setAlertType("error");
      setAlertMessage("Une erreur s'est produite lors de l'inscription.");
      setAlertVisible(true);
    });
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  return (
    <div className="login">
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit} style={{marginTop:'15px'}}>
            <h1 className='titre'>Créer un compte</h1>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>

            <div className="radios">
              <input type="radio" name="role" value="Employée" onChange={(e) => setRole(e.target.value)} id="employeeRadio" />
              <label htmlFor="employeeRadio"> <span className="radio-circle"></span> Employée</label>
              <input type="radio" name="role" value="Chef d'équipe" onChange={(e) => setRole(e.target.value)} id="teamLeaderRadio"/>
              <label htmlFor="teamLeaderRadio" id="chef"> <span className="radio-circle"></span> Chef d'équipe</label>
            </div> 

            <button>S'inscrire</button>

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
}
