import News from "@/components/News";
import WeatheTex from "@/components/WeatheTex";


const IndexPage: React.FC = () => {
  return (
    <>
      <div className="container">
        
        <div className="w-[100%]">
          
          <News
            title="News"
            link="/"
            limit={5}
            box={18}
            style={1}
            item={[
              {
                category: "hello",
                post: [
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                ]
              },
              {
                category: "hello 2",
                post: [
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },                  
                ]
              }
            ]}
          />
        </div>
      </div>
      <div className="container my-2">
        <h1 className="text-xl font-bold text-main">
          Grid 4
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <News
            title="News"
            link="/"
            limit={5}
            box={2}
            style={1}
            item={[
              {
                category: "hello",
                post: [
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                ]
              }
            ]}
          />
          <News
            title="News"
            link="/"
            limit={5}
            box={3}
            style={1}
            item={[
              {
                category: "hello",
                post: [
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                ]
              },
              {
                category: "hello 2",
                post: [
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },                  
                ]
              }
            ]}
          />
          <News
            title="News"
            link="/"
            limit={5}
            box={4}
            style={1}
            item={[
              {
                category: "hello",
                post: [
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                ]
              },
              {
                category: "hello 2",
                post: [
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },                  
                ]
              }
            ]}
          />
        </div>
      </div>

      <div className="container my-2">
        <h1 className="text-xl font-bold text-main">
          Grid 3
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

        </div>
      </div>

      <div className="container my-2">
        <h1 className="text-xl font-bold text-main">
          Grid 2
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <News
            title="News"
            link="/"
            limit={5}
            box={5}
            style={1}
            item={[
              {
                category: "hello",
                post: [
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                ]
              },
              {
                category: "hello 2",
                post: [
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },                  
                ]
              }
            ]}
          />
          <News
            title="News"
            link="/"
            limit={5}
            box={7}
            style={1}
            item={[
              {
                category: "hello",
                post: [
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                ]
              },
              {
                category: "hello 2",
                post: [
                  {
                    img: "/post/10.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/9.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/8.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/7.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/6.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/5.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/4.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },
                  {
                    img: "/post/3.jpg",
                    link: "/news/1",
                    title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/2.jpg",
                    link: "/news/1",
                    title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                  },
                  {
                    img: "/post/1.jpg",
                    link: "/news/1",
                    title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                  },                  
                ]
              }
            ]}
          />
        </div>
      </div>

      <div className="container my-2">
        <h1 className="text-xl font-bold text-main">
          75%
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/4">
            <News
              title="News"
              link="/"
              limit={5}
              box={15}
              style={1}
              item={[
                {
                  category: "hello",
                  post: [
                    {
                      img: "/post/1.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/2.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/3.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/4.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/5.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                  ]
                }
              ]}
            />
            <News
              title="News"
              link="/"
              limit={5}
              box={16}
              style={1}
              item={[
                {
                  category: "hello",
                  post: [
                    {
                      img: "/post/1.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/2.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/3.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/4.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/5.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                  ]
                }
              ]}
            />
            <News
              title="News"
              link="/"
              limit={5}
              box={13}
              style={1}
              item={[
                {
                  category: "hello",
                  post: [
                    {
                      img: "/post/1.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/2.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/3.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/4.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/5.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/6.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/7.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/8.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/9.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/10.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                  ]
                },
                {
                  category: "hello 2",
                  post: [
                    {
                      img: "/post/10.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/9.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/8.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/7.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/6.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/5.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/4.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/3.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/2.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/1.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },                  
                  ]
                }
              ]}
            />
            <News
              title="News"
              link="/"
              limit={5}
              box={14}
              style={1}
              item={[
                {
                  category: "hello",
                  post: [
                    {
                      img: "/post/1.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/2.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/3.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/4.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/5.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/6.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/7.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/8.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/9.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/10.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                  ]
                },
                {
                  category: "hello 2",
                  post: [
                    {
                      img: "/post/10.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/9.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/8.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/7.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/6.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/5.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/4.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },
                    {
                      img: "/post/3.jpg",
                      link: "/news/1",
                      title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/2.jpg",
                      link: "/news/1",
                      title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                    },
                    {
                      img: "/post/1.jpg",
                      link: "/news/1",
                      title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                    },                  
                  ]
                }
              ]}
            />
          </div>
          <div className="w-full md:w-1/4">
            <WeatheTex
                id="ww_b9ea0e9fd8fcb"
                type="horizontal"
                temperature="celsius"
                backgroundColor="#ab4725"
                fontColor="rgba(255,255,255,1)"
                cloudColor="#d4d4d4"
                perspectiveColor="#2196F3"
                sunColor="#FFC107"
                moonColor="#FFC107"
                thunderColor="#FF5722"
              />
          </div>
        </div>
      </div>

      <div className="container my-2">
        <h1 className="text-xl font-bold text-main">
          HeRo
        </h1>
        <News
          title="News"
          link="/"
          limit={5}
          box={18}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={5}
          box={6}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={5}
          box={17}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={5}
          box={1}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={5}
          box={8}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={5}
          box={9}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={5}
          box={10}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={5}
          box={11}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
        <News
          title="News"
          link="/"
          limit={9}
          box={12}
          style={1}
          item={[
            {
              category: "hello",
              post: [
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
              ]
            },
            {
              category: "hello 2",
              post: [
                {
                  img: "/post/10.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/9.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/8.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/7.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/6.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/5.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/4.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },
                {
                  img: "/post/3.jpg",
                  link: "/news/1",
                  title: "China Wholesale Cheap Hand Made Brazilian Virgin Remy Long Human Hair Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/2.jpg",
                  link: "/news/1",
                  title: "Natural Bone Straight 360 Full HD Transparent Swiss Lace Front Wigs for Black Women",
                },
                {
                  img: "/post/1.jpg",
                  link: "/news/1",
                  title: "Supply a Four Piece Set of American Solid Color European and American Style Chemical Fiber Bed Sheets",
                },                  
              ]
            }
          ]}
        />
      </div>
    </>
  );
}
export default IndexPage;
