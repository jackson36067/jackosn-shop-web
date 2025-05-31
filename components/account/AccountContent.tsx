"use client";

import useMemberStore from "@/stores/MemberStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  sendCodeAPI,
  updateMemberEmailAPI,
  updateMemberPasswordAPI,
} from "@/apis/member";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  password: z.string().min(6, {
    message: "密码不能为空",
  }),

  newPassword: z.string().min(6, {
    message: "密码不能为空",
  }),
});
const eamilFormSchema = z.object({
  code: z.string().length(6, {
    message: "验证码格式不对",
  }),
  newEmail: z
    .string()
    .email({ message: "请输入合法的邮箱" })
    .min(1, { message: "邮箱不能为空" }),
});
const AccountContent = (props: { operateState: boolean }) => {
  const router = useRouter();
  const { updateMemberEmail, clearMemberInfo, memberInfo } = useMemberStore();
  const [open, setOpen] = useState<boolean>(false);
  // 对邮箱进行加密
  const emailStr = memberInfo.email!;
  const atIndex = emailStr.indexOf("@");
  // 获取用户名部分和域名部分
  const username = emailStr.substring(0, atIndex);
  const domain = emailStr.substring(atIndex);
  // 保留用户名的前两个字符，其余替换为 *，域名部分的第一部分（@符号后的第一段）替换为 *
  const encryptedUsername = username.substring(0, 2) + "***";
  // const handelClickAccount = (id: number) => {
  //   const loginAccount = loginAccountList.filter((item) => {
  //     return item.id === id;
  //   });
  // };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const emailForm = useForm<z.infer<typeof eamilFormSchema>>({
    resolver: zodResolver(eamilFormSchema),
    defaultValues: {
      code: "",
      newEmail: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await updateMemberPasswordAPI({
      password: data.password,
      newPassword: data.newPassword,
    });
    toast.success("更改密码成功,请重新登录");
    clearMemberInfo();
    router.push("/login");
  }

  const getCode = async () => {
    // 获取验证码时先校验邮箱是否合法
    const isValid = await emailForm.trigger("newEmail");
    if (!isValid) {
      return; // 校验未通过，不执行后续操作
    }
    const email = emailForm.getValues("newEmail");
    await sendCodeAPI(email);
    toast.success("发送验证码成功");
  };
  async function onEmailSubmit(data: z.infer<typeof eamilFormSchema>) {
    await updateMemberEmailAPI({ code: data.code, newEmail: data.newEmail });
    updateMemberEmail(data.newEmail);
    toast.success("更改邮箱成功");
    setOpen(false);
  }
  return (
    <div className="mt-10">
      {!props.operateState && (
        <div>
          <div>
            <p className="pl-2 mb-2">账号关联</p>
            <div className="w-full p-2 bg-white rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center py-2 border-b-[1px] border-gray-400">
                  <div className="flex items-center gap-3">
                    <Icon icon={"lineicons:phone"} />
                    <p>手机号</p>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <p>
                      {memberInfo.mobile!.substring(0, 3) +
                        "******" +
                        memberInfo.mobile!.substring(9, 11)}
                    </p>
                    <Icon icon={"icon-park-outline:right"} />
                  </div>
                </div>
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger className="w-full">
                    <div className="flex justify-between items-center py-2">
                      <div className="flex items-center gap-3">
                        <Icon icon={"weui:email-outlined"} />
                        <p>邮箱</p>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <p>{encryptedUsername + domain}</p>
                        <Icon icon={"icon-park-outline:right"} />
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="pb-10">
                    <DrawerHeader>
                      <DrawerTitle className="text-center">
                        更改邮箱
                      </DrawerTitle>
                      <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    <div className="flex justify-center">
                      <Form {...emailForm}>
                        <form
                          className="w-2/3 space-y-6"
                          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                        >
                          <FormField
                            control={emailForm.control}
                            name="newEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>邮箱</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="请输入你的邮箱"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={emailForm.control}
                            name="code"
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
                                    <Button onClick={() => getCode()}>
                                      获取验证码
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit" className="mx-auto w-full">
                            更改邮箱
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <div className="pl-2 mb-2">安全管理</div>
            <Drawer>
              <DrawerTrigger className="w-full">
                <div className="w-full p-2 bg-white rounded-lg">
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-3">
                      <Icon icon={"qlementine-icons:password-16"} />
                      <p>更改密码</p>
                    </div>
                    <Icon
                      className="text-gray-400"
                      icon={"icon-park-outline:right"}
                    />
                  </div>
                </div>
              </DrawerTrigger>
              <DrawerContent className="pb-10">
                <DrawerHeader>
                  <DrawerTitle className="text-center">更改密码</DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-center">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="w-2/3 space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>旧密码</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="旧密码"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>新密码</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="新密码"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">
                        新密码
                      </Button>
                    </form>
                  </Form>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountContent;
