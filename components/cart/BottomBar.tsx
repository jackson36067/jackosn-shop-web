import { CartGoodItem } from "@/types/cart";
import { Checkbox } from "../ui/checkbox";
import useSelectedGoodsStore from "@/stores/CartSelectedGoods";
import { SetGoodsCheckedAPI } from "@/apis/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BottomBar = (props: {
  cartGoodsItems: CartGoodItem[];
  getCartGoodsItems: () => void;
}) => {
  const { selectedGoods, setSelectedGoods } = useSelectedGoodsStore();
  const router = useRouter();
  const totalPrice = selectedGoods.reduce((prev, current) => {
    return prev + current.price * current.number;
  }, 0);
  // 点击全选按钮后执行
  const onAllSelectedChange = async () => {
    const ids = props.cartGoodsItems.map((item) => {
      return item.id;
    });
    // 修改商品是否被选择 -> 通过判断
    await SetGoodsCheckedAPI(
      ids,
      !(selectedGoods.length === props.cartGoodsItems.length)
    );
    // 判断是否全选
    if (selectedGoods.length === props.cartGoodsItems.length) {
      // 已经全选 -> 取消全选
      setSelectedGoods([]);
    } else {
      props.cartGoodsItems.forEach((item) => {
        item.checked = true;
      });
      setSelectedGoods(props.cartGoodsItems);
    }
    props.getCartGoodsItems();
  };

  // 点击去结算按钮跳转到结算页
  const handleSettlement = () => {
    if (selectedGoods.length <= 0) {
      toast.info("请选择商品");
      return;
    }
    router.push("/settlement");
  };
  return (
    <div className="fixed bottom-20 w-full flex items-center justify-between p-4 bg-white border-t border-gray-200">
      <div className="flex items-center" onClick={() => onAllSelectedChange()}>
        <Checkbox
          checked={props.cartGoodsItems.length === selectedGoods.length}
          className="w-6 h-6 rounded-full"
        />
        <label
          htmlFor="terms"
          className="ml-2 text-gray-700 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          全选
        </label>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600">合计：</span>
        <span className="text-red-500 text-xl font-bold ml-1">
          ¥{totalPrice.toFixed(2)}
        </span>
      </div>
      <button
        className={`px-6 py-2 text-white text-lg rounded-full transition ${
          !selectedGoods.length
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
        onClick={() => handleSettlement()}
      >
        去结算
      </button>
    </div>
  );
};
export default BottomBar;
