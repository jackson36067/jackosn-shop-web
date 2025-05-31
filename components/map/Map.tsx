"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ) => void; // 传递给父组件地图的信息
  location?: { lat: number; lng: number }; // 接收传递的经纬度,将地图定位到该地点
}) {
  // 装map的div DOM
  const mapRef = useRef<HTMLDivElement | null>(null);
  // 装 搜索地址的input DOM
  const inputRef = useRef<HTMLInputElement | null>(null);
  let map: any = null;
  // const location = useRef<{ lat: string; lng: string }>({ lat: "", lng: "" });

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
      ],
    })
      .then((AMap) => {
        // 判断是否有传递的地址经纬度,没有则使用指定的值作为map的中心
        const initialCenter =
          props.location?.lat !== 0 || props.location?.lng !== 0
            ? [props.location?.lng, props.location?.lat] // 如果传递了经纬度参数，使用它作为中心点
            : [113.27, 23.17]; // 默认的中心点

        // eslint-disable-next-line react-hooks/exhaustive-deps
        map = new AMap.Map("container", {
          viewMode: "3D",
          zoom: 11,
          center: initialCenter,
        });

        map!.plugin(["AMap.ToolBar"], function () {
          map!.addControl(new AMap.ToolBar());
        });
        map!.plugin(["AMap.Scale"], function () {
          map!.addControl(new AMap.Scale());
        });

        // 添加插件 -> 获取用户的定位
        const geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          showMarker: true,
          showButton: false,
        });

        map!.addControl(geolocation);
        // 判断是否有传递的地理位置,没有则根据浏览器定位
        if (props.location?.lat === 0 || props.location?.lng === 0) {
          // 如果没有传递经纬度参数，则进行当前位置定位
          geolocation.getCurrentPosition((status: string, result: any) => {
            if (status === "complete" && result.position) {
              // 将地图中心点设置为该地点
              map?.setCenter(result.position);
              // 解析获取该地理位置信息,该函数会调用父组件的函数,将信息传递给父组件
              getCityInfo(AMap, result.position);
            } else {
              console.error("定位失败", result);
            }
          });
        } else {
          // 如果有传递地理位置的经纬度信息,那么获取该地点的位置信息,该函数会调用父组件的函数,将信息传递给父组件
          getCityInfo(AMap, props.location);
        }

        const autocomplete = new AMap.AutoComplete({
          city: "010",
          input: inputRef.current,
          output: mapRef,
        });
        const placeSearch = new AMap.PlaceSearch({
          city: "010",
          map,
        });

        autocomplete.on("select", function (e: { poi: { name: any } }) {
          placeSearch.search(e.poi.name);
        });
      })
      .catch((e) => {
        console.log(e);
      });

    return () => {
      map?.destroy();
    };
  }, [props.location]); // 监听传递的位置经纬度,及时修改map中心点以及位置信息

  const getCityInfo = (AMap: any, position: any) => {
    const geocoder = new AMap.Geocoder();
    geocoder.getAddress(position, (status: string, result: any) => {
      if (status === "complete" && result.regeocode) {
        // 解析地理位置信息
        const data = result.regeocode.addressComponent;
        const addressDetail = result.regeocode.formattedAddress.split(
          data.district
        )[1];
        // 将信息传递给父组件
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
              autocompletePanel.style.zIndex = "9999";
            }
          }}
          className="bg-white w-full h-8 mt-5 pl-2 rounded-xl text-sm outline-none focus:outline-none hover:outline-none"
        />
      </div>
    </div>
  );
}
