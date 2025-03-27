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

// 将传递的日期格式化,用户高亮显示有浏览记录的日期
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
  type: number; // 浏览记录信息类型
  changeBrowseHistoryType: (type: number) => void; // 更改浏览记录信息类型
  allBrowseHistroyDate: string[]; // 所有有游览信息记录的日期
  getPreDateBrowseList: (date: Date | undefined) => void; // 更改浏览记录日期范围
}) => {
  // 浏览记录信息日期
  const [date, setDate] = useState<Date | undefined>(undefined);
  // 是否展示日历
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
              {date === undefined
                ? "筛选浏览时间"
                : date?.toISOString().split("T")[0]}
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
                // 让时间保持在白天，防止时区问题
                const correctedDate = new Date(newDate.setHours(12, 0, 0, 0));
                console.log(correctedDate.toISOString().split("T")[0]);
                setDate(correctedDate);
                setOpen(false);
                props.getPreDateBrowseList(correctedDate);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default BrowseHistoryTypeSelectBar;
