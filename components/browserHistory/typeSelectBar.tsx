"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { parseISO, parse, format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const browseHistoryTypeItems = [
  { title: "宝贝", value: 0 },
  { title: "店铺", value: 1 },
  { title: "图文", value: 2 },
];

function formatDate(input: string): string {
  const currentYear = new Date().getFullYear();
  let date;
  // 检查是否包含年份
  if (/^\d{4}年\d{1,2}月\d{1,2}日$/.test(input)) {
    date = parse(input, "yyyy年M月d日", new Date());
  } else if (/^\d{1,2}月\d{1,2}日$/.test(input)) {
    date = parse(`${currentYear}年${input}`, "yyyy年M月d日", new Date());
  } else {
    return "格式错误";
  }

  return format(date, "yyyy-MM-dd");
}

const BrowseHistoryTypeSelectBar = (props: {
  type: number;
  changeBrowseHistoryType: (type: number) => void;
  allBrowseHistroyDate: string[];
  getPreDateBrowseList: (date: Date | undefined) => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed w-full top-17 left-0 p-3 bg-[#f4f4f4] z-1">
      <div className="flex gap-10 items-center py-2 text-xl text-gray-500 font-[600]">
        {browseHistoryTypeItems.map((item, index) => {
          return (
            <p
              key={index}
              className={cn(
                props.type === item.value &&
                  "text-[#171b27] font-bold text-[1.2rem]"
              )}
              onClick={() => props.changeBrowseHistoryType(item.value)}
            >
              {item.title}
            </p>
          );
        })}
      </div>
      {/* 时间筛选器 */}
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className="bg-[#fff] text-[#161f28] font-[600] mt-2">
              筛选浏览时间
              <Icon icon={"mdi:arrow-down-drop"} fontSize={"1rem"} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              className="bg-white w-full"
              // 自定义渲染每个日期单元格 让有浏览记录的日期高亮显示
              modifiers={{
                highlighted: props.allBrowseHistroyDate
                  .map((item) => formatDate(item))
                  .map((date) => parseISO(date)),
              }}
              modifiersClassNames={{
                highlighted: "bg-blue-200 text-blue-900 rounded-full",
              }}
              selected={date}
              onDayClick={(newDate) => {
                setDate(newDate);
                setOpen(false);
                props.getPreDateBrowseList(newDate);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default BrowseHistoryTypeSelectBar;
