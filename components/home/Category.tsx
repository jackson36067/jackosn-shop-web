"use client";

import { GoodsMessage, GoodsPageResult } from "@/types/goods";
import HomeCategoryGoods from "@/components/home/category/goods";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetHotOrNewGoodsAPI } from "@/apis/goods";

interface CategoryItems {
  title: string;
  prompt: string; // 提示
  goods: GoodsMessage[];
  type: number;
}

const Category = (props: { categoryItems: CategoryItems[] }) => {
  const router = useRouter();

  const [newGoodsItems, setNewGoodsItems] = useState<GoodsMessage[]>([]);
  const [hotGoodsItems, setHotGoodsItems] = useState<GoodsMessage[]>([]);

  const getGoodsItems = async (type: number) => {
    const res = await GetHotOrNewGoodsAPI(type, false, 1, 4);
    const data: GoodsPageResult = res.data;
    if (type === 0) {
      setNewGoodsItems(data.data);
    } else if (type === 1) {
      setHotGoodsItems(data.data);
    }
  };

  useEffect(() => {
    props.categoryItems.forEach((item) => {
      getGoodsItems(item.type);
    });
  }, []);

  return (
    <div className="w-full p-3 bg-[#fff]">
      {props.categoryItems.map((item) => {
        return (
          <div key={item.type} className="mt-5 first:mt-0">
            <div className="flex justify-between">
              <div>{item.title}</div>
              <div
                onClick={() => {
                  router.push(`/moreCategoryGoods?type=${item.type}`);
                }}
                className="flex items-center gap-1"
              >
                <div className="text-[#77787d]">{item.prompt}</div>
                <Icon
                  icon={"iconamoon:arrow-right-2-thin"}
                  width={24}
                  height={24}
                  className="text-[#77787d]"
                />
              </div>
            </div>
            <div>
              <HomeCategoryGoods
                goodItems={item.type === 0 ? newGoodsItems : hotGoodsItems}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Category;
