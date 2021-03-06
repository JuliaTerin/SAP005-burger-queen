import { React, useState } from "react";
import './login.css';
import { Link, useHistory } from 'react-router-dom';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Footer from '../../components/Footer/Footer';
import Logo from '../../components/Logo/Logo';

function Login() {
  const history = useHistory()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const routerHall = () => {
    history.push('/Hall')
  }
  const routerKitchen = () => {
    history.push('/Kitchen')
  }

  function loginBtn(e) {
    e.preventDefault();
    fetch('https://lab-api-bq.herokuapp.com/auth', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `email=${email}&password=${password}`
    })
      .then((response) => response.json())
      .then((data) => {
        const name = data.name
        const role = data.role

        const nameUser = localStorage.setItem("name", name)
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId", data.id)

        if (nameUser !== null && role === "cozinha") {
          routerKitchen();
        } else if (nameUser !== null && role === "salão") {
          routerHall();
        } else {
          alert("Funcionário não encontrado!")
        }
      })
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  return (
    <>
      <div className="login">
        <Logo />
        <form className="login-right">
          <label className="loginInputEmail" htmlFor="loginInputEmail">
            <MdEmail />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="loginInputPassword" htmlFor="loginInputPassword">
            <MdLock />
            <input
              type={show ? "text" : "password"}
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye">
              {show ? (
                <MdVisibility size={25} onClick={handleClick} />
              ) : (
                <MdVisibilityOff size={25} onClick={handleClick} />
              )}
            </div>
          </label>
          <button type="submit" onClick={loginBtn}>
            Entrar
        </button>
          <h4>Não tem uma conta?<Link to="./Register/index.js"><strong> Cadastre-se.</strong></Link></h4>
        </form>
        <div className="login-footer">
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
