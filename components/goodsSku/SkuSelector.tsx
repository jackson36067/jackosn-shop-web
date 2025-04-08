"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SkuData, SkuGroup } from "@/types/goods";
import { cn } from "@/lib/utils";

type Props = {
  groups: SkuGroup[];
  skus: SkuData[];
  defaultSelectedSku: Record<string, string> | null;
  onSelectedSkuInfo: (
    info: Record<string, string>,
    count: number,
    skuData: SkuData
  ) => void;
};

export default function SkuSelector({
  groups,
  skus,
  defaultSelectedSku,
  onSelectedSkuInfo,
}: Props) {
  // 用于保存选中的规格名称以及值
  const [selected, setSelected] = useState<Record<string, string>>({});
  // 用于保存选中数量
  const [quantity, setQuantity] = useState(1);

  // 设置默认选中的信息,或者上一次选中的信息
  useEffect(() => {
    if (defaultSelectedSku != null) {
      setSelected(defaultSelectedSku);
    }
  }, [defaultSelectedSku]);

  // 用于获取被选中的最后的sku单件,每个group的值都要选择,要不然就没法进行下一步操作
  const matchedSku = skus.find((sku) =>
    groups.every((group) => sku.specs[group.name] === selected[group.name])
  );

  // 新增：监听 selected 和 matchedSku 变化，通知父组件,将选中信息传递给父组件
  useEffect(() => {
    // 判断规格是否都选了
    const allSelected = groups.every((group) => selected[group.name]);
    // 列表都选择了以及sku单件也有了那么将sku单件,规格信息,规格数量等数据传递给给父组件
    if (allSelected && matchedSku) {
      // 传递数据给父组件
      onSelectedSkuInfo(selected, quantity, matchedSku);
    }
  }, [selected, matchedSku, groups, onSelectedSkuInfo, quantity]);

  // 选择规格列表时将规格保存到selected中;
  const handleSelect = (
    disabled: boolean,
    groupName: string,
    value: string
  ) => {
    // 如果点击的是没有库存的规格,则直接退出函数
    if (disabled) {
      return;
    }
    setSelected((prev) => ({ ...prev, [groupName]: value }));
  };

  return (
    <div className="space-y-4 border-b-[1px] border-gray-400 pb-5 overflow-auto h-100">
      {/* 图 + 价格 */}
      <div className="flex items-center gap-4">
        {/* 通过判断用户使用选择出sku单件,选中就可以展示该图片 */}
        {matchedSku?.url && (
          <Image
            src={matchedSku.url}
            alt="商品图"
            width={80}
            height={80}
            className="rounded-md"
          />
        )}
        <div>
          <div className="text-xl font-bold text-red-500">
            ￥{matchedSku?.price ?? "--"}
          </div>
          <div className="flex items-center gap-2 mt-4">
            {/* 数量选择 */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                disabled={!matchedSku || quantity === 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </Button>
              <span>{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                disabled={!matchedSku || quantity === matchedSku.number}
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>
            <p>
              {matchedSku
                ? matchedSku.number > 0
                  ? "有货"
                  : "售罄"
                : "请选择规格"}
            </p>
          </div>
        </div>
      </div>

      {/* SKU选择项 */}
      {groups.map((group) => (
        <div key={group.name}>
          <div className="mb-2 text-lg font-bold">{group.name}</div>
          <div className="flex flex-wrap gap-2">
            {group.options.map((opt) => {
              const active = selected[group.name] === opt.value;
              const disabled = (() => {
                // 当前选中的组名为 group.name，当前选项为 opt.value
                // 如果没有任何选中项，判断所有包含该选项的 sku 是否都没库存
                const candidateSkus = skus.filter(
                  (sku) => sku.specs[group.name] === opt.value
                );
                if (Object.keys(selected).length === 0) {
                  return candidateSkus.every((sku) => sku.number === 0);
                }
                // 当前组以外的所有选项都匹配 selected，当前选项是被尝试的 group.name 下的一个选项
                const matchingSkus = skus.filter((sku) =>
                  groups.every((g) => {
                    if (g.name === group.name) {
                      return sku.specs[g.name] === opt.value;
                    }
                    const selectedValue = selected[g.name];
                    return (
                      !selectedValue || sku.specs[g.name] === selectedValue
                    );
                  })
                );
                return matchingSkus.every((sku) => sku.number === 0);
              })();

              return (
                <Button
                  className={cn(
                    "flex items-center gap-2 bg-gray-100 text-black",
                    active &&
                      "bg-[#fff5f2]/80 text-orange-500 border-[1px] border-orange-500",
                    disabled && "bg-gray-300 text-gray-600 cursor-not-allowed"
                  )}
                  key={opt.value}
                  disabled={disabled}
                  onClick={() => handleSelect(disabled, group.name, opt.value)}
                >
                  {opt.picUrl && (
                    <Image src={opt.picUrl} alt="" width={20} height={20} />
                  )}
                  {opt.value}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
