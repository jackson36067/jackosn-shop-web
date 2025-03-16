"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { doMemberLoginAPI, sendCodeAPI } from "@/apis/member";
import { toast } from "sonner";
import useMemberStore from "@/stores/MemberStore";
import { useRouter } from "next/navigation";

// 邮箱表单规则
const emailFormSchema = z.object({
  email: z
    .string()
    .email("请输入正确的邮箱地址")
    .min(1, { message: "邮箱不能为空" }),
  emailCode: z
    .string()
    .length(6, { message: "请输入正确的验证码" })
    .min(1, { message: "邮箱不能为空" }),
});

// 用户名表单规则
const nicknameFormSchema = z.object({
  nickname: z.string().min(1, { message: "用户名不能为空" }),
  password: z.string().min(1, { message: "密码不能为空" }),
});

export function LoginForm() {
  // 定义邮箱表单
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "jacksonn36067@gmail.com",
      emailCode: "",
    },
  });
  // 定义用户名表单
  const nicknameForm = useForm<z.infer<typeof nicknameFormSchema>>({
    resolver: zodResolver(nicknameFormSchema),
    defaultValues: {
      nickname: "jackson",
      password: "123456",
    },
  });

  // 获取验证码
  const getCode = async () => {
    // 获取验证码时先校验邮箱是否合法
    const isValid = await emailForm.trigger("email");
    if (!isValid) {
      return; // 校验未通过，不执行后续操作
    }
    const email = emailForm.getValues("email");
    await sendCodeAPI(email);
    toast.success("发送验证码成功");
  };

  // 本地存储登录用户信息
  const { setMemberInfo } = useMemberStore();

  const router = useRouter();

  // 邮箱表单提交执行
  async function onEmailFormSubmit(values: z.infer<typeof emailFormSchema>) {
    const res = await doMemberLoginAPI({
      email: values.email,
      emailCode: values.emailCode,
    });
    setMemberInfo(res.data);
    toast.success("登录成功");
    router.push("/");
  }

  // 用户名表单提交执行
  async function onNicknameFormSubmit(
    values: z.infer<typeof nicknameFormSchema>
  ) {
    const res = await doMemberLoginAPI({
      nickname: values.nickname,
      password: values.password,
    });
    setMemberInfo(res.data);
    toast.success("登录成功");
    router.push("/");
  }
  return (
    <Tabs defaultValue="nickname" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email">邮箱登录</TabsTrigger>
        <TabsTrigger value="nickname">用户名登录</TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <Card>
          {/* 邮箱登录页 */}
          <CardContent className="space-y-2">
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(onEmailFormSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>邮箱</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入你的邮箱" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={emailForm.control}
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
                          <Button onClick={() => getCode()}>获取验证码</Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mx-auto w-full">
                  登录
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      {/* 用户名登录页 */}
      <TabsContent value="nickname">
        <Card>
          <CardContent className="space-y-2">
            <Form {...nicknameForm}>
              <form
                onSubmit={nicknameForm.handleSubmit(onNicknameFormSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={nicknameForm.control}
                  name="nickname"
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
                  control={nicknameForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input
                          className="flex-grow"
                          placeholder="请输入密码"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mx-auto w-full">
                  登录
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
