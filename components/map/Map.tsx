"use client";

import { useEffect, useRef } from "react";

// Extend the Window interface to include _AMapSecurityConfig
declare global {
  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}
import AMapLoader from "@amap/amap-jsapi-loader";
import { Input } from "../ui/input";

export default function MapContainer(props: {
  handleGetPositionInfo: (
    province: string,
    city: string,
    county: string,
    addressDetail: string,
    areaCode: string
  ) => void;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let map: any = null;
  useEffect(() => {
    window._AMapSecurityConfig = {
      securityJsCode: "7427c5d55924bb6d368f28bb5188020c",
    };
    AMapLoader.load({
      key: "1b8bd88e065c939dc870105e6a1844bd", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.Scale",
        "AMap.Geolocation",
        "AMap.Geocoder",
        "AMap.AutoComplete",
        "AMap.PlaceSearch",
      ], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          zoom: 11, // 初始化地图级别
          center: [113.27, 23.17], // 初始化地图中心点位置
        });
        // 配置插件
        //   添加地图插件
        map!.plugin(["AMap.ToolBar"], function () {
          map!.addControl(new AMap.ToolBar()); // 工具条控件;范围选择控件
        });
        map!.plugin(["AMap.Scale"], function () {
          map!.addControl(new AMap.Scale()); // 比例尺条控件
        });
        // 初始化定位插件
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          showMarker: true,
          showButton: false,
        });

        map!.addControl(geolocation);

        // 获取当前定位
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geolocation.getCurrentPosition((status: string, result: any) => {
          if (status === "complete" && result.position) {
            // console.log("定位成功", result.position);
            map?.setCenter(result.position);
            getCityInfo(AMap, result.position);
          } else {
            console.error("定位失败", result);
          }
        });

        const autocomplete = new AMap.AutoComplete({
          city: "010",
          input: inputRef.current,
          output: mapRef,
        });
        const placeSearch = new AMap.PlaceSearch({
          city: "010",
          map,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        autocomplete.on("select", function (e: { poi: { name: any } }) {
          //针对选中的poi实现自己的功能
          placeSearch.search(e.poi.name);
          console.log(e.poi);
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, []);

  // 获取定位城市信息
  // 获取城市信息
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCityInfo = (AMap: any, position: any) => {
    const geocoder = new AMap.Geocoder();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geocoder.getAddress(position, (status: string, result: any) => {
      if (status === "complete" && result.regeocode) {
        console.log(result);
        const data = result.regeocode.addressComponent;
        const addressDetail = result.regeocode.formattedAddress.split(
          data.district
        )[1];
        props.handleGetPositionInfo(
          data.province,
          data.city,
          data.district,
          addressDetail,
          data.adcode
        );
      } else {
        console.error("获取城市信息失败", result);
      }
    });
  };
  return (
    <div className="z-[9999999]">
      <div
        id="container"
        ref={mapRef}
        className="p-0 m-0 w-full"
        style={{ height: "200px" }}
      ></div>
      <div>
        <Input
          placeholder="输入地址"
          ref={inputRef}
          id="input_id"
          onFocus={() => {
            const autocompletePanel = document.querySelector(
              ".amap-sug-result .auto-item"
            ) as HTMLElement;
            if (autocompletePanel) {
              // 设置更高的 z-index
              autocompletePanel.style.zIndex = "9999";
            }
          }}
          className="bg-white w-full h-8 mt-5 pl-2 rounded-xl text-sm outline-none focus:outline-none hover:outline-none"
        />
      </div>
    </div>
  );
}
