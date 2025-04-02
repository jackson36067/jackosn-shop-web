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
  province: string;
  city: string;
  district: string;
  handleSelectCity: (province: string, city: string, county: string) => void;
}) => {
  const [citySelectList, setCitySelectList] = useState<CityItem[]>([]);
  const [activeSelect, setActiveSelect] = useState<number>(2);
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [county, setCounty] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  useMemo(() => {
    const array: CityItem[] = [];
    array.push({ title: props.province, value: 0 });
    array.push({ title: props.city, value: 1 });
    array.push({ title: props.district, value: 2 });
    setCitySelectList(array);
    setProvince(props.province);
    setCity(props.city);
    setCounty(props.district);
  }, [props.province, props.city, props.district]);

  const handleSelectCity = (item: string) => {
    props.handleSelectCity(province, city, item);
    setActiveSelect(2);
    citySelectList[1].title = item;
    setCounty(item);
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
                          setProvince(item);
                          citySelectList[0].title = item;
                          citySelectList[1].title = "";
                          setCity("");
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
                  {CityInfo.find((item) => item.province === province)
                    ?.city.map((item) => item.city)
                    .map((item, index) => {
                      return (
                        <div
                          className="flex items-center py-3 justify-between"
                          key={index}
                          onClick={() => {
                            setCity(item);
                            setActiveSelect(2);
                            setCounty("");
                            citySelectList[1].title = item;
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
