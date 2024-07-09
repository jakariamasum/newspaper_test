import Table from "@/components/admin/Table";
import Link from "next/link";

const IndexPage: React.FC = () => {
    return (
        <>
            <Table
            title="Area"
            link="/admin/area/add"
            post={
                [
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
                ]
            }
            />
        </>
    );
};
export default IndexPage;