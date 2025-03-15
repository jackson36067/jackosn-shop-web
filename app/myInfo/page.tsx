"use client";

import {
  getMemberInfoAPI,
  updateMemberInfoAPI,
  uploadImageAPI,
} from "@/apis/member";
import TopBar from "@/components/myInfo/TopBar";
import { MemberUpdateInfo, UpdateMemberInfo } from "@/types/member";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RadioGroupDemo } from "@/components/myInfo/Radio";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { formatToLocalDate } from "@/utils/dateFormat";
import useMemberStore from "@/stores/MemberStore";

// 没有登录时默认的头像j
const defaultAvatar = "/image/user_avator_default@2x.png";

// 校验表单标准
const formSchema = z.object({
  nickname: z.string().min(1, { message: "用户名不能为空" }),
  gender: z.enum(["male", "female"], { required_error: "请选择你的性别" }),
  birthday: z.date({
    required_error: "请选择你的生日",
  }),
});

const MyInfo = () => {
  const { setMemberInfo } = useMemberStore();
  // 保存个人信息
  const [memberInfo, setMembersInfo] = useState<MemberUpdateInfo | null>(null);
  // 保存用户头像
  const [avatar, setAvatar] = useState<string>(defaultAvatar);

  // 控制组件是否渲染
  const [loading, setLoading] = useState(true);

  // 修改信息表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   nickname: memberInfo?.nickname,
    //   gender: "male",
    //   birthday: new Date(),
    // },
  });

  // 获取个人信息
  const getMemberInfo = async () => {
    try {
      const res = await getMemberInfoAPI();
      const data: MemberUpdateInfo = res.data;
      setMembersInfo(data);
      setAvatar(data.avatar);
      form.setValue("nickname", data.nickname);
      form.setValue("gender", data.gender === 0 ? "male" : "female");
      form.setValue("birthday", new Date(data.birthday));
    } catch (error) {
      console.error("获取用户信息失败:", error);
    } finally {
      setLoading(false); // 数据加载完成，解除 loading
    }
  };
  const hasFetched = useRef(false); // 追踪是否已经发送请求
  useEffect(() => {
    if (hasFetched.current) return; // 如果已经请求过，则不再执行
    hasFetched.current = true;
    getMemberInfo();
  }, []);

  // 上传头像
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const res = await uploadImageAPI(file);
    setAvatar(res.data);
    toast.success("上传头像成功");
  };

  // 保存用户数据
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const gender = values.gender == "male" ? 0 : 1;
    const birthday = formatToLocalDate(values.birthday);
    const updateMemberInfoParams: UpdateMemberInfo = {
      id: memberInfo!.id,
      nickname: values.nickname,
      avatar: avatar,
      gender: gender,
      birthday: birthday,
      password: "",
      mobile: "",
      email: "",
    };
    await updateMemberInfoAPI(updateMemberInfoParams);
    toast.success("更新个人数据成功");
    // 更新本地缓存信息
    setMemberInfo({
      nickname: values.nickname,
      avatar: avatar,
      gender: gender,
      birthday: birthday,
    });
  }
  // 🚀 在数据加载完成后再渲染组件
  if (loading) return null; // 或者返回一个 `Loading` 组件
  return (
    <div>
      <div className="bg-[#ff2d4a] pb-3">
        <TopBar />
        <div className="flex flex-col items-center gap-2 mt-10 w-full">
          {/* 点击头像上传 */}
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <img
              src={avatar || defaultAvatar}
              alt="头像"
              className="w-20 h-20 rounded-full border-white border-2 hover:opacity-80 transition"
              width={80}
              height={80}
            />
          </label>

          {/* 隐藏的文件选择框 */}
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <p className="text-sm text-white">点击修改头像</p>
        </div>
      </div>
      <div className="px-3 mt-4">
        <div className="border-[1px] border-gray-100 bg-white p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={""}
                        {...field}
                        value={memberInfo?.nickname}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>性别</FormLabel>
                    <FormControl>
                      <RadioGroupDemo gender={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>生日</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          className="bg-white z-99999"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                保存
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default MyInfo;
