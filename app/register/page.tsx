"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { doRegisterAPi, sendCodeAPI } from "@/apis/member";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { Separator } from "@/components/ui/separator";

// 校验规则
const registerSchema = z
  .object({
    username: z.string().min(2, "用户名至少2个字符"),
    email: z.string().email("请输入有效邮箱"),
    emailCode: z.string().length(6, "请输入6位验证码"),
    password: z.string().min(6, "密码至少6位"),
    confirmPassword: z.string().min(6, "确认密码至少6位"),
    phone: z.string().length(11, "请输入11位手机号"),
    terms: z.boolean().refine((v) => v === true, "必须同意用户协议"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  // 倒计时
  const [countdown, setCountdown] = useState<number>(0);
  const router = useRouter();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      emailCode: "",
      password: "",
      confirmPassword: "",
      phone: "",
      terms: false,
    },
  });

  // 提交注册表单函数
  const onSubmit = async (values: RegisterForm) => {
    console.log("提交数据:", values);
    try {
      const { username, email, emailCode, password, phone } = values;
      await doRegisterAPi({
        username: username,
        email: email,
        emailCode: emailCode,
        phone: phone,
        password: password,
      });
      toast.success("注册成功，请登录");
      router.push("/login");
    } catch (error) {
      console.error(error);
      values.emailCode = "";
      toast.error("注册失败，请重试");
    }
  };

  // 获取验证码
  const getCode = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // 只校验 email 字段
    e?.preventDefault(); // 避免触发表单提交
    e?.stopPropagation();

    const email = form.getValues("email")?.trim();
    if (!email) {
      form.setError("email", { type: "manual", message: "请先填写邮箱" });
      return;
    }
    try {
      await sendCodeAPI(email);
      toast.success("发送验证码成功");
      setCountdown(60); // 开始倒计时
    } catch (error) {
      console.error("发送验证码失败:", error);
      toast.error("验证码发送失败");
    }
  };

  // 倒计时副作用
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            用户注册
          </CardTitle>
        </CardHeader>
        {/* <Separator /> */}
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入用户名" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="请输入邮箱" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>验证码</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 w-full">
                        {/* 输入框，占比更大 */}
                        <Input
                          className="flex-grow"
                          placeholder="请输入验证码"
                          {...field}
                        />
                        {/* 按钮，占比较小 */}
                        <Button onClick={getCode} disabled={countdown > 0}>
                          {countdown > 0 ? `${countdown}s` : "获取验证码"}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="请输入密码"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>确认密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="请再次输入密码"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>手机号</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入手机号" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>我已阅读并同意用户协议</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                注册
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-2"
                onClick={() => router.back()}
              >
                返回上一页
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
