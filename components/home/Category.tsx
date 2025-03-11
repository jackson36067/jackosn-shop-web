"use client";
interface CategoryItems {
  titleImg: string;
  mainImg: string;
  mediumImg: string[];
  rightImg: string[];
  direction: string; //"x" | "y"
}

// 中间以及右边图片水平排列
const OtherImgDirectionY = (item: CategoryItems) => {
  return (
    <div className="flex flex-2/3 gap-2">
      <div className="flex flex-1/2 flex-col justify-between">
        {item.mediumImg.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} className="w-full h-full" />
            </div>
          );
        })}
      </div>
      <div className="flex flex-1/2 flex-col justify-between">
        {item.rightImg.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} className="w-full h-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 中间以及右边图片垂直排列
const OtherImgDirectionX = (item: CategoryItems) => {
  return (
    <div className="flex flex-2/3 flex-col gap-2">
      <div className="flex flex-1/2 gap-2">
        {item.mediumImg.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} className="w-full h-full" />
            </div>
          );
        })}
      </div>
      <div className="flex flex-1/2 gap-2">
        {item.rightImg.map((item, index) => {
          return (
            <div key={index}>
              <img src={item} className="w-full h-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Category = (props: { categoryItems: CategoryItems[] }) => {
  return (
    <div className="w-full">
      {props.categoryItems.map((item, index) => {
        return (
          <div key={index} className="mt-5">
            <div className="w-full">
              <img className="w-full h-auto" src={item.titleImg} />
            </div>
            <div className="flex gap-2 mt-3 px-3 w-full">
              <div className="flex-1/3 h-full">
                <img src={item.mainImg} className="w-full h-full" />
              </div>
              {item.direction === "x"
                ? OtherImgDirectionX(item)
                : OtherImgDirectionY(item)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Category;
