"use client";
import React, { useEffect } from "react";

const Comment: React.FC = () => {
  useEffect(() => {
    console.log("Finished loading");
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Load Facebook SDK asynchronously
    const loadFbSdk = () => {
      (window as any).fbAsyncInit = function () {
        (window as any).FB.init({
          appId: "3638093886307743",
          autoLogAppEvents: true,
          xfbml: true,
          version: "v9.0",
        });
      };

      const fjs = document.getElementsByTagName("script")[0];
      if (fjs && fjs.parentNode) {
        const js = document.createElement("script");
        js.id = "facebook-jssdk";
        js.src = "https://connect.facebook.net/en-US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }
    };

    loadFbSdk();
  }, []);

  return (
    <div
      className="fb-comments w-full bg-white py-2"
      data-href={window.location.href}
      data-width="875"
      data-numposts="5"
    ></div>
  );
};

export default Comment;
