"use client";
import { Button } from "@base-ui/react";
import Image from "next/image";

const ExploreBtn = () => {
  return (
    <Button
      id="explore-btn"
      className="mt-7 mx-auto max-sm:px-10"
      type="button"
      onClick={() => {
        console.log("first");
      }}
    >
      <a href="#events" className="w-fit">
        Explore more
      </a>
      <Image
        src="/icons/arrow-down.svg"
        alt="arrow-down icon"
        width={20}
        height={20}
        className="h-auto w-auto ms-2"
      />
    </Button>
  );
};

export default ExploreBtn;
