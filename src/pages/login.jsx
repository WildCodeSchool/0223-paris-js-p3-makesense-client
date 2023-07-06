import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../store/auth";
import authService from "../services/auth";
import Input from "../components/Input";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.signin(form.email, form.password);
      dispatch(signin(result.data));
      navigate("/");
    } catch (err) {
      if (err.response.status === 400) return setError("courriel ou mot de passe incorrect");
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={signin.email}
          setValue={(e) => setForm({ ...signin, email: e.target.value })}
        />
        <Input
          type="password"
          value={signin.password}
          setValue={(e) => setForm({ ...signin, password: e.target.value })}
        />
        <Input type="submit" value="Se connecter" setValue="" />
      </form>
    </>
  );
}

export default Login;
