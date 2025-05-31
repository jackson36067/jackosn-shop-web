import { GoodsDetail, SkuData, SkuGroup } from "@/types/goods";
import Banner from "../home/Banner";
import { Icon } from "@iconify/react/dist/iconify.js";
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
import { Button } from "../ui/button";
import { AddressSelectedType } from "@/types/address";
import CommentBar from "./commentBar";
import CommentContent from "./commentContent";
import { CommentCategoryItem } from "@/types/comment";
import GoodsAttributeContent from "./goodsAttributeContent";
import SkuSelector from "../goodsSku/SkuSelector";
import { toast } from "sonner";
import AddressView from "../address/addressView";
import { useRouter } from "next/navigation";

// 商品详情组件用于解析富文本内容
const RichText: FC<{ content: string; className: string }> = ({
  content,
  className,
}) => {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: content }} />
  );
};

const GoodsDetailContent = (props: {
  goodsDetail: GoodsDetail | null;
  showButton: boolean;
  selectedAddress: AddressSelectedType | null;
  skuGroups: SkuGroup[];
  skuData: SkuData[];
  slectedSkuInfo: Record<string, string>;
  handleSelectedAddress: (address: AddressSelectedType) => void;
  handleSelectSku: (
    info: Record<string, string>,
    count: number,
    skuData: SkuData | null
  ) => void;
  openAddressDarwer: boolean;
  changeAddressDrawerStatus: () => void;
}) => {
  // 商品评论分类列表
  const [commentCategoryItems, setCommentCategoryItems] = useState<
    CommentCategoryItem[]
  >([]);
  // 用于接收用户点击地址后传递的地址信息
  const [selectAddress, setSelectAddress] =
    useState<AddressSelectedType | null>(null);
  // 选中的sku-spe组,用于保存数据
  const [selectedSkuGroup, setSelectedSkuGroup] = useState<Record<
    string,
    string
  > | null>(null);
  // 选中的规格的个数
  const [count, setCount] = useState<number>(0);
  // 选中的规格的信息
  const [skuInfo, setSkuInfo] = useState<SkuData | null>(null);
  // 是否代开规格弹窗
  const [open, setOpen] = useState<boolean>(false);

  // 点击地址后将地址传递过来
  const handleSelectedAddress = (address: AddressSelectedType) => {
    setSelectAddress(address);
  };
  const router = useRouter();

  // 点击确认按钮后,更改选中地址
  const handleChangeAddress = () => {
    // 点击确认再将最后点击的地址信息封装到选中的地址信息中
    if (selectAddress) {
      props.handleSelectedAddress(selectAddress);
    }
  };

  // 加载评论分类数据
  useEffect(() => {
    // 组件加载就封装数据
    const updatedItems = [
      { title: "全部", value: 0 },
      { title: `(好评${props.goodsDetail?.goodCommentNumber || 0})`, value: 1 },
      {
        title: `(中评${props.goodsDetail?.naturalCommentNumber || 0})`,
        value: 2,
      },
      { title: `(差评${props.goodsDetail?.badCommentNumber || 0})`, value: 3 },
      {
        title: `(有图${props.goodsDetail?.hasPictureCommentNumber || 0})`,
        value: 4,
      },
    ];
    setCommentCategoryItems(updatedItems);
  }, [
    props.goodsDetail?.badCommentNumber,
    props.goodsDetail?.goodCommentNumber,
    props.goodsDetail?.hasPictureCommentNumber,
    props.goodsDetail?.naturalCommentNumber,
  ]);

  // 规格选择组件选择规格后,封装选择的数据
  const handleSelectedSkuInfo = (
    info: Record<string, string>,
    count: number,
    skuData: SkuData
  ) => {
    setSelectedSkuGroup(info);
    setCount(count);
    setSkuInfo(skuData);
  };

  // 点击确认后将选中的商品规格数据发送给父组件
  const handelCheckedSelectdSku = () => {
    if (!selectedSkuGroup) {
      toast.info("请选择规格");
      setOpen(true);
      return;
    }
    // 将选中的规格数据传递给父组件
    props.handleSelectSku(selectedSkuGroup || {}, count, skuInfo);
    setOpen(false);
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
              {/* 选择商品规格 */}
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                  <div className="flex items-center justify-between">
                    <p>规格</p>
                    <div className="flex gap-2 items-center">
                      <p className="flex items-center gap-2 max-w-80 truncate">
                        {props.slectedSkuInfo &&
                          Object.entries(props.slectedSkuInfo).map(
                            ([key, value]) => (
                              <span key={key}>
                                {key}: {value}
                              </span>
                            )
                          )}
                      </p>
                      <Icon
                        icon={"ri:arrow-right-s-line"}
                        fontSize={"1.6rem"}
                      />
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent className="px-3">
                  <DrawerTitle></DrawerTitle>
                  <DrawerDescription></DrawerDescription>
                  <SkuSelector
                    groups={props.skuGroups}
                    skus={props.skuData}
                    defaultSelectedSku={props.slectedSkuInfo}
                    showCouponSelect={false}
                    onSelectedSkuInfo={(
                      info: Record<string, string>,
                      count: number,
                      skuData: SkuData
                    ) => handleSelectedSkuInfo(info, count, skuData)}
                  />
                  <DrawerFooter>
                    <Button
                      className="w-full bg-orange-500 text-white"
                      onClick={() => handelCheckedSelectdSku()}
                    >
                      确认
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              {/* 商品参数 */}
              <Drawer>
                <DrawerTrigger>
                  <div className="flex items-center justify-between">
                    <p>参数</p>
                    <div>
                      <p></p>
                      <Icon
                        icon={"ri:arrow-right-s-line"}
                        fontSize={"1.6rem"}
                      />
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-center">
                    <DrawerTitle>商品参数</DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                  </DrawerHeader>
                  <GoodsAttributeContent
                    goodsAttributeList={props.goodsDetail.goodsAttributeList}
                  />
                </DrawerContent>
              </Drawer>
              {/* 商品地址 */}
              <Drawer
                open={props.openAddressDarwer}
                onOpenChange={() => props.changeAddressDrawerStatus()}
              >
                <DrawerTrigger>
                  <div className="flex items-center justify-between">
                    <p>送至</p>
                    <div className="flex items-center gap-2">
                      <p className="max-w-80 truncate">
                        {props.selectedAddress?.address}
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
                  <AddressView
                    selectedAddres={props.selectedAddress}
                    addressSelectedPage={true}
                    selectedAddress={(address: AddressSelectedType) =>
                      handleSelectedAddress(address)
                    }
                  />
                  <DrawerFooter className="pt-30">
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
                  <p>免运费</p>
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
                          (props.goodsDetail.goodCommentNumber /
                            props.goodsDetail.totalCommentNumber) *
                          100
                        ).toFixed(2)}
                    %
                  </p>
                  <Icon icon={"ri:arrow-right-s-line"} fontSize={"1.6rem"} />
                </div>
              </div>
            </div>
            <CommentBar commentCategoryList={commentCategoryItems} type={0} />
          </div>
          {/* 商品评论 */}
          <CommentContent
            goodsCommentItems={props.goodsDetail.goodsCommentVOList}
          />
          {/* 查看更多评论 */}
          {/* 商品详情 */}
          {props.goodsDetail.goodsCommentVOList.length > 0 && (
            <div
              onClick={() =>
                router.push(
                  `/comment?id=${props.goodsDetail?.id}&totalCommentCount=${
                    props.goodsDetail?.totalCommentNumber
                  }&goodCommentCount=${
                    props.goodsDetail?.goodCommentNumber
                  }&naturalCommentCount=${
                    props.goodsDetail?.naturalCommentNumber
                  }&badCommentCount=${
                    props.goodsDetail?.badCommentNumber
                  }&hasPictureCommentCount=${
                    props.goodsDetail?.hasPictureCommentNumber
                  }&type=${0}`
                )
              }
            >
              <p className="mt-8 text-lg text-center text-black">
                查看全部评论
              </p>
            </div>
          )}
          <div>
            <p className="px-3 mt-5 text-lg font-bold text-gray-500">
              商品详情
            </p>
            <div className="w-full mt-3">
              <RichText content={props.goodsDetail.detail} className="w-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-100">Loading...</div>
      )}
      {props.showButton && <ToTopButton />}
    </div>
  );
};
export default GoodsDetailContent;
