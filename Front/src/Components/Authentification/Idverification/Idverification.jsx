import React, { useState } from 'react';
import '../Login/Login.css';
import Login from '../Login/Login';
import Signup from '../SignUp/Signup';
import planiproImageinscrir from '../../../images/inscririmage.png';
import planiproImagelogin from '../../../images/loginimage.png';
const Idverification = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleToggle = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="login">
      <div className={`container ${isSignIn ? '' : 'active'}`} id="container">
        {isSignIn ? <Login /> : <Signup />}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
            <h1 className='planipro'>PlaniPro</h1>
            <img  src={planiproImagelogin} alt="PlaniPro Logo" className="imageinscrire"/>
              <p>Entrez vos informations personnelles pour utiliser toutes les fonctionnalités du site</p>
              <button className="hidden" id="login" onClick={handleToggle}>
                Se connecter
                </button>
            </div>
            <div className="toggle-panel toggle-right">
            <h1 className='planipro'>PlaniPro</h1>
            <img  src={planiproImageinscrir} alt="PlaniPro Logo" className="imageinscrire"/>
            <p>Inscrivez-vous avec vos informations personnelles pour utiliser toutes les fonctionnalités du site</p>
            <button className="hidden" id="register" onClick={handleToggle}>
                S'inscrire
              </button>
          </div>
        </div>
      </div>
      </div>
  </div>
  );
};

export default Idverification;
