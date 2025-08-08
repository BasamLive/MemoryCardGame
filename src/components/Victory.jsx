import { useEffect, useRef } from "react";

import victory from "../assets/victory-chime.mp3";

const Victory = () => {
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn(`Autoplay failed ${err}`);
      });
    }
  }),
    [];
  return (
    <audio autoPlay ref={audioRef} preload="auto">
      <source src={victory} type="audio/mp3" />
    </audio>
  );
};

export default Victory;
