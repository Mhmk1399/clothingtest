"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import Link from "next/link";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import Image from "next/image";
import axios from "axios";

type PropType = {
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("api/banners")
      .then((res) => {
        setImages(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="embla relative w-full max-w-6xl mx-auto bg-transparent p-4">
      <Link href="/Store" className="bg-transparent">
      <div
        className="embla__viewport overflow-hidden rounded-lg"
        ref={emblaRef}
      >
        
        <div className="embla__container flex">
          {images.map((image: { image?: string; name?: string }, index) => (
            <div className="embla__slide relative min-w-full" key={index}>
              <Image
                width={600}
                height={350}
                className="embla__slide__img w-full h-full object-cover rounded-lg"
                src={image.image || `/assets/images/computer-banner4.jpeg`}
                alt={`Slide ${index + 1}`}
              />
              {/* Overlay content */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
                <h1 className="text-xl font-bold drop-shadow-lg mb-2">
                  {image.name || `Slide ${index + 1}`}
                </h1>

                
              </div>
            </div>
          ))}{" "}
        </div>
      </div>

      <div className="embla__controls flex justify-between items-center mt-4">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="embla__dots flex space-x-2">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot h-8 w-8 rounded-full bg-gray-300 ${
                index === selectedIndex ? "bg-gray-800" : ""
              }`}
            />
          ))}
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
      </Link>
    </div>
  )
};
export default EmblaCarousel;
