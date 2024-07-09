"use client";
import React, { useState } from "react";
import Checkbox from "@/components/admin/Checkbox";
import Content from "@/components/admin/Content";
import Image from "next/image";
import Tag from "@/components/admin/Tag";

const extractYouTubeID = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};


const IndexPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [videoInput, setVideoInput] = useState("");

    const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        const id = extractYouTubeID(url);
        setVideoInput(id || url);
    };

    return (
        <>
            <div className="container my-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3">
                        <div className="mb-4">
                            <p>Title</p>
                            <input
                                type="text"
                                placeholder="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-2 mt-2 w-full outline-none rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <p>YouTube Video</p>
                            <input
                                type="text"
                                placeholder="Paste YouTube URL"
                                value={videoInput}
                                onChange={handleVideoInputChange}
                                className="p-2 mt-2 w-full outline-none rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <p>Description</p>
                            <Content />
                        </div>

                        <div className="mb-4">
                            <p>
                                Keywords
                            </p>
                            <Tag keyword="hello 1, hello 2" />
                        </div>

                    </div>
                    <div className="w-full md:w-1/3">
                        <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
                            <button type="submit" className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md">
                                Publish
                            </button>
                        </div>

                        {videoInput && (
                            <div className="mb-4">
                                <p>Image Preview</p>
                                <div className="bg-white p-2 rounded-md mt-2">
                                    <Image
                                        src={`https://i.ytimg.com/vi/${videoInput}/mqdefault.jpg`}
                                        width={400}
                                        height={400}
                                        alt="YouTube Video Thumbnail"
                                        className="w-full rounded-md"
                                    />
                                </div>
                            </div>
                        )}

                        <Checkbox
                            title="Category"
                            items={[
                                { title: "Category 1", subItems: [{ title: "SubCategory 1.1" }, { title: "SubCategory 1.2" }] },
                                { title: "Category 2", subItems: [{ title: "SubCategory 2.1", checked: true }] },
                                { title: "Category 3", checked: true },
                                { title: "Category 4" }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndexPage;
