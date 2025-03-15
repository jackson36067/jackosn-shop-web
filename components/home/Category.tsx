"use client";

import { GoodsMessage } from "@/types/goods";
import HomeCategoryGoods from "@/components/home/category/goods";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

interface CategoryItems {
  title: string;
  prompt: string; // 提示
  goods: GoodsMessage[];
  type: number;
}

const Category = (props: { categoryItems: CategoryItems[] }) => {
  const router = useRouter();
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
              <HomeCategoryGoods type={item.type} isAll={false} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Category;
