"use client";
import { useState, useRef } from "react";
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
  subItems?: SubItem[];
  post?: Post[];
  limit?: string;
  postTabs?: TabPost[];
};

type MenuProps = {
  items: Item[];
};

const Menu: React.FC<MenuProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (menuRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      menuRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative z-50 block bg-main mb-10 lg:mb-0">
      <div className="container flex items-center">
        <button
          className="lg:hidden absolute left-0 z-10 p-2 text-white bg-gray-900 bg-opacity-60 hover:bg-opacity-80 rounded-full shadow-md top-[30px]"
          onClick={() => handleScroll("left")}
        >
          <FaArrowLeft className="text-2xl" />
        </button>

        <div
          ref={menuRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide w-full no-scrollbar relative"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative ${item.option === "sub" ? "relative" : ""}`}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Link
                href={item.link}
                className="p-2 text-white block hover:bg-white hover:text-main whitespace-nowrap transition-all duration-300 ease-in-out"
              >
                {item.title}
              </Link>

              {hoverIndex === index &&
                item.option === "sub" &&
                item.subItems && (
                  <div className="absolute left-0 bg-white shadow-lg w-52 transition-all duration-300">
                    <div className="flex flex-col">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.link}
                          className="p-2 hover:bg-main hover:text-white transition-colors duration-300"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {hoverIndex === index && item.option === "post" && item.post && (
                <div className="absolute w-full left-0 transition-all duration-300">
                  <div className="container">
                    <div className="w-full bg-white grid grid-cols-2 md:grid-cols-5 gap-2 p-2 shadow-md">
                      {item.post
                        .slice(0, Number(item.limit))
                        .map((postItem, postIndex) => (
                          <Link
                            href={postItem.link}
                            key={postIndex}
                            className="p-2 border hover:shadow-lg transition-shadow duration-300"
                          >
                            <Image
                              src={postItem.img}
                              width={300}
                              height={300}
                              alt={postItem.title}
                              className="w-full max-h-32 h-full object-cover rounded-md"
                            />
                            <p className="text-sm mt-1">{postItem.title}</p>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {hoverIndex === index &&
                item.option === "tab" &&
                item.postTabs && (
                  <div className="absolute w-full left-0 transition-all duration-300">
                    <div className="container">
                      <div className="flex w-full bg-white shadow-md">
                        <div className="w-1/5 flex flex-col">
                          {item.postTabs.map((tab, tabIndex) => (
                            <Link
                              key={tabIndex}
                              href={tab.link}
                              onMouseEnter={() => setActiveTab(tabIndex)}
                              className={`p-2 block ${
                                tabIndex === activeTab
                                  ? "bg-main text-white"
                                  : "hover:bg-main hover:text-white"
                              } transition-colors duration-300`}
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
                                <div className="w-full bg-white grid grid-cols-2 md:grid-cols-5 gap-2 p-2">
                                  {tab.post.map((tabPost, tabPostIndex) => (
                                    <Link
                                      href={tabPost.link}
                                      key={tabPostIndex}
                                      className="p-2 border hover:shadow-lg transition-shadow duration-300"
                                    >
                                      <Image
                                        src={tabPost.img}
                                        alt={tabPost.title}
                                        width={300}
                                        height={300}
                                        className="w-full max-h-32 h-full object-cover rounded-md"
                                      />
                                      <p className="text-sm mt-1">
                                        {tabPost.title}
                                      </p>
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
          className="lg:hidden absolute right-0 z-10 p-2 text-white bg-gray-900 bg-opacity-60 hover:bg-opacity-80 rounded-full shadow-md top-[30px]"
          onClick={() => handleScroll("right")}
        >
          <FaArrowRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Menu;
