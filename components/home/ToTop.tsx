import { Icon } from "@iconify/react/dist/iconify.js";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const ToTopButton = () => {
  return (
    <div
      className="fixed bottom-25 right-5 w-12 h-12 z-9999 rounded-full bg-[#fafafa]"
      onClick={() => scrollToTop()}
    >
      <div className="flex flex-col justify-center items-center">
        <div>
          <Icon icon="hugeicons:arrow-up-01" fontSize={20}></Icon>
        </div>
        <div className="text-sm">顶部</div>
      </div>
    </div>
  );
};
export default ToTopButton;
