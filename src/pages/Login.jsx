import LoginForm from "../features/authentication/LoginForm";
import AppContainer from "../layouts/AppContainer";
import About from "./About";

function Login() {
  return (
    <AppContainer>
      <LoginForm />
      <div className="max-h-[calc(100vh-600px)] overflow-auto mt-6 px-3 pb-4">
        <About />
      </div>
    </AppContainer>
  );
}

export default Login;
