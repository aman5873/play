"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Chip from "@/components/common/Chip";

export default function TopComp({ content, contClass = "" }) {
  const router = useRouter();

  const handleRedirect = (redirect) => {
    if (!redirect) return;
    router.push(redirect);
  };

  if (content)
    return (
      <div
        className={`relative w-full h-full xsm:h-[70vh] sm:h-[70vh] md:h-[50vh] lg:h-[55vh] ${contClass}`}
      >
        {content?.backgroundImage && (
          <Image
            src={content?.backgroundImage}
            alt={content?.title}
            fill
            style={{ objectFit: "cover", height: "100%" }}
          />
        )}

        {/* Black overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(
            to top right, 
            rgba(0,0,0,0.95) 10%,      
            rgba(0,0,0,0.91) 40%,      
            rgba(0,0,0,0.34) 100%      
          )`,
          }}
        ></div>

        {/* Text on top */}
        <div
          className="px-10 sm:max-w-[50rem] md:max-w-[52rem] mx-auto"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "white",
            zIndex: 10,
          }}
        >
          <Chip label={content?.chip} />
          <h1 className="font-sans text-3xl md:text-4xl lg:text-5xl font-semibold m-0">
            {content?.title}
          </h1>
          {content?.highlightTitle && (
            <h2
              className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold m-0"
              style={{ color: "var(--title)" }}
            >
              {content?.highlightTitle}
            </h2>
          )}
          {content?.description && (
            <p
              className="font-sans text-[1rem] md:text-[1.3rem] m-0 mt-3"
              style={{ color: "#ccc" }}
            >
              {content?.description}
            </p>
          )}

          {content.button?.length > 0 && (
            <div className="flex gap-3 mt-5">
              {content.button.map((btn, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRedirect(btn.redirect)}
                  className={btn.type === "primary" ? "" : "dark-sec-btn"}
                  style={
                    btn.type === "primary"
                      ? {
                          background: "var(--title)",
                          color: "black",
                          width: "fit-content",
                          padding: "10px 20px",
                          borderRadius: 8,
                          cursor: "pointer",
                        }
                      : {}
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  else return null;
}
