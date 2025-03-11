import { LoginForm } from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div>
      <div>
        <div className="flex justify-center my-10">
          <img src="/image/reg_logo@2x.png" alt="logo" className="w-25 h-25" />
        </div>
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default Login;
