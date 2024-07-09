import News from "@/components/News";

const IndexPage: React.FC = () => {
    return (
      <>
        <div className="container my-4">
          <div className="bg-white p-10 border-2 flex space-y-4 flex-col items-center justify-center border-dashed border-main rounded-2xl">
            <h1 className="text-xl md:text-6xl font-extrabold">
              Welcome to Next.js!
            </h1>
            <p className="text-base md:text-2xl">
            Learn more about the 1.0 version.
            </p>
            <strong className="text-2xl">
            Price in Kenya
            </strong>
          </div>
        </div>
        <div className="container my-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-md px-2 py-4 text-center block space-y-3 text-white">
                  <h1 className="font-bold text-xl">
                      Orders
                  </h1>
                  <p>
                      123546
                  </p>
              </div>
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md px-2 py-4 text-center block space-y-3 text-white">
                  <h1 className="font-bold text-xl">
                      Products
                  </h1>
                  <p>
                      123546
                  </p>
              </div>
              <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-md px-2 py-4 text-center block space-y-3 text-white">
                  <h1 className="font-bold text-xl">
                      Category
                  </h1>
                  <p>
                      123546
                  </p>
              </div>
              <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-md px-2 py-4 text-center block space-y-3 text-white">
                  <h1 className="font-bold text-xl">
                      Brands
                  </h1>
                  <p>
                      123546
                  </p>
              </div>
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md px-2 py-4 text-center block space-y-3 text-white">
                  <h1 className="font-bold text-xl">
                      Banner
                  </h1>
                  <p>
                      123546
                  </p>
              </div>
              <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-md px-2 py-4 text-center block space-y-3 text-white">
                  <h1 className="font-bold text-xl">
                      Banner
                  </h1>
                  <p>
                      123546
                  </p>
              </div>
          </div>
        </div>

        <div className="container my-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <News
              title="News list"
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
              title="Videos list"
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
              title="Stories list"
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
          </div>
        </div>
      </>
    );
  }
  export default IndexPage;