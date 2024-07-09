import Image from 'next/image';
import { useState } from 'react';

interface Banner {
  img: string;
  title: string;
}

interface BannersProps {
  items: Banner[];
}

const Banners: React.FC<BannersProps> = ({ items }) => {
    const [banners, setBanners] = useState<Banner[]>(items);

  const handleBannerChange = (index: number, field: keyof Banner, value: string) => {
    setBanners(
      banners.map((banner, i) =>
        i === index
          ? {
              ...banner,
              [field]: value,
            }
          : banner
      )
    );
  };

  const handleImageChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imgUrl = reader.result as string;
        setBanners(banners.map((banner, i) => (i === index ? { ...banner, img: imgUrl } : banner)));
      };
      reader.readAsDataURL(file);
    }
  };

  const addBanner = () => setBanners([...banners, { img: '', title: '' }]);

  const removeBanner = (index: number) => setBanners(banners.filter((_, i) => i !== index));

    return (
    <div>
        <div className='flex items-center justify-between my-4 font-bold'>
            <h1>
            WebStories
            </h1>
            <button onClick={addBanner} className="bg-main text-white px-4 py-2 rounded">
                Add New
            </button>
        </div>
      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
        {banners.map((banner, index) => (
            <div key={index} className="bg-white w-full relative flex flex-col items-center">
                <div className="w-full flex flex-col items-center relative">
                    <label htmlFor={`photoInput_${index}`} className="cursor-pointer w-full flex items-center justify-center">
                        {banner.img ? (
                            <Image
                                src={banner.img}
                                width={450}
                                height={800}
                                alt="Banner"
                                className="bg-white p-2 w-min object-cover h-auto max-h-96"
                            />
                        ) : (
                            <div className='p-2 border bg-white w-full h-96'>
                                <div className='border-2 h-full border-gray-500 text-gray-500 border-dashed flex flex-col items-center justify-center p-5 w-full'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-6-6h12"/></svg>
                                    <p>
                                      450x800px
                                    </p>
                                    <p>
                                    Click to upload
                                    </p>
                                </div>
                            </div>
                        )}
                        <input
                        id={`photoInput_${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(index, e)}
                        />
                    </label>
                </div>
                <input
                    type="text"
                    value={banner.title}
                    onChange={(e) => handleBannerChange(index, 'title', e.target.value)}
                    className="border w-full p-2 outline-none"
                    placeholder="Title"
                />
                <button onClick={() => removeBanner(index)} className="text-white p-1 absolute right-2 top-2 bg-red-500/50 hover:bg-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 5L5 19M5 5l14 14" color="currentColor"/></svg>
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Banners;