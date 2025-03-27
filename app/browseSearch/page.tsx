"use client";

import {
  addBrowseSearchAPI,
  getBrowseHistoryListAPI,
  getBrowseSearchHistoryListAPI,
  removeAllBrowseSearchHistoryAPI,
  removeBrowseHistoryAPI,
} from "@/apis/browseHistory";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { browseHistoryItem, goodsHistory } from "@/types/browseHistory";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// 通过map判断一个对象数组中对象中的某个值在数组中是否已经存在
const removeDuplicates = <K extends keyof goodsHistory>(
  arr: goodsHistory[],
  key: K
) => {
  const map = new Map();
  // 判断map中是否存在该商品的id, 不存在过滤出来,然后保存到map中
  return arr.filter(
    (item) => !map.has(item[key]) && map.set(item[key], "true")
  );
};

export default function BrowseSearchPage() {
  // 页面状态设置 false- 展示历史浏览查询列表 true-展示出查询列表
  const [state, setState] = useState<boolean>(false);
  // 输入框值
  const [browseHistoryValue, setBrowseHistoryValue] = useState<string>("");
  // 用户历史浏览记录搜索列表
  const [browseSearchHistoryList, setBrowseSearchHistoryList] = useState<
    string[]
  >([]);
  // 是否已经发送请求
  const isFetch = useRef<boolean>(false);
  // 查询后的浏览记录商品列表
  const [allBrowseResultList, setAllBrowseResultList] = useState<
    goodsHistory[]
  >([]);
  // 查询后的浏览记录商品列表
  const [searchBrowseResultList, setSearchBrowseResultList] = useState<
    goodsHistory[]
  >([]);
  // 操作按钮的状态
  const [operateStatus, setOperateStatus] = useState<boolean>(false);
  // 选中的浏览记录商品列表
  const [selectedBrowseGoodsList, setSelectedBrowseGoodsList] = useState<
    number[]
  >([]);

  // 获取用户历史浏览搜索记录
  const getBrowseSearchList = async () => {
    const res = await getBrowseSearchHistoryListAPI();
    setBrowseSearchHistoryList(res.data);
  };

  // 挂载发送请求获取搜索记录数据
  useEffect(() => {
    if (isFetch.current) return;
    isFetch.current = true;
    getBrowseSearchList();
  }, []);

  // 获取搜索后的浏览信息
  const getSearchBrowseResult = async (value: string) => {
    const res = await getBrowseHistoryListAPI({
      type: 0,
      goodsName: value,
    });
    const data: browseHistoryItem[] = res.data;
    // 通过回调方式更新，防止异步问题
    setSearchBrowseResultList(() => {
      let newList: goodsHistory[] = [];
      data.forEach((item) => {
        newList = [...newList, ...(item.data as goodsHistory[])];
      });
      // 过滤出同样的商品, 便于展示
      newList = removeDuplicates(newList, "id");
      return newList;
    });
    // 不要过滤出同样的商品,便于后续删除商品
    setAllBrowseResultList(() => {
      let newList: goodsHistory[] = [];
      data.forEach((item) => {
        newList = [...newList, ...(item.data as goodsHistory[])];
      });
      return newList;
    });
  };

  // 点击搜索按钮后执行
  const handleSearchBrowse = async (value: string) => {
    if (value === "") {
      toast.info("您还没有输入内容呢");
      return;
    }
    setBrowseHistoryValue(value);
    // 设置页面状态
    if (!state) {
      setState(true);
    }
    // 查前先清空上一次的查询列表
    setSearchBrowseResultList([]);
    // 获取查询结果
    getSearchBrowseResult(value);
    // 保存搜索记录
    await addBrowseSearchAPI(value);
  };

  // 点击单选框选中或取消选中商品
  const handelSelectChange = (checked: boolean, browseId: number) => {
    if (checked) {
      setSelectedBrowseGoodsList([...selectedBrowseGoodsList, browseId]);
    } else {
      setSelectedBrowseGoodsList(
        selectedBrowseGoodsList.filter((item) => item !== browseId)
      );
    }
  };

  // 点击全选单选框全选或取消全选商品
  const handleAllCheckdChange = (checked: boolean) => {
    if (checked) {
      setSelectedBrowseGoodsList(searchBrowseResultList.map((item) => item.id));
    } else {
      setSelectedBrowseGoodsList([]);
    }
  };

  // 点击删除按钮删除被选中的浏览信息 -> 注意删除时需要将浏览记录跟该id一致的信息都删除
  const handleRemoveBrowseHistory = async () => {
    const newList: number[] = [];
    selectedBrowseGoodsList.forEach((item) => {
      // 根据选中的商品的id获取所有搜索出来的商品的browseId, 并将browseId保存到newList中
      allBrowseResultList
        .filter((item1) => item1.id === item)
        .map((item) => item.browseId)
        .forEach((item) => {
          if (!newList.includes(item)) {
            newList.push(item);
          }
        });
    });
    await removeBrowseHistoryAPI(newList);
    getSearchBrowseResult(browseHistoryValue);
    toast.success("移除成功");
    setSelectedBrowseGoodsList([]);
  };

  // 点击删除图标删除用户历史浏览搜索记录
  const handelRemoveAllBrowseSearch = async () => {
    await removeAllBrowseSearchHistoryAPI();
    getBrowseSearchList();
    toast.success("删除成功");
  };

  return (
    <div className="px-3 py-5">
      <div className="fixed top-5 left-0 w-[96%] pl-[2%] flex items-center gap-2 bg-[#f4f4f4]">
        {!state && (
          <Icon
            icon={"ep:back"}
            fontSize={"1.2rem"}
            onClick={() => window.history.back()}
          />
        )}
        <div className="flex-1 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1 bottom-0 w-5 h-5 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={browseHistoryValue}
            onInput={(val) => {
              setBrowseHistoryValue((val.target as HTMLInputElement).value);
            }}
            placeholder="搜索"
            className="w-full py-1 pl-12 pr-4 text-gray-700 border rounded-md outline-none bg-gray-200"
          />
          {browseHistoryValue != "" && (
            <Icon
              icon={"clarity:remove-line"}
              className="absolute right-3 top-2 text-gray-400 w-4 h-4"
              onClick={() => {
                if (state) {
                  setState(false);
                }
                setBrowseHistoryValue("");
                // 查前先清空上一次的查询列表
                setSearchBrowseResultList([]);
                getBrowseSearchList();
                setOperateStatus(false);
              }}
            />
          )}
        </div>
        <p onClick={() => handleSearchBrowse(browseHistoryValue)}>搜索</p>
        {state && (
          <p onClick={() => setOperateStatus(!operateStatus)}>
            {operateStatus ? "完成" : "管理"}
          </p>
        )}
        <p onClick={() => window.history.back()}>取消</p>
      </div>
      {/* 历史搜索记录 */}
      {!state && (
        <div className="mt-15">
          <div className="flex justify-between items-center w-full mt-3">
            <p className="font-[600] text-black">历史搜索</p>
            <Icon
              icon={"material-symbols-light:delete-outline-rounded"}
              fontSize={"1.2rem"}
              onClick={() => handelRemoveAllBrowseSearch()}
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-5">
            {browseSearchHistoryList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-2"
                  onClick={() => {
                    setBrowseHistoryValue(item);
                    handleSearchBrowse(item);
                  }}
                >
                  <Icon icon={"bitcoin-icons:search-outline"} />
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* 搜索详情 */}
      {state ? (
        searchBrowseResultList.length > 0 ? (
          <div className="flex flex-col gap-3 w-full mt-15">
            {searchBrowseResultList.map((item) => {
              return (
                <div
                  key={item.browseId}
                  className="flex items-center gap-4 w-full"
                >
                  {operateStatus && (
                    <div>
                      <Checkbox
                        checked={selectedBrowseGoodsList.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handelSelectChange(checked === true, item.id)
                        }
                        className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 flex gap-3">
                    <Image
                      src={item.picUrl}
                      alt=""
                      width={50}
                      height={50}
                      className="w-30 h-35"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <p className="text-[1.3rem] font-[600]">
                        {item.goodsName}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-[#fc5901] text-[1.1rem] font-bold">
                          ￥<span className="text-[1.6rem]">{item.price}</span>
                        </p>
                        <Button className="bg-[#f2f6f9] text-[#161f28] font-bold">
                          找相似
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-80">
            <Icon
              icon={"mdi:file-document-box-search-outline"}
              fontSize={"6rem"}
            />
            <p>搜索为空</p>
          </div>
        )
      ) : (
        <div></div>
      )}

      {operateStatus && (
        <div className="fixed bottom-0 left-0 w-[100%] p-3 bg-white">
          {selectedBrowseGoodsList.length > 0 && (
            <div className="text-gray-500 text-[1rem]">
              已选中
              <span className="text-orange-500">
                {selectedBrowseGoodsList.length}
              </span>
              件宝贝
            </div>
          )}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Checkbox
                  checked={
                    selectedBrowseGoodsList.length > 0 &&
                    selectedBrowseGoodsList.length ===
                      searchBrowseResultList.length
                  }
                  onCheckedChange={(checked) =>
                    handleAllCheckdChange(checked === true)
                  }
                  className="rounded-full w-5 h-5 border-[1px] border-gray-500"
                />
                <span className="text-[0.8rem]">全选</span>
              </div>
              <div className="flex gap-2 items-center">
                <Button className="bg-[#f2f6f9] text-[#161f28]">分享</Button>
                <Button
                  className="bg-orange-600 text-white"
                  onClick={() => handleRemoveBrowseHistory()}
                >
                  删除
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
