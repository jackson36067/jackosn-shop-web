"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CityInfo } from "@/data/city";

type CityItem = {
  title: string;
  value: number;
};
const CityCascsder = (props: {
  province: string; // 父组件传递的省份初始值
  city: string; // 父组件传递的城市初始值
  district: string; // 父组件传递的区初始值
  handleSelectCity: (province: string, city: string, county: string) => void;
}) => {
  // 可以选择的城市列表 -> 省/市/区
  const [citySelectList, setCitySelectList] = useState<CityItem[]>([]);
  // 用户正在选的级别 省/市/区
  const [activeSelect, setActiveSelect] = useState<number>(2);
  // 省
  const [province, setProvince] = useState<string>("");
  // 市
  const [city, setCity] = useState<string>("");
  // 区
  const [county, setCounty] = useState<string>("");
  // 是否打开该弹窗
  const [open, setOpen] = useState<boolean>(false);
  useMemo(() => {
    const array: CityItem[] = [];
    // 将父组件传递的初始值加入到citySelectList中
    array.push({ title: props.province, value: 0 });
    array.push({ title: props.city, value: 1 });
    array.push({ title: props.district, value: 2 });
    setCitySelectList(array);
    setProvince(props.province);
    setCity(props.city);
    setCounty(props.district);
  }, [props.province, props.city, props.district]);

  // 选择区
  const handleSelectCity = (item: string) => {
    // 向父组件传递选择好的省-市-区
    props.handleSelectCity(province, city, item);
    setActiveSelect(2);
    citySelectList[1].title = item;
    setCounty(item);
    // 选择好区后关闭弹窗
    setOpen(false);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(open: boolean) => {
        setOpen(open);
        if (!open) {
          props.handleSelectCity(province, city, county);
        }
      }}
    >
      <DrawerTrigger>
        <div>
          <Icon icon={"iconamoon:arrow-down-2-thin"} fontSize={"1.5rem"} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>请选择地区</DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="px-3">
          {citySelectList.map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 border-l-[1px] border-orange-500"
              >
                <div
                  className="flex items-center py-3 justify-between"
                  onClick={() => {
                    setActiveSelect(item.value);
                  }}
                >
                  <div className="flex items-center gap-5 relative before:block before:w-2 before:h-2 before:bg-orange-500 before:absolute before:top-2 before:-left-[0.3rem] before:rounded-full">
                    <div></div>
                    <div
                      className={cn(
                        activeSelect === item.value && "text-orange-500"
                      )}
                    >
                      {item.title}
                    </div>
                  </div>
                  <div>
                    <Icon
                      icon={"iconamoon:arrow-right-2-thin"}
                      fontSize={"1.5rem"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="font-bold text-lg mt-3">
            {activeSelect === 0
              ? "所选省份/地区"
              : activeSelect === 1
              ? "所选城市"
              : "所选区/县"}
          </div>
          {/* 展示省份/城市/区 */}
          <div className="h-100 overflow-y-auto">
            <div>
              {activeSelect === 0 && (
                <div>
                  {CityInfo.map((item) => item.province).map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-2"
                        onClick={() => {
                          // 选择城市后 -> 改变城市名称
                          setProvince(item);
                          // 将选择的城市改为点击的城市
                          citySelectList[0].title = item;
                          // 将选择的市设置为空
                          citySelectList[1].title = "";
                          setCity("");
                          // 选择好省份后 -> 自动跳转到选择市
                          setActiveSelect(1);
                        }}
                      >
                        <div className="flex items-center py-3 justify-between">
                          <div className="flex items-center gap-5">
                            <div
                              className={cn(
                                province === item && "text-orange-500"
                              )}
                            >
                              {item}
                            </div>
                          </div>
                          <div>
                            <Icon
                              icon={"iconamoon:arrow-right-2-thin"}
                              fontSize={"1.5rem"}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              {activeSelect === 1 && (
                <div>
                  {/* 取出省份中的所有市 */}
                  {CityInfo.find((item) => item.province === province)
                    ?.city.map((item) => item.city)
                    .map((item, index) => {
                      return (
                        <div
                          className="flex items-center py-3 justify-between"
                          key={index}
                          onClick={() => {
                            // 设置市的值
                            setCity(item);
                            // 选择好市后,自动跳转选择区
                            setActiveSelect(2);
                            // 将区清空
                            setCounty("");
                            // 将选择的市改为点击的市
                            citySelectList[1].title = item;
                            // 将选择的区清空
                            citySelectList[2].title = "";
                          }}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={cn(city === item && "text-orange-500")}
                            >
                              {item}
                            </div>
                          </div>
                          <div>
                            <Icon
                              icon={"iconamoon:arrow-right-2-thin"}
                              fontSize={"1.5rem"}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            <div>
              {activeSelect === 2 && (
                <div>
                  {/* 取出选中的省份-市中的所有区/县 */}
                  {CityInfo.find((item) => item.province === province)
                    ?.city.find((cityItem) => cityItem.city === city)
                    ?.county?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center py-3 justify-between"
                          onClick={() => handleSelectCity(item)}
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={cn(
                                county === item && "text-orange-500"
                              )}
                            >
                              {item}
                            </div>
                          </div>
                          <div>
                            <Icon
                              icon={"iconamoon:arrow-right-2-thin"}
                              fontSize={"1.5rem"}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default CityCascsder;
