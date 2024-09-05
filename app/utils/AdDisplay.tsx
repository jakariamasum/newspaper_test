import Image from "next/image";
import Link from "next/link";

interface AdContent {
  id: string;
  type: string;
  content: any;
}

interface AdDisplayProps {
  ads: AdContent[];
  adId: string;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ ads, adId }) => {
  const ad = ads.find((ad) => ad.id === adId);

  return (
    <Link href="/" className="mb-2 block bg-white p-2">
      {ad?.type === "images" ? (
        <Image
          key={ad.id}
          src={ad.content.image as string}
          width={728}
          height={90}
          alt={ad.id}
          className="w-full h-auto"
        />
      ) : ad?.type === "code" ? (
        <p
          key={ad.id}
          dangerouslySetInnerHTML={{
            __html: ad.content || "",
          }}
        />
      ) : null}
    </Link>
  );
};

export default AdDisplay;
