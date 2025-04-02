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
import { useState } from "react";

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
const AddressDrawerCoantent = () => {
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [county, setCounty] = useState<string>("");
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
    console.log(province, city, county, addressDetail, areaCode);
  };
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      addressDetail: "",
      name: "",
      tel: "",
      isDefault: false,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const handleSelectCity = (province: string, city: string, county: string) => {
    setProvince(province);
    setCity(city);
    setCounty(county);
    form.setValue("address", `${province}${city}${county}`);
  };
  return (
    <div>
      <MapContainer handleGetPositionInfo={handelGetpositionInfo} />
      <div className="w-full mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
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
            <Button type="submit" className="w-full">
              保存
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default AddressDrawerCoantent;
