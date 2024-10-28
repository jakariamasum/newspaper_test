"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaWhatsapp,
  FaLink,
  FaPrint,
} from "react-icons/fa";
import { toast } from "sonner";

interface SocialShareProps {
  url: string;
  title: string;
  id: string;
}

export default function SocialShare({ url, title, id }: SocialShareProps) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const handlePrintClick = (id: string) => {
    router.push(`/print/${id}`);
  };
  const shareLinks = [
    {
      name: "Facebook",
      icon: FaFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "#1877f2",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "#1da1f2",
    },
    {
      name: "Pinterest",
      icon: FaPinterestP,
      url: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      color: "#bd081c",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "#25d366",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full text-white transition-colors duration-200 ease-in-out hover:opacity-80`}
          style={{ backgroundColor: link.color }}
          aria-label={`Share on ${link.name}`}
        >
          <link.icon size={16} />
        </a>
      ))}
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-full text-white transition-colors duration-200 ease-in-out hover:opacity-80 ${
          isCopied ? "bg-green-500" : "bg-gray-500"
        }`}
        aria-label="Copy link"
      >
        <FaLink size={16} />
      </button>
      <button
        onClick={() => handlePrintClick(id)}
        className={`p-2 rounded-full text-white transition-colors duration-200 ease-in-out hover:opacity-80 bg-[#7BBF6A]`}
      >
        <FaPrint size={16} />
      </button>
    </div>
  );
}
