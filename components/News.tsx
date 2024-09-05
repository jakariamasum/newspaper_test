"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  img: string;
  link: string;
  title: string;
}

interface Item {
  category: string;
  post: Post[];
}

interface NewssProps {
  title: string;
  link: string;
  limit: number;
  box: number;
  style: number;
  item: Item[];
}

const News: React.FC<NewssProps> = ({
  title,
  link,
  limit,
  box,
  style,
  item,
}) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5); // Always display 5 items

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) setItemsToShow(1); // Mobile
      else if (window.innerWidth < 768) setItemsToShow(2); // Small tablets
      else if (window.innerWidth < 1024) setItemsToShow(3); // Tablets
      else if (window.innerWidth < 1280) setItemsToShow(4); // Small desktops
      else setItemsToShow(5); // Large desktops
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const categoriesCount = item?.length || 0;

  const items = item[activeCategory]?.post.slice(0, limit);
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 30000); // Autoplay every 30 seconds

    return () => clearInterval(interval);
  }, [currentImage]);

  const nextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % items?.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevIndex) => (prevIndex - 1 + items.length) % items?.length
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImage(index);
  };

  const displayedItems = items
    ?.slice(startIndex, startIndex + itemsToShow)
    .concat(
      items.slice(0, Math.max(0, startIndex + itemsToShow - items.length))
    )
    .slice(0, limit);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full mb-2">
      {style === 1 && (
        <div className="flex items-center justify-between mb-2 px-2 py-1 border-b-2 border-main bg-white">
          <h2 className="text-xl font-bold">
            {title} {box}
          </h2>
          <div className="flex items-center text-base space-x-2">
            {categoriesCount > 1 && (
              <>
                {item?.map((categoryItem, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={
                      index === activeCategory
                        ? "bg-main text-white px-2 py-0 rounded-sm"
                        : ""
                    }
                  >
                    {categoryItem.category}
                  </button>
                ))}
              </>
            )}
            {categoriesCount === 1 && (
              <Link href={link} className="text-main hover:underline block">
                See all
              </Link>
            )}
          </div>
        </div>
      )}
      {style === 2 && (
        <div className="flex items-center justify-between mb-2 border-b-2 border-main">
          <h2 className="text-xs font-bold bg-main px-2 py-1 text-white">
            {title} {box}
          </h2>
          <div className="flex items-center text-base space-x-2">
            {categoriesCount > 1 && (
              <>
                {item?.map((categoryItem, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={
                      index === activeCategory
                        ? "bg-main text-white px-2 py-0 rounded-sm"
                        : ""
                    }
                  >
                    {categoryItem.category}
                  </button>
                ))}
              </>
            )}
            {categoriesCount === 1 && (
              <Link href={link} className="text-main hover:underline block">
                See all
              </Link>
            )}
          </div>
        </div>
      )}
      {box === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {item[activeCategory]?.post?.slice(0, limit)?.map((p, index) => {
            if (index === 0) {
              return (
                <Link href={p.link} key={index} className="w-full bg-white p-2">
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-44 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else if (index === 1 || index === 2) {
              return (
                <Link href={p.link} key={index} className="w-full bg-white p-2">
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-44 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="col-span-3 bg-white p-2 flex items-center space-x-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-20 h-16"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            }
          })}
        </div>
      )}
      {box === 2 && (
        <div className="grid grid-cols-1 gap-1">
          {item[activeCategory]?.post?.slice(0, limit)?.map((post, index) => (
            <Link
              href={post.link}
              className="bg-white p-2 flex items-center space-x-1"
              key={index}
            >
              <Image
                src={post.img || "/default.jpg"}
                width={300}
                height={300}
                alt={post.title}
                className="w-20 h-16 object-cover"
              />
              <p className="line-clamp-2">{post.title}</p>
            </Link>
          ))}
        </div>
      )}
      {box === 3 && (
        <div className="flex flex-col space-y">
          {item[activeCategory]?.post?.slice(0, limit)?.map((p, index) => {
            if (index === 0) {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="w-full bg-white border p-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-36 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="w-full bg-white border p-1 flex items-center space-x-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-16 h-12 object-cover"
                  />
                  <p className="line-clamp-2 text-base leading-normal">
                    {p.title}
                  </p>
                </Link>
              );
            }
          })}
        </div>
      )}
      {box === 4 && (
        <div className="grid grid-cols-2 gap-1">
          {item[activeCategory]?.post?.slice(0, limit)?.map((p, index) => {
            if (index === 0) {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="col-span-2 bg-white border p-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-36 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="w-full bg-white border p-1 block"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-20 object-cover"
                  />
                  <p className="line-clamp-2 text-base leading-normal">
                    {p.title}
                  </p>
                </Link>
              );
            }
          })}
        </div>
      )}
      {box === 5 && (
        <div className="grid grid-cols-2 space-y">
          {item[activeCategory]?.post?.slice(0, limit)?.map((p, index) => {
            if (index === 0) {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="w-full bg-white border p-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-36 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else if (index === 1) {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="w-full bg-white border p-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-36 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="col-span-2 bg-white border p-1 flex items-center space-x-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-16 h-12 object-cover"
                  />
                  <p className="line-clamp-2 text-base leading-normal">
                    {p.title}
                  </p>
                </Link>
              );
            }
          })}
        </div>
      )}
      {box === 6 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
          {item[activeCategory]?.post?.slice(0, limit)?.map((p, index) => (
            <Link href={p.link} className="bg-white p-2" key={index}>
              <Image
                src={p.img || "/default.jpg"}
                width={300}
                height={300}
                alt={p.title}
                className="w-full h-32 object-cover"
              />
              <p className="line-clamp-2 text-base leading-normal">{p.title}</p>
            </Link>
          ))}
        </div>
      )}
      {box === 7 && (
        <div className="grid grid-cols-2 gap-1">
          {item[activeCategory]?.post?.slice(0, limit)?.map((p, index) => {
            if (index === 0) {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="w-full bg-white border p-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-36 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else if (index === 1) {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="w-full bg-white border p-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-36 object-cover"
                  />
                  <p className="line-clamp-2">{p.title}</p>
                </Link>
              );
            } else {
              return (
                <Link
                  href={p.link}
                  key={index}
                  className="bg-white border p-1 flex items-center space-x-2"
                >
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-16 h-12 object-cover"
                  />
                  <p className="line-clamp-2 text-base leading-normal">
                    {p.title}
                  </p>
                </Link>
              );
            }
          })}
        </div>
      )}
      {box === 8 && (
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2 block">
            {item[activeCategory]?.post?.slice(0, 4)?.map((p, index) => (
              <Link
                href={p.link}
                className="bg-white p-1.5 flex items-center space-x-1"
                key={index}
              >
                <Image
                  src={p.img || "/default.jpg"}
                  width={300}
                  height={300}
                  alt={p.title}
                  className="w-20 h-16 object-cover"
                />
                <p className="line-clamp-2">{p.title}</p>
              </Link>
            ))}
          </div>
          <div>
            {item[activeCategory]?.post?.slice(4, 5)?.map((p, index) => (
              <Link href={p.link} className="bg-white p-2 block" key={index}>
                <Image
                  src={p.img || "/default.jpg"}
                  width={300}
                  height={300}
                  alt={p.title}
                  className="w-full h-64 object-cover"
                />
                <p className="line-clamp-2 pt-2">{p.title}</p>
              </Link>
            ))}
          </div>

          <div className="space-y-2 block">
            {item[activeCategory]?.post?.slice(5, 9)?.map((p, index) => (
              <Link
                href={p.link}
                className="bg-white p-1.5 flex items-center space-x-2"
                key={index}
              >
                <p className="line-clamp-2">{p.title}</p>
                <Image
                  src={p.img || "/default.jpg"}
                  width={300}
                  height={300}
                  alt={p.title}
                  className="w-20 h-16 object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
      {box === 9 && (
        <div className="flex md:flex-row flex-col gap-2">
          <div className="w-full md:w-1/4 space-y-3 block">
            {item[activeCategory]?.post?.slice(1, 3)?.map((p, index) => (
              <Link href={p.link} className="bg-white p-2 block" key={index}>
                <Image
                  src={p.img || "/default.jpg"}
                  width={300}
                  height={300}
                  alt={p.title}
                  className="w-full h-36 object-cover"
                />
                <p className="line-clamp-2 pt-2">{p.title}</p>
              </Link>
            ))}
          </div>
          <div className="w-full md:w-1/2">
            {item[activeCategory]?.post?.slice(0, 1)?.map((p, index) => (
              <Link href={p.link} className="bg-white p-2 block" key={index}>
                <Image
                  src={p.img || "/default.jpg"}
                  width={600}
                  height={600}
                  alt={p.title}
                  className="w-full h-96 object-cover"
                />
                <p className="line-clamp-2">{p.title}</p>
              </Link>
            ))}
          </div>

          <div className="w-full md:w-1/4 space-y-3 block">
            {item[activeCategory]?.post?.slice(3, 5)?.map((p, index) => (
              <Link href={p.link} className="bg-white p-2 block" key={index}>
                <Image
                  src={p.img || "/default.jpg"}
                  width={300}
                  height={300}
                  alt={p.title}
                  className="w-full h-36 object-cover"
                />
                <p className="line-clamp-2 pt-2">{p.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {box === 10 && (
        <div className="grid grid-cols-3 grid-flow-col gap-2">
          {item[activeCategory]?.post?.slice(0, 1)?.map((p, index) => (
            <Link
              href={p.link}
              className="bg-white h-full p-2 block"
              key={index}
            >
              <Image
                src={p.img || "/default.jpg"}
                width={600}
                height={600}
                alt={p.title}
                className="w-full h-[90%] object-cover"
              />
              <p className="line-clamp-2 pt-2">{p.title}</p>
            </Link>
          ))}
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-2">
              {item[activeCategory]?.post?.slice(1, 4)?.map((p, index) => {
                if (index === 0) {
                  return (
                    <Link
                      href={p.link}
                      key={index}
                      className="col-span-2 bg-white border p-2"
                    >
                      <Image
                        src={p.img || "/default.jpg"}
                        width={600}
                        height={600}
                        alt={p.title}
                        className="w-full h-60 object-cover"
                      />
                      <p className="line-clamp-2">{p.title}</p>
                    </Link>
                  );
                } else {
                  return (
                    <Link
                      href={p.link}
                      key={index}
                      className="row-span-2 bg-white border p-2 space-y"
                    >
                      <Image
                        src={p.img || "/default.jpg"}
                        width={300}
                        height={300}
                        alt={p.title}
                        className="w-full h-36 object-cover"
                      />
                      <p className="line-clamp-2 text-base leading-normal">
                        {p.title}
                      </p>
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
      {box === 11 && (
        <div className="flex flex-col md:flex-row gap-2">
          {item[activeCategory]?.post?.slice(0, 1)?.map((p, index) => (
            <Link
              href={p.link}
              className="w-full md:w-1/4 bg-white h-auto p-2 block"
              key={index}
            >
              <Image
                src={p.img || "/default.jpg"}
                width={600}
                height={600}
                alt={p.title}
                className="w-full h-[90%] object-cover"
              />
              <p className="line-clamp-2 pt-2">{p.title}</p>
            </Link>
          ))}
          <div className="w-full md:w-2/4	 grid grid-cols-2 gap-2">
            {item[activeCategory]?.post?.slice(2, 5)?.map((p, index) => {
              if (index === 0) {
                return (
                  <Link
                    href={p.link}
                    key={index}
                    className="col-span-2 bg-white border p-2"
                  >
                    <Image
                      src={p.img || "/default.jpg"}
                      width={600}
                      height={600}
                      alt={p.title}
                      className="w-full h-60 object-cover"
                    />
                    <p className="line-clamp-2">{p.title}</p>
                  </Link>
                );
              } else {
                return (
                  <Link
                    href={p.link}
                    key={index}
                    className="row-span-2 bg-white border p-2 space-y"
                  >
                    <Image
                      src={p.img || "/default.jpg"}
                      width={300}
                      height={300}
                      alt={p.title}
                      className="w-full h-36 object-cover"
                    />
                    <p className="line-clamp-2 text-base leading-normal">
                      {p.title}
                    </p>
                  </Link>
                );
              }
            })}
          </div>
          {item[activeCategory]?.post?.slice(1, 2)?.map((p, index) => (
            <Link
              href={p.link}
              className="w-full md:w-1/4 bg-white h-auto p-2 block"
              key={index}
            >
              <Image
                src={p.img || "/default.jpg"}
                width={600}
                height={600}
                alt={p.title}
                className="w-full h-[90%] object-cover"
              />
              <p className="line-clamp-2 pt-2">{p.title}</p>
            </Link>
          ))}
        </div>
      )}
      {box === 12 && (
        <div className="flex md:flex-row flex-col gap-2">
          <div className="w-full md:w-1/4 space-y-1 block">
            {item[activeCategory]?.post?.slice(1, 5)?.map((p, index) => {
              if (index === 0) {
                return (
                  <Link
                    href={p.link}
                    key={index}
                    className="bg-white p-2 block"
                  >
                    <Image
                      src={p.img || "/default.jpg"}
                      width={600}
                      height={600}
                      alt={p.title}
                      className="w-full h-36 object-cover"
                    />
                    <p className="line-clamp-2 text-base leading-normal">
                      {p.title}
                    </p>
                  </Link>
                );
              } else {
                return (
                  <Link
                    href={p.link}
                    key={index}
                    className="bg-white p-2 flex items-center space-x-1"
                  >
                    <Image
                      src={p.img || "/default.jpg"}
                      width={300}
                      height={300}
                      alt={p.title}
                      className="w-20 h-16 object-cover"
                    />
                    <p className="line-clamp-2 text-base leading-normal">
                      {p.title}
                    </p>
                  </Link>
                );
              }
            })}
          </div>
          <div className="w-full md:w-1/2">
            {item[activeCategory]?.post?.slice(0, 1)?.map((p, index) => (
              <Link
                href={p.link}
                className="bg-white p-2 block h-auto"
                key={index}
              >
                <Image
                  src={p.img || "/default.jpg"}
                  width={600}
                  height={600}
                  alt={p.title}
                  className="w-full h-96 object-cover"
                />
                <p className="line-clamp-2 mt-2 text-base leading-normal">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>

          <div className="w-full md:w-1/4 space-y-1 block">
            {item[activeCategory]?.post?.slice(5, 9)?.map((p, index) => {
              if (index === 0) {
                return (
                  <Link
                    href={p.link}
                    key={index}
                    className="bg-white p-2 block"
                  >
                    <Image
                      src={p.img || "/default.jpg"}
                      width={600}
                      height={600}
                      alt={p.title}
                      className="w-full h-36 object-cover"
                    />
                    <p className="line-clamp-2 text-base leading-normal">
                      {p.title}
                    </p>
                  </Link>
                );
              } else {
                return (
                  <Link
                    href={p.link}
                    key={index}
                    className="bg-white p-2 flex items-center space-x-1"
                  >
                    <Image
                      src={p.img || "/default.jpg"}
                      width={300}
                      height={300}
                      alt={p.title}
                      className="w-20 h-16 object-cover"
                    />
                    <p className="line-clamp-2 text-base leading-normal">
                      {p.title}
                    </p>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      )}
      {box === 13 && (
        <div className="w-full flex flex-col md:flex-row gap-2">
          {item[activeCategory]?.post?.slice(0, 1)?.map((p, index) => (
            <Link
              href={p.link}
              className="w-full md:w-2/4	bg-white p-2 block h-auto"
              key={index}
            >
              <Image
                src={p.img || "/default.jpg"}
                width={600}
                height={600}
                alt={p.title}
                className="w-full h-[88%] object-cover"
              />
              <p className="line-clamp-2 text-base leading-normal">{p.title}</p>
            </Link>
          ))}
          <div className="w-full md:w-2/4	block space-y-1">
            {item[activeCategory]?.post?.slice(1, limit)?.map((p, index) => (
              <Link
                href={p.link}
                className="bg-white p-2 flex items-center space-x-1"
                key={index}
              >
                <Image
                  src={p.img || "/default.jpg"}
                  width={600}
                  height={600}
                  alt={p.title}
                  className="w-20 h-16 object-cover"
                />
                <p className="line-clamp-2 text-base leading-normal">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {box === 14 && (
        <div className="w-full flex flex-col md:flex-row gap-2">
          {item[activeCategory]?.post?.slice(0, 1)?.map((p, index) => (
            <Link
              href={p.link}
              className="w-full md:w-2/4	bg-white p-2 block h-auto"
              key={index}
            >
              <Image
                src={p.img || "/default.jpg"}
                width={600}
                height={600}
                alt={p.title}
                className="w-full h-[88%] object-cover"
              />
              <p className="line-clamp-2 text-base leading-normal">{p.title}</p>
            </Link>
          ))}
          <div className="w-full md:w-2/4	grid grid-cols-2 gap-1">
            {item[activeCategory]?.post?.slice(1, limit)?.map((p, index) => (
              <Link
                href={p.link}
                className="bg-white p-2 space-y-1"
                key={index}
              >
                <Image
                  src={p.img || "/default.jpg"}
                  width={600}
                  height={600}
                  alt={p.title}
                  className="w-full h-28 object-cover"
                />
                <p className="line-clamp-2 text-base leading-normal">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {box === 15 && (
        <div className="relative group">
          <div className="w-full bg-white p-2 relative h-40 md:h-96 flex items-center justify-center">
            <Image
              width={1900}
              height={600}
              src={
                (Array.isArray(items) && items[currentImage]?.img) ||
                "/default.jpg"
              }
              alt={`Slide ${currentImage + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute flex md:group-hover:flex md:hidden justify-between w-full items-center gap-2">
              <div
                onClick={prevImage}
                className="bg-black flex items-center justify-center opacity-50 w-8 md:h-16 h-10 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z"
                  />
                </svg>
              </div>
              <div
                onClick={nextImage}
                className="bg-black flex items-center justify-center opacity-50 w-8 md:h-16 h-10 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 group-hover:flex hidden justify-center">
            {items?.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full mx-1 cursor-pointer ${
                  currentImage === index ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      )}
      {box === 16 && (
        <div className="relative group">
          <div className="w-full bg-white p-2 relative h-40 md:h-96 flex items-center justify-center">
            <Image
              width={1280}
              height={600}
              src={
                (Array.isArray(items) && items[currentImage]?.img) ||
                "/default.jpg"
              }
              alt={`Slide ${currentImage + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute flex md:group-hover:flex md:hidden justify-between w-full items-center gap-2">
              <div
                onClick={prevImage}
                className="bg-black flex items-center justify-center opacity-50 w-8 md:h-16 h-10 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m15 4l2 2l-6 6l6 6l-2 2l-8-8z"
                  />
                </svg>
              </div>
              <div
                onClick={nextImage}
                className="bg-black flex items-center justify-center opacity-50 w-8 md:h-16 h-10 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-row gap-1 overflow-x-auto scrollbarx w-full mt-2">
            {items?.map((slide, index) => (
              <Image
                key={index}
                width={300}
                height={300}
                src={slide.img || "/default.jpg"}
                alt={`Thumbnail ${index + 1}`}
                className={`flex-none cursor-pointer w-28 h-20 object-cover bg-white border-4 ${
                  currentImage === index ? "border-main" : "border-white"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>
      )}
      {box === 17 && (
        <div className="relative group">
          <div
            ref={containerRef}
            className="flex overflow-hidden gap-2 transition-transform duration-500"
          >
            {displayedItems?.map((p, index) => (
              <div
                key={index}
                className={`w-full sm:w-3/6 md:w-1/${itemsToShow} transition-opacity duration-500`}
              >
                <Link href={p.link} className="p-2 block bg-white relative">
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="from-black bg-gradient-to-t absolute bottom-2 right-2 left-2">
                    <p className="line-clamp-2 text-white m-2 pt-24 text-base leading-normal">
                      {p.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrevious}
            className="absolute md:hidden md:group-hover:block left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute md:hidden md:group-hover:block right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
      {box === 18 && (
        <div className="relative group">
          <div
            ref={containerRef}
            className="flex overflow-hidden gap-2 transition-transform duration-500"
          >
            {displayedItems?.map((p, index) => (
              <div
                key={index}
                className={`w-full sm:w-3/6 md:w-1/${itemsToShow} transition-opacity duration-500`}
              >
                <Link href={p.link} className="p-2 block bg-white">
                  <Image
                    src={p.img || "/default.jpg"}
                    width={300}
                    height={300}
                    alt={p.title}
                    className="w-full h-32 object-cover"
                  />
                  <p className="line-clamp-2 text-base leading-normal">
                    {p.title}
                  </p>
                </Link>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrevious}
            className="absolute md:hidden md:group-hover:block left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute md:hidden md:group-hover:block right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default News;
