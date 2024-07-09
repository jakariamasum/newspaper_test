import Image from 'next/image';
import React from 'react';

type VideoItem = {
  yt: string;
  link: string;
  title: string;
  user: string;
};

type VideosProps = {
  title: string;
  items: VideoItem[];
};

const Videos: React.FC<VideosProps> = ({ title, items }) => {
  return (
    <div className="container my-2">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {items.map((item, index) => (
          <div key={index} className="rounded overflow-hidden bg-white">
            <a href={item.link} className="block">
              <Image
                src={`https://i.ytimg.com/vi/${item.yt}/mqdefault.jpg`}
                width={300}
                height={300}
                alt={item.title}
                className="w-full h-auto rounded"
              />
              <div className="flex items-center p-2">
                <img
                  src={item.user}
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <h2 className="line-clamp-2 text-base leading-normal">
                    {item.title}
                </h2>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;