"use client";

import { GoodsDetail } from "@/types/goods";
import Banner from "../home/Banner";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import StarRating from "./starRating";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import ToTopButton from "../home/ToTop";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import AddressPage from "@/app/address/page";
import { Button } from "../ui/button";
import useSelectedAddressStore from "@/stores/selectAddressStore";
import { AddressItem } from "@/types/address";

// 商品详情组件用于解析富文本内容
const RichText: FC<{ content: string }> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

const GoodsDetailContent = (props: {
  goodsDetail: GoodsDetail | null;
  showButton: boolean;
}) => {
  const { setSelectedAddress } = useSelectedAddressStore();
  const [defaultAddress, setDefaultAddress] = useState<string>("");
  // 用于接收用户点击地址后传递的地址信息
  const [selectAddress, setSelectAddress] = useState<AddressItem | null>(null);
  // 初始地址设置为默认地址,没有默认地址就设置成空字符串
  useEffect(() => {
    setDefaultAddress(props.goodsDetail?.defaultAddress || "");
  }, [props.goodsDetail?.defaultAddress]);

  // 点击地址后将地址传递过来
  const handleSelectedAddress = (address: AddressItem) => {
    setSelectAddress(address);
  };

  // 点击确认按钮后,更改选中地址
  const handleChangeAddress = () => {
    // 点击确认再将最后点击的地址信息封装到选中的地址信息中
    const { province, city, county, addressDetail } = selectAddress || {};
    setDefaultAddress(`${province}${city}${county}${addressDetail}`);
    setSelectedAddress(selectAddress);
  };
  return (
    <div>
      {props.goodsDetail ? (
        <div>
          {/* 商品图片列表 */}
          <div>
            <Banner BannerItems={props.goodsDetail.gallery} className="h-120" />
          </div>
          {/* 商品属性 */}
          <div className="px-3 mt-3">
            {/* 商品名称 */}
            <div className="text-lg font-semibold">
              {props.goodsDetail.name}
            </div>
            {/* 商品描述 */}
            <div className="mt-2 text-sm text-gray-500">
              {props.goodsDetail.brief}
            </div>
            {/* 商品价格 */}
            <p className="text-xl mt-2 font-bold text-red-500">
              ¥{props.goodsDetail.retailPrice}
              <span className="text-sm text-black line-through ml-2 font-medium">
                ￥{props.goodsDetail.counterPrice}
              </span>
            </p>
            {/* 商品属性 */}
            <div className="flex flex-col gap-4 mt-5 text-gray-400">
              <div className="flex items-center justify-between">
                <p>规格</p>
                <div>
                  <p></p>
                  <Icon icon={"ri:arrow-right-s-line"} fontSize={"1.6rem"} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>属性</p>
                <div>
                  <p></p>
                  <Icon icon={"ri:arrow-right-s-line"} fontSize={"1.6rem"} />
                </div>
              </div>
              <Drawer>
                <DrawerTrigger>
                  <div className="flex items-center justify-between">
                    <p>送至</p>
                    <div className="flex items-center gap-2">
                      <p className="max-w-80 truncate">
                        {props.goodsDetail.defaultAddress && defaultAddress}
                      </p>
                      <Icon
                        icon={"ri:arrow-right-s-line"}
                        fontSize={"1.6rem"}
                      />
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                  </DrawerHeader>
                  <AddressPage
                    addressSelectedPage={true}
                    selectedAddress={(address: AddressItem) =>
                      handleSelectedAddress(address)
                    }
                  />
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button
                        className="bg-orange-500 text-white"
                        onClick={() => handleChangeAddress()}
                      >
                        确认
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <div className="flex items-center justify-between">
                <p>运费</p>
                <div className="flex items-center gap-2">
                  <p>满88免运费</p>
                  <Icon icon={"ri:arrow-right-s-line"} fontSize={"1.6rem"} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p>评论</p>
                <div className="flex items-center gap-2">
                  <p>
                    好评率
                    {props.goodsDetail.goodCommentNumber === 0
                      ? props.goodsDetail.goodCommentNumber
                      : (
                          props.goodsDetail.goodCommentNumber /
                          (props.goodsDetail.badCommentNumber +
                            props.goodsDetail.goodCommentNumber +
                            props.goodsDetail.naturalCommentNumber)
                        ).toFixed(1)}
                    %
                  </p>
                  <Icon icon={"ri:arrow-right-s-line"} fontSize={"1.6rem"} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-5 text-[0.9rem] text-orange-600">
              <div className="bg-[#f8e3e0]/90 p-1 rounded-md">全部</div>
              <div className="bg-[#f8e3e0]/90 text-orange-600 p-1 rounded-md">
                好评({props.goodsDetail.goodCommentNumber})
              </div>
              <div className="bg-[#f8e3e0]/90 text-orange-600 p-1 rounded-md">
                中评({props.goodsDetail.naturalCommentNumber})
              </div>
              <div className="bg-[#f8e3e0]/90 text-orange-600 p-1 rounded-md">
                差评({props.goodsDetail.badCommentNumber})
              </div>
              <div className="bg-[#f8e3e0]/90 text-orange-600 p-1 rounded-md">
                有图({props.goodsDetail.hasPictureCommentNumber})
              </div>
            </div>
          </div>
          {/* 商品评论 */}
          <div className="px-3 mt-5">
            {props.goodsDetail.goodsCommentVOList.length > 0 ? (
              <div>
                {props.goodsDetail.goodsCommentVOList.map((item) => {
                  return (
                    <div key={item.id} className="mt-5 first:mt-0">
                      <div className="flex items-center justify-between">
                        {/* 用户头像以及用户昵称 */}
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={item.avatar}
                              alt=""
                              className="w-full h-full"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <p className="w-17 truncate text-lg text-gray-500">
                            {item.nickname}
                          </p>
                          <StarRating rating={item.star} />
                        </div>
                        <div className="text-gray-500">{item.createTime}</div>
                      </div>
                      <div className="mt-3">{item.content}</div>
                      <div>
                        {item.hasPicture && (
                          <div className="flex items-center gap-2 mt-3">
                            {item.picUrls.map((url: string) => {
                              return (
                                <Image
                                  key={url}
                                  src={url}
                                  alt=""
                                  width={50}
                                  height={50}
                                  className="w-20 h-20 rounded-md"
                                />
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {item.adminContent && <p>{item.adminContent}</p>}
                    </div>
                  );
                })}
                <p className="mt-8 text-lg text-center text-black">
                  查看全部评论
                </p>
              </div>
            ) : (
              <p className="mt-8 text-lg text-center text-black">
                该商品还没有评论哦,快来评论吧
              </p>
            )}
          </div>
          {/* 商品详情 */}
          <div>
            <p className="px-3 mt-5 text-lg font-bold text-gray-500">
              商品详情
            </p>
            <div className="mt-3">
              <RichText content={props.goodsDetail.detail} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
      {props.showButton && <ToTopButton />}
    </div>
  );
};
export default GoodsDetailContent;
