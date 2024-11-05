"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type SubItem = {
  title: string;
  link: string;
};

type Post = {
  title: string;
  img: string;
  link: string;
};

type TabPost = {
  title: string;
  link: string;
  post: Post[];
};

type Item = {
  title: string;
  link: string;
  option?: string;
  //   option?: 'sub' | 'post' | 'tab';
  subItems?: SubItem[];
  post?: Post[];
  limit?: string;
  postTabs?: TabPost[];
};

type MenuProps = {
  items: Item[];
};

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<number>(0); // Track active tab index, default to 0
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleScroll = (direction: "left" | "right") => {
    if (menuRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      menuRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <div className={`z-50 block sticky top-0 bg-main mb-12 lg:mb-0 `}>
      <div className="container">
        <button
          className={`lg:hidden absolute left-0 z-10 p-2 text-white bg-gray-900 bg-opacity-60 hover:bg-opacity-80 rounded-full shadow-md top-[30px] ${
            items.length === 0 ? "hidden" : ""
          }`}
          onClick={() => handleScroll("left")}
        >
          <FaArrowLeft className="text-2xl" />
        </button>
        <div
          className="flex space-x-4 overflow-x-auto lg:overflow-visible scrollbar-hide"
          ref={menuRef}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={` ${item.option === "sub" ? "relative" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Link
                href={item.link}
                className="p-2 text-white block hover:bg-white hover:text-main"
              >
                {item.title}
              </Link>
              {hoverIndex === index &&
                item.option === "sub" &&
                item.subItems && (
                  <div className="absolute left-0 bg-white shadow-lg w-52">
                    <div className="flex flex-col">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="p-2 hover:bg-main hover:text-white"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              {hoverIndex === index && item.option === "post" && item.post && (
                <div className="absolute w-full left-0">
                  <div className="container">
                    <div className="w-full bg-white grid grid-cols-5 gap-2 p-2">
                      {item.post
                        .slice(0, Number(item.limit))
                        .map((postItem, postIndex) => (
                          <Link
                            href={postItem.link}
                            key={postIndex}
                            className="p-2 border"
                          >
                            <Image
                              src={postItem.img}
                              width={300}
                              height={300}
                              alt={postItem.title}
                              className="w-full max-h-32 h-full object-cover"
                            />
                            {postItem.title}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {hoverIndex === index &&
                item.option === "tab" &&
                item.postTabs && (
                  <div className="absolute w-full left-0">
                    <div className="container">
                      <div className="flex w-full bg-white">
                        <div className="w-1/5 flex flex-col">
                          {item.postTabs.map((tab, tabIndex) => (
                            <Link
                              key={tabIndex}
                              href={tab.link}
                              onMouseEnter={() => setActiveTab(tabIndex)}
                              className={`p-2 block ${
                                tabIndex === activeTab
                                  ? "bg-main text-white"
                                  : ""
                              }`}
                            >
                              {tab.title}
                            </Link>
                          ))}
                        </div>
                        <div className="w-4/5">
                          {item.postTabs.map((tab, tabIndex) => (
                            <div
                              key={tabIndex}
                              onMouseEnter={() => setActiveTab(tabIndex)}
                            >
                              {activeTab === tabIndex && (
                                <div className="w-full bg-white grid grid-cols-5 gap-2 p-2">
                                  {tab.post.map((tabPost, tabPostIndex) => (
                                    <Link
                                      href={tabPost.link}
                                      key={tabPostIndex}
                                      className="p-2 border"
                                    >
                                      <Image
                                        src={tabPost.img}
                                        alt={tabPost.title}
                                        width={300}
                                        height={300}
                                        className="w-full max-h-32 h-full object-cover"
                                      />
                                      {tabPost.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
        <button
          className={`lg:hidden absolute right-0 z-10 p-2 text-white bg-gray-900 bg-opacity-60 hover:bg-opacity-80 rounded-full shadow-md top-[30px] ${
            items.length !== 0 ? "" : "hidden"
          }`}
          onClick={() => handleScroll("right")}
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Menu;
