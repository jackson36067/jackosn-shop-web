"use client";

import MapContainer from "../map/Map";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import CityCascsder from "../cityCascader/CityCascader";
import { useMemo, useRef, useState } from "react";
import axios from "axios";
import { addMemberAddressAPI, updateMemberAddressAPI } from "@/apis/address";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// 根据地址获取经纬度
async function getGeoLocation(address: string, city?: string) {
  const apiKey = "a23475c054d7323313e23b73995e2d77";
  const url = `https://restapi.amap.com/v3/geocode/geo?key=${apiKey}&address=${encodeURIComponent(
    address
  )}${city ? `&city=${encodeURIComponent(city)}` : ""}`;

  try {
    const { data } = await axios.get(url);
    if (data.status === "1" && data.geocodes.length > 0) {
      const location = data.geocodes[0].location.split(",");
      return { lng: parseFloat(location[0]), lat: parseFloat(location[1]) };
    } else {
      throw new Error("无法获取经纬度");
    }
  } catch (error) {
    console.error("获取地理编码失败:", error);
    return null;
  }
}

// 提交时,用于判断数据是否合法
const formSchema = z.object({
  address: z.string().min(2, {
    message: "地址不能为空",
  }),
  addressDetail: z.string().min(1, {
    message: "地址详情不能为空",
  }),
  name: z.string().min(1, {
    message: "收货人不能为空",
  }),
  tel: z
    .string()
    .min(1, { message: "手机号不能空" })
    .length(11, { message: "请输入合法的手机号" }),
  isDefault: z.boolean().default(false).optional(),
});

// 标签数据
const tagItems = ["家", "公司", "学校", "父母", "朋友", "自定义"];

const AddressDrawerContent = (props?: {
  id?: number; // 地址id,可传递
  province?: string; // 省份, 可传递
  city?: string; // 市, 可传递
  county?: string; // 区, 可传递
  addressDetail?: string; // 详细地址, 可传递
  areaCode?: string; // 地址编码, 可传递
  name?: string; // 收货人, 可传递
  tel?: string; // 电话, 可传递
  tag?: string;
  isDefault?: number; // 是否为默认地址, 可传递
  closeDrawer: () => void; // 通过该函数将父组件中的弹窗关闭
  handleGetNewMemberAddress: () => void; // 重新获取地址信息
}) => {
  // 是否发送请求
  const isFetch = useRef<boolean>(false);
  // 省份
  const [province, setProvince] = useState<string>("");
  // 城市
  const [city, setCity] = useState<string>("");
  // 区
  const [county, setCounty] = useState<string>("");
  // 地址经纬度
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  // 地址id
  const [id, setId] = useState<number>(0);
  // 地址区域码
  const [areaCode, setAreaCode] = useState<string>("");
  // 地址标签类型
  const [tag, setTag] = useState<string>("");
  // 地址标签值
  const [tagValue, setTagValue] = useState<string>("");
  // 定义弹窗中表单
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // 给定默认值
    defaultValues: {
      address: "",
      addressDetail: "",
      name: "",
      tel: "",
      isDefault: false,
    },
  });

  // 如果为更新地址 -> 那么就会接收一个地址,接收到该地址的信息,并定位地图
  useMemo(() => {
    // 判断是否发送请求
    if (isFetch.current) return;
    isFetch.current = true;
    async function fetchGeoLocation() {
      // 判断是否有传递值 -> 新增弹窗不会传递值
      if (props?.province) {
        // 更新地址 -> 传递了值,封装传递的值
        form.setValue("isDefault", props.isDefault === 0);
        form.setValue("name", props.name!);
        form.setValue("tel", props.tel!);
        setAreaCode(props.areaCode!);
        setId(props.id!);
        // tagValue要先赋值,防止后续tag变了
        setTagValue(props.tag!);
        setTag(
          !tagItems.includes(props.tag!) && props.tag !== ""
            ? "自定义"
            : props.tag!
        );
        // 获取到该传递地址的经纬度,传递给地图组件
        const result = await getGeoLocation(
          `${props.province}${props.city}${props.county}${props.addressDetail}`
        );
        setLocation({ lat: result!.lat, lng: result!.lng });
      }
    }
    fetchGeoLocation();
  }, [
    form,
    props?.addressDetail,
    props?.city,
    props?.county,
    props?.isDefault,
    props?.name,
    props?.province,
    props?.tel,
    props?.areaCode,
    props?.id,
    props?.tag,
  ]);

  // 当弹窗展示出地图时,地图会获取位置信息,封装地图位置信息,并且当地图位置变化时,也会执行该函数进行重新赋值
  const handelGetpositionInfo = (
    province: string,
    city: string,
    county: string,
    addressDetail: string,
    areaCode: string
  ) => {
    form.setValue("address", `${province}${city}${county}`);
    form.setValue("addressDetail", addressDetail);
    setProvince(province);
    setCity(city);
    setCounty(county);
    setAreaCode(areaCode);
  };

  // 新增或者更新地址弹窗中选择省/城/市是执行,将选择的结果封装
  const handleSelectCity = async (
    province: string,
    city: string,
    county: string
  ) => {
    // 修改表单的展示
    form.setValue("address", `${province}${city}${county}`);
    // 获取重新选择的地址经纬度
    const result = await getGeoLocation(`${province}${city}${county}`);
    // 根据重新获取的经纬度让地图定位到地址,并获取地址信息
    // 由于地图组件中监听了经纬度的变化,变化后或自动进行相关赋值
    setLocation({ lat: result!.lat, lng: result!.lng });
  };

  // 提交表单
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // 关闭弹窗
    props?.closeDrawer();
    // 判断是新增地址还是更新地址
    if (id !== 0) {
      // 有地址id -> 更新地址
      await updateMemberAddressAPI({
        addressId: id,
        province: province,
        city: city,
        county: county,
        addressDetail: values.addressDetail,
        areaCode: areaCode,
        tel: values.tel,
        isDefault: values.isDefault ? 0 : 1,
        name: values.name,
        tag: tagValue,
      });
      toast.success("更新地址成功");
    } else {
      // 没有地址id -> 新增地址
      await addMemberAddressAPI({
        addressId: id,
        province: province,
        city: city,
        county: county,
        addressDetail: values.addressDetail,
        areaCode: areaCode,
        tel: values.tel,
        isDefault: values.isDefault ? 0 : 1,
        name: values.name,
        tag: tagValue,
      });
      toast.success("新增地址成功");
    }
    // 重新获取用户地址数据
    props?.handleGetNewMemberAddress();
  }

  return (
    <div className="h-160 overflow-auto mt-0">
      <MapContainer
        location={location}
        handleGetPositionInfo={handelGetpositionInfo}
      />
      <div className="w-full mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <div className="flex items-center justify-between w-full">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel></FormLabel>
                    <FormControl>
                      <div {...field} className="flex items-center gap-1">
                        <p>{field.value}</p>
                        <CityCascsder
                          province={province}
                          city={city}
                          district={county}
                          handleSelectCity={handleSelectCity}
                        />
                      </div>
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isDefault"
                render={({ field }) => (
                  <FormItem className="flex items-center">
                    <FormLabel className="text-gray-400">默认地址</FormLabel>
                    <FormControl>
                      <Checkbox
                        className="border-gray-300 rounded-full"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="addressDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">详细地址</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none border-b-[1px] border-gray-300"
                    ></Input>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">收货人</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none border-b-[1px] border-gray-300"
                    ></Input>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-400">电话号码</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none border-b-[1px] border-gray-300"
                      type="tel"
                    ></Input>
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <p className="text-lg font-bold">地址标签</p>
              <div className="flex justify-between items-center gap-1 mt-4">
                {tagItems.map((item, index) => {
                  return (
                    <div
                      className={cn(
                        "flex-1 bg-gray-100 py-2  rounded-sm text-center",
                        item === tag && "bg-[#ffece5]/90 text-orange-600"
                      )}
                      key={index}
                      onClick={() => {
                        setTag(item);
                        // 当不是自定义标签值时,标签类型就是标签值
                        if (item !== "自定义") {
                          setTagValue(item);
                        } else {
                          setTagValue("");
                        }
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
              {tag === "自定义" && (
                <input
                  defaultValue={tagValue}
                  onInput={(event: React.FormEvent<HTMLInputElement>) => {
                    setTagValue(event.currentTarget.value);
                  }}
                  className="w-full py-1 pl-4 bg-gray-100 text-gray-500 border-none mt-3 focus:border-none outline rounded-sm focus:outline"
                  placeholder="输入标签名称"
                ></input>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 text-white text-lg"
            >
              保存地址
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default AddressDrawerContent;
