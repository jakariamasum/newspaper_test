"use client";
import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

const Canva = () => {
  const [title, setTitle] = useState('China Wholesale <br> <h>Cheap Hand Made</h> <br> Brazilian');
  const [titleColor, setTitleColor] = useState('#fff');
  const [hColor, setHColor] = useState('#000');
  const [description, setDescription] = useState('');
  const [descriptionColor, setDescriptionColor] = useState('#fff');
  const [seeMore, setSeeMore] = useState('Details in the comments');
  const [cat, setCat] = useState('Tech');
  const [seeMoreColor, setSeeMoreColor] = useState('#fff');
  const [date, setDate] = useState('');
  const [dateTextColor, setDateTextColor] = useState('#fff');
  const [photoText, setPhotoText] = useState('');
  const [photoTextColor, setPhotoTextColor] = useState('#fff');
  const [backgroundColor, setBackgroundColor] = useState('#ab4725');
  const [backgroundType, setBackgroundType] = useState('color');
  const [gradientColor1, setGradientColor1] = useState('#ab4725');
  const [gradientColor2, setGradientColor2] = useState('#ffffff');
  const [gradientAngle, setGradientAngle] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState('/canva/bg.jpg');
  const [logo, setLogo] = useState('/canva/logo.png');
  const [favicon, setFavicon] = useState('/canva/favicon.png');
  const [photo, setPhoto] = useState('/post/2.jpg');
  const [watermark, setWatermark] = useState('');
  const [selectedBox, setSelectedBox] = useState('all');
  const [currentDate, setCurrentDate] = useState('');

  const canvaRef1 = useRef<HTMLDivElement>(null);
  const canvaRef2 = useRef<HTMLDivElement>(null);
  const canvaRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set default date in Bengali format (২৫ মে ২২০৪)
    const currentDateObj = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const bengaliDate = currentDateObj.toLocaleDateString('bn-BD', options);
    setCurrentDate(bengaliDate);
    setDate(currentDateObj.toISOString().split('T')[0]);

    // Set default color for all color input boxes
    setTitleColor('#fff');
    setHColor('#ff0000');
    setDescriptionColor('#fff');
    setSeeMoreColor('#fff');
    setDateTextColor('#fff');
    setPhotoTextColor('#fff');
  }, []);

  const formatDate = (inputDate: string) => {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };

  const handleDownload = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;

    const canva = ref.current;
    const originalWidth = canva.style.width;
    const originalHeight = canva.style.height;

    // Temporarily set the size for screenshot
    canva.style.width = '1080px';
    canva.style.height = '1350px';

    html2canvas(canva, {
      width: 1080,
      height: 1350,
    }).then(canvas => {
      // Restore the original size
      canva.style.width = originalWidth;
      canva.style.height = originalHeight;

      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nextjs.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const getBackgroundStyle = () => {
    if (backgroundType === 'color') {
      return { backgroundColor };
    }
    if (backgroundType === 'gradient') {
      return {
        background: `linear-gradient(${gradientAngle}deg, ${gradientColor1}, ${gradientColor2})`,
      };
    }
    if (backgroundType === 'images' && backgroundImage) {
      return {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
      };
    }
    return {};
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => setter(e.target?.result as string);
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const parseTitle = (text: string) => {
    const parts = text.split(/(<br>|<\/?h>)/g).filter(Boolean);
    return parts.map((part, index) => {
      if (part === '<br>') {
        return <br key={index} />;
      } else if (part === '<h>') {
        return null;
      } else if (part === '</h>') {
        return null;
      } else {
        const isH = parts[index - 1] === '<h>' && parts[index + 1] === '</h>';
        return (
          <span key={index} style={{ color: isH ? hColor : titleColor }}>
            {part}
          </span>
        );
      }
    });
  };

  return (
    <div className='full'>
      <div className='flex flex-col md:flex-row gap-2'>
        <div className='w-full md:w-4/6 bg-white p-2 rounded-lg'>
          <div className='flex space-x-2 w-full'>
            <div className='w-full'>
              <strong>Title</strong>
              <textarea
                defaultValue={title}
                className='border outline-0 w-full p-2 mt-2'
                placeholder='Title'
                rows={3}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='w-28'>
              <div>
                <p>
                  Text color
                </p>
                <input
                  type="color"
                  defaultValue={titleColor}
                  className='border outline-0 w-full h-10'
                  onChange={(e) => setTitleColor(e.target.value)}
                />
              </div>
              <div>
                <p>
                  H color
                </p>
                <input
                  type="color"
                  defaultValue={hColor}
                  className='border outline-0 w-full h-10'
                  onChange={(e) => setHColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className='flex items-start space-x-2 w-full'>
            <div className='w-full'>
              <strong>Description</strong>
              <textarea
                defaultValue={description}
                rows={3}
                className='border outline-0 w-full p-2 mt-2'
                placeholder='Description'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='w-28'>
              <p>
                Text color
              </p>
              <input
                type="color"
                defaultValue={descriptionColor}
                className='border outline-0 w-full h-10'
                onChange={(e) => setDescriptionColor(e.target.value)}
              />
            </div>
          </div>
          

          <div className='flex items-start space-x-2 w-full mb-4'>
            <div className='w-full'>
              <strong>See More</strong>
              <input
                type="text"
                defaultValue={seeMore}
                className='border outline-0 w-full p-2 mt-2'
                placeholder='See More'
                onChange={(e) => setSeeMore(e.target.value)}
              />
            </div>
            <div className='w-28'>
              <p>
                Text color
              </p>
              <input
                type="color"
                className='border outline-0 w-full h-10'
                defaultValue={seeMoreColor}
                onChange={(e) => setSeeMoreColor(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-start space-x-2 w-full mb-4'>
            <div className='w-full'>
              <strong>Dates</strong>
              <div className='flex space-x-2 mt-2'>
                <input
                  type="text"
                  defaultValue={cat}
                  placeholder='Category name'
                  className='border outline-0 w-full p-2'
                  onChange={(e) => setCat(e.target.value)}
                />
                <input
                  type="date"
                  value={date}
                  className='border outline-0 w-full p-2'
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className='w-28'>
              <p>
                Text color
              </p>
              <input
                type="color"
                className='border outline-0 w-full h-10'
                defaultValue={dateTextColor}
                onChange={(e) => setDateTextColor(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-start space-x-2 w-full'>
            <div className='w-full'>
              <strong>Photo copyright</strong>
              <input
                type="text"
                defaultValue={photoText}
                placeholder='Photo copyright'
                className='border outline-0 w-full p-2 mt-2'
                onChange={(e) => setPhotoText(e.target.value)}
              />
            </div>
            <div className='w-28'>
              <p>
                Text color
              </p>
              <input
                type="color"
                defaultValue={photoTextColor}
                className='border outline-0 w-full h-10'
                onChange={(e) => setPhotoTextColor(e.target.value)}
                />
              </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-2'>
            <div>
              <strong>Photo</strong>
              <label htmlFor="photoInput" className="cursor-pointer w-full flex items-center justify-center">
                {photo ? (
                  <Image
                    src={photo}
                    width={600}
                    height={600}
                    alt="Photo"
                    className="bg-white p-2 max-w-full h-auto"
                  />
                ) : (
                  <div className='mt-2 bg-white w-full'>
                    <div className='border-2 border-gray-500 text-gray-500 border-dashed flex flex-col items-center justify-center p-5 w-full'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12"/></svg>
                      <p>
                      Click to upload
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setPhoto)}
                />
              </label>
            </div>
            <div>
              <strong>Watermark</strong>
              <label htmlFor="watermarkInput" className="cursor-pointer w-full flex items-center justify-center">
                {watermark ? (
                  <Image
                    src={watermark}
                    width={600}
                    height={600}
                    alt="Watermark"
                    className="bg-white p-2 max-w-full h-auto"
                  />
                ) : (
                  <div className='mt-2 bg-white w-full'>
                    <div className='border-2 border-gray-500 text-gray-500 border-dashed flex flex-col items-center justify-center p-5 w-full'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12"/></svg>
                      <p>
                      Click to upload
                      </p>
                    </div>
                  </div>
                )}
                <input
                  id="watermarkInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setWatermark)}
                />
              </label>
            </div>
          </div>
          
        </div>
        <div className='w-full md:w-2/6 bg-white p-2 rounded-lg'>
          <div className="mb-2">
            <strong>Background Colour</strong>
            <select
              className="p-2 border mt-2 w-full outline-none rounded-md"
              defaultValue={backgroundType}
              onChange={(e) => setBackgroundType(e.target.value)}
            >
              <option value="color">Color</option>
              <option value="gradient">Gradient</option>
              <option value="images">Images</option>
            </select>
          </div>

          {backgroundType === 'color' && (
            <input
              type="color"
              defaultValue={backgroundColor}
              className='w-full h-28 p-2 bg-white border'
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          )}

          {backgroundType === 'gradient' && (
            <div>
              <div className='flex items-center justify-between mb-2'>
                <strong>Gradient color</strong>
                <input
                  type="color"
                  defaultValue={gradientColor1}
                  className='border h-8 w-28'
                  onChange={(e) => setGradientColor1(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-between mb-2'>
                <strong>Gradient color</strong>
                <input
                  type="color"
                  defaultValue={gradientColor2}
                  className='border h-8 w-28'
                  onChange={(e) => setGradientColor2(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-between mb-2'>
                <strong>Angle</strong>
                <input
                  type="range"
                  min="0"
                  max="360"
                  defaultValue={gradientAngle}
                  className='border h-8 w-28'
                  onChange={(e) => setGradientAngle(Number(e.target.value))}
                />
              </div>
            </div>
          )}

          {backgroundType === 'images' && (
            <label htmlFor="backgroundImageInput" className="cursor-pointer w-full flex items-center justify-center">
              {backgroundImage ? (
                <Image
                  src={backgroundImage}
                  width={600}
                  height={600}
                  alt="Background Image"
                  className="bg-white p-2 max-w-full h-auto"
                />
              ) : (
                <div className='mt-2 bg-white w-full'>
                  <div className='border-2 border-gray-500 text-gray-500 border-dashed flex flex-col items-center justify-center p-5 w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12"/></svg>
                    <p>
                    Click to upload
                    </p>
                  </div>
                </div>
              )}
              <input
                id="backgroundImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setBackgroundImage)}
              />
            </label>
          )}
          <div className='mt-2'>
            <strong>Logo</strong>
            <label htmlFor="logoInput" className="cursor-pointer w-full flex items-center justify-center">
              {logo ? (
                <Image
                  src={logo}
                  width={600}
                  height={90}
                  alt="Logo"
                  className="bg-white border mt-2 p-2 max-w-full h-auto"
                />
              ) : (
                <div className='mt-2 bg-white w-full'>
                  <div className='border-2 border-gray-500 text-gray-500 border-dashed flex flex-col items-center justify-center p-5 w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12"/></svg>
                    <p>
                    Click to upload
                    </p>
                  </div>
                </div>
              )}
              <input
                id="logoInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setLogo)}
              />
            </label>
          </div>
          <div className='mt-2'>
            <strong>Favicon</strong>
            <label htmlFor="faviconInput" className="cursor-pointer w-full flex items-center justify-center">
              {favicon ? (
                <Image
                  src={favicon}
                  width={60}
                  height={60}
                  alt="Favicon"
                  className="bg-white border p-2 max-w-full h-auto"
                />
              ) : (
                <div className='mt-2 bg-white w-full'>
                  <div className='border-2 border-gray-500 text-gray-500 border-dashed flex flex-col items-center justify-center p-5 w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12"/></svg>
                    <p>
                    Click to upload
                    </p>
                  </div>
                </div>
              )}
              <input
                id="faviconInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setFavicon)}
              />
            </label>
          </div>
        </div>
      </div>
  
      <div>
        <select
          className='p-2 border max-w-md my-2 outline-none'
          defaultValue={selectedBox}
          onChange={(e) => setSelectedBox(e.target.value)}
        >
          <option value="all">All</option>
          <option value="canvaRef1">Box 1</option>
          <option value="canvaRef2">Box 2</option>
        </select>

        <div
          ref={canvaRef3}
          style={getBackgroundStyle()}
          className="p-8 mx-auto relative max-w-full w-[1080px] h-[1350px]"
        >
          <div className='flex items-center justify-between mb-16'>
            <div
              className='flex items-center space-x-2 text-2xl'
              style={{ color: dateTextColor }}
            >
              <strong>{cat}</strong>
              <span className='mx-2'>||</span>
              <p>
                {date}
              </p>
            </div>
            {logo &&
              <Image
                width={250}
                height={50}
                className='h-16'
                src={logo}
                alt="Logo"
              />
            }
          </div>

          <h1
            className='text-7xl font-extrabold leading-tight mb-16 text-center'
            style={{ color: titleColor }}
          >
            {parseTitle(title)}
          </h1>

          <p
            className='text-2xl flex items-start space-x-2 justify-center font-semibold text-center mb-10'
            style={{ color: seeMoreColor }}
          >
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="50" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M17.59 18 19 16.59 14.42 12 19 7.41 17.59 6l-6 6z"></path><path d="m11 18 1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"></path></svg>
            {seeMore}
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="50" width="50" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.41 6 5 7.41 9.58 12 5 16.59 6.41 18l6-6z"></path><path d="m13 6-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"></path></svg>
          </p>
          
          {!favicon &&
            <Image
              width={90}
              height={90}
              src={favicon}
              alt="Favicon"
            />
          }
          {watermark &&
            <Image
              width={1080}
              height={90}
              src={watermark}
              className='w-full absolute left-0 bottom-0 right-0'
              alt="Watermark"
            />
          }
          {photo &&
            <Image
              width={800}
              height={400}
              className='w-full h-auto border-8 border-red-500 rounded-3xl'
              src={photo}
              alt="Photo"
            />
          }
          {!photo && (
            <div
              style={{
                width: '900px',
                height: '700px',
                backgroundImage: `url(${photo})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                maskImage: 'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/sun.svg)',
                maskSize: '100vmin',
                maskRepeat: 'no-repeat',
                maskPosition: 'center'
              }}
            ></div>
          )}
          
          <p
            style={{ color: descriptionColor }}
            dangerouslySetInnerHTML={{ __html: description }}
          >
          </p>
          
          
          <p
            style={{ color: photoTextColor }}
          >
            {photoText}
          </p>
        </div>
        <button className='p-2 bg-main text-white text-center w-full mt-2' onClick={() => handleDownload(canvaRef3)}>
          Download
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {(selectedBox === 'all' || selectedBox === 'canvaRef1') && (
            <div className='flex flex-col'>
              <div ref={canvaRef1} style={getBackgroundStyle()} className="p-8 w-full h-full">
                {logo && <img src={logo} alt="Logo" />}
                {favicon && <img src={favicon} alt="Favicon" />}
                {watermark && <img src={watermark} alt="Watermark" />}
                {photo && <img src={photo} alt="Photo" />}
                <h1 className='text-6xl' style={{ color: titleColor }}>{parseTitle(title)}</h1>
                <p style={{ color: descriptionColor }} dangerouslySetInnerHTML={{ __html: description }}></p>
                <p style={{ color: seeMoreColor }}>{seeMore}</p>
                <p style={{ color: dateTextColor }}>{date}</p>
                <p style={{ color: photoTextColor }}>{photoText}</p>
              </div>
              <button className='p-2 bg-main text-white text-center w-full mt-2' onClick={() => handleDownload(canvaRef1)}>
                Download
              </button>
            </div>
          )}
          {(selectedBox === 'all' || selectedBox === 'canvaRef2') && (
            <div className='flex flex-col'>
              <div ref={canvaRef2} style={getBackgroundStyle()} className="p-8 w-full h-full">
                {logo && 
                  <img src={logo} alt="Logo" />
                }
                {favicon && <img src={favicon} alt="Favicon" />}
                {watermark && <img src={watermark} alt="Watermark" />}
                {photo && <img src={photo} alt="Photo" />}
                <h1 style={{ color: titleColor }}>{parseTitle(title)}</h1>
                <p style={{ color: descriptionColor }} dangerouslySetInnerHTML={{ __html: description }}></p>
                <p style={{ color: seeMoreColor }}>{seeMore}</p>
                <p style={{ color: dateTextColor }}>{formatDate(date)}</p>
                <p style={{ color: photoTextColor }}>{photoText}</p>
              </div>
              <button className='p-2 bg-main text-white text-center w-full mt-2' onClick={() => handleDownload(canvaRef2)}>
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
  
export default Canva;
  