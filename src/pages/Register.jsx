import RegisterForm from "../features/authentication/RegisterForm";
import AppContainer from "../layouts/AppContainer";
import About from "./About";

function Register() {
  return (
    <AppContainer classes="xl:!ps-0 xl:!max-w-[600px]">
      <RegisterForm />
      <div className="mt-6  px-3 pb-4">
        <About />
      </div>
    </AppContainer>
  );
}

export default Register;
