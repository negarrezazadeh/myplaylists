import LoginForm from "../features/authentication/LoginForm";
import AppContainer from "../layouts/AppContainer";
import About from "./About";

function Login() {
  return (
    <AppContainer classes="xl:!ps-0 xl:!max-w-[600px]">
      <LoginForm />
      <div className="mt-6 px-3 pb-4">
        <About />
      </div>
    </AppContainer>
  );
}

export default Login;
