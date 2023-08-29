import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleToken }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsLetter, setNewsLetter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email,
          username: name,
          password,
          newsletter: newsLetter,
        }
      );
      //   console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="signup-container" onSubmit={handleSubmit}>
      <h1>S'inscrire</h1>
      <input
        value={name}
        type="text"
        placeholder="Nom d'utilisateur"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        value={email}
        type="email"
        placeholder="Email"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        value={password}
        type="password"
        placeholder="Mot de passe"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div>
        <input
          type="checkbox"
          checked={newsLetter}
          onChange={() => {
            setNewsLetter(!newsLetter);
          }}
        />
        <span>S'inscrire à notre Newsletter</span>
      </div>
      <button type="submit"> S'inscrire</button>
    </form>
  );
};

export default SignUp;
