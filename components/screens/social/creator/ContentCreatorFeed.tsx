"use client";
import { BadgeIcon } from "@/app/icons";
import Avatar from "@/components/auth/Avatar";
import { CardChip } from "@/components/common/CardComp";
import InputComp from "@/components/Form/InputComp";
import { contentCreatorPosts } from "@/constants/data";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CircleChevronLeft,
  CircleChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Send,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ShareExperience() {
  const { user } = useAuth();
  const { t: tScreen } = useTranslation("screen");
  const [description, setDescription] = useState("");
  const suggestions = [
    tScreen("contentCreator.home.shareMoment"),
    tScreen("contentCreator.home.justHitNewRank"),
    tScreen("contentCreator.home.goingLive"),
    tScreen("contentCreator.home.newSetupReveal"),
  ];
  return (
    <div
      className={`gradient-one border p-4 overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)]`}
    >
      <div className="flex gap-4">
        <div>
          <Avatar
            size={60}
            user={user}
            contClass="border-2 border-[var(--primary)]"
          />
        </div>

        <InputComp
          name="description"
          type="textarea"
          required
          radius="10px"
          variant="secondaryTwo"
          rows={2}
          value={description ?? ""}
          onChange={(e: any) => setDescription(e.target.value)}
        />
        <button className="cursor-pointer w-fit text-[var(--primary)] font-semibold flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md">
          <Send className="w-6 h-6" />
          {/* Post */}
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {suggestions?.map((label, index) => {
          return (
            <CardChip
              key={`key-${index}`}
              label={label}
              onClick={() => setDescription(label)}
            />
          );
        })}
      </div>
    </div>
  );
}

function PostMedia({ media = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  if (!media?.length) return null;

  const ImageCard = ({ obj }: { obj: any }) => (
    <div className="w-full aspect-[2.5/1] overflow-hidden rounded-xl bg-[var(--bgTwo)] relative">
      <Image
        src={obj.image_url}
        alt="post"
        fill
        className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
    </div>
  );

  // Single image
  if (media.length === 1) {
    return <ImageCard obj={media[0]} />;
  }

  // Multiple images
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full"
        pagination={{
          clickable: true,
          renderBullet: (_, className) =>
            `<span class="${className} custom-bullet"></span>`,
        }}
        navigation={{
          nextEl: ".custom-swiper-next",
          prevEl: ".custom-swiper-prev",
        }}
        style={{ "--swiper-pagination-bottom": "10px" } as React.CSSProperties}
        spaceBetween={0}
        slidesPerView={0.9}
        centeredSlides
        speed={600}
      >
        {media.map((obj: any) => (
          <SwiperSlide key={obj.id || obj.image_url} className="w-full">
            <ImageCard obj={obj} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Left Arrow */}
      {activeIndex > 0 && (
        <div
          className="custom-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <CircleChevronLeft
            size={30}
            className="text-[var(--textOne)] opacity-80"
          />
        </div>
      )}

      {/* Right Arrow */}
      {activeIndex < media.length - 1 && (
        <div
          className="custom-swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <CircleChevronRight
            size={30}
            className="text-[var(--textOne)] opacity-80"
          />
        </div>
      )}
    </div>
  );
}

function PostCard({ obj }) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(obj?.like_count || 0);
  const [animating, setAnimating] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (obj?.user?.is_liked) setIsLiked(obj.user.is_liked);
    if (obj?.user?.comment) setComment(obj.user.comment);
  }, [obj?.user]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => prev + (isLiked ? -1 : 1));

    // Trigger scale animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300); // animation duration
  };

  return (
    <div className="gradient-one border p-4 w-full overflow-hidden rounded-xl flex flex-col gap-3 border-[var(--borderThree)]">
      <div className="flex gap-2">
        <Avatar user={{ avatar_url: obj?.created_by?.avatar_url }} size={45} />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <h1 className="text-lg lg:text-lg font-semibold text-[var(--textOne)]">
              {obj?.created_by?.name}
            </h1>
            {obj?.created_by?.isVerified && (
              <BadgeIcon className="text-[var(--primary)]" size={20} />
            )}
            <CardChip
              label={obj?.created_by?.level}
              style={{
                background: "var(--textFive)",
                fontWeight: 600,
                padding: "1px 8px",
                fontSize: 14,
                height: "fit-content",
              }}
            />
          </div>
          <div className="flex gap-2">
            <p className="text-[14px] text-[var(--textTwo)]">
              {obj?.created_by?.username}
            </p>
            <p className="text-[14px] text-[var(--textTwo)]">
              {obj?.date_time}
            </p>
            <p className="text-[14px] font-semibold text-[var(--primary)]">
              {obj?.created_by?.achievement}
            </p>
          </div>
        </div>
      </div>
      <p className="text-md text-[var(--textOne)] whitespace-pre-line">
        {obj?.description}
      </p>
      <PostMedia media={obj?.images} />

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {obj?.like_count !== undefined && (
            <div
              className={`flex items-center gap-1 text-[var(--textTwo)] cursor-pointer`}
              onClick={handleLike}
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? "text-[var(--bgFour)] fill-[var(--bgFour)]" : ""
                } ${
                  animating
                    ? "scale-125 transition-transform duration-300"
                    : "transition-transform duration-300"
                }`}
              />
              <span className="select-none w-6">{likeCount}</span>
            </div>
          )}

          {obj?.comment_count !== undefined && (
            <div className="flex items-center gap-1 text-[var(--textTwo)] cursor-pointer">
              <MessageCircle className="w-5 h-5" />
              <span className="select-none ">{obj.comment_count}</span>
            </div>
          )}
        </div>

        <button className="border cursor-pointer w-fit px-3 gap-1 py-1 border-[var(--borderTwo)] bg-[var(--bgTwo)] rounded-full flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md">
          <span>Share</span>
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4">
        <div>
          <Avatar
            size={40}
            user={user}
            contClass="border-1 border-[var(--primary)]"
          />
        </div>
        <InputComp
          name="comment"
          placeholder="Drop a comment"
          type="text"
          required
          radius="50px"
          variant="secondaryTwo"
          rows={2}
          value={comment ?? ""}
          onChange={(e: any) => setComment(e.target.value)}
        />
        <button className="cursor-pointer w-fit text-[var(--primary)] flex items-center justify-center transition-all hover:scale-[1.10] hover:opacity-95 duration-300 shadow-md">
          <Send className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

function PostsCommentFeed({}) {
  return (
    <>
      {contentCreatorPosts?.map((obj) => {
        return <PostCard key={obj?.id} obj={obj} />;
      })}
    </>
  );
}

export default function ContentCreatorFeed() {
  return (
    <div className="flex flex-col gap-4">
      <ShareExperience />
      <PostsCommentFeed />
    </div>
  );
}
