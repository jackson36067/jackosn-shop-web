"use client";

const TopSearch = () => {
  return (
    <div className="w-full bg-[#ff2d46] px-4 pt-6 pb-4 text-center">
      <p className="text-3xl text-white">优购</p>

      <div className="relative w-full h-12 mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
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
          placeholder="搜索"
          className="w-full py-2 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-white focus:bg-white focus:border-indigo-600"
        />
      </div>
    </div>
  );
};
export default TopSearch;
