"use client";
import React from "react";
import ReactPlayer from "react-player";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/navigation";
import styles from "./OnlineLearningCard.module.scss";

type ContentItem = {
  id: string;
  topic: string;
  desc: string;
  url: string;
};

type OnlineLearningCardProps = {
  content: ContentItem;
  playing: boolean;
  onPlayToggle: () => void;
  videoPlayAnimation: any;
};

const OnlineLearningCard = ({
  content,
  playing,
  onPlayToggle,
  videoPlayAnimation,
}: OnlineLearningCardProps) => {
  const router = useRouter();
  const handleLearnClick = () => {
    router.push(`/onlineleaning/${content.id}`);
  };
  return (
    <div className={styles.contentBox}>
      <div className={styles.videoBox}>
        <ReactPlayer
          url={content.url}
          playing={playing}
          onPause={() => {}}
          controls={playing}
          width="100%"
          height="22vh"
          style={{ display: "flex" }}
        />
        {!playing && (
          <div className={styles.customPlayButton} onClick={onPlayToggle}>
            <Player
              autoplay={false}
              src={videoPlayAnimation}
              style={{ width: "22vh" }}
            />
          </div>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.textDetails}>
          <p className={styles.header}>{content.topic}</p>
          <p className={styles.body}>{content.desc}</p>
        </div>
        <div className={styles.action}>
          <p onClick={handleLearnClick}>
            เรียนเลย <span>{`>`}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineLearningCard;
