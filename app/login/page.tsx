"use client";

import { LoginForm } from "@/components/login/LoginForm";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex justify-center my-10">
          <Image
            src="/image/reg_logo@2x.png"
            alt="logo"
            className="w-25 h-25"
            width={25}
            height={25}
          />
        </div>
        <div className="flex justify-center">
          <LoginForm />
        </div>
        <div className="fixed bottom-10 left-0 flex gap-10 px-8">
          <div
            className="flex flex-col gap-2 items-center"
            onClick={() => {
              router.push("/register");
            }}
          >
            <div className="flex justify-center items-center w-10 h-10 rounded-full border-[1px] border-gray-500">
              <Icon
                icon={"material-symbols-light:add-rounded"}
                fontSize={"2rem"}
              />
            </div>
            <p>注册</p>
          </div>
          <div>
            <div className="flex flex-col gap-2 items-center">
              <div className="flex justify-center items-center w-10 h-10 rounded-full border-[1px] border-gray-500">
                <Icon
                  icon={"material-symbols-light:add-rounded"}
                  fontSize={"2rem"}
                />
              </div>
              <p>找回密码</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
