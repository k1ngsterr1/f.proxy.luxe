"use client";

import { StaticImageData } from "next/image";
import { FC, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import BG1 from "@/assets/images/imain-bg1.png";
import BG2 from "@/assets/images/imain-bg2.png";
import { usePopupStore } from "@/shared/store/use-popup.store";
import { useTranslations } from "next-intl";

const ImageSlide: FC<{ image: StaticImageData }> = ({ image }) => {
  return (
    <div
      className="imain-imgs__slide"
      style={{
        top: 0,
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundImage: `url(${image.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export const HomeSlider: FC = () => {
  const [slide, setSlide] = useState(0);
  const { openPopup } = usePopupStore();
  const sliderRef = useRef<Slider>(null);
  const imageSliderRef = useRef<Slider>(null);
  const currentRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const i18n = useTranslations("homeSlider");

  return (
    <section className="imain">
      <ImageSlide image={slide === 0 ? BG1 : BG2} />
      <div className="container">
        <Slider
          className="imain-slider"
          slidesToShow={1}
          slidesToScroll={1}
          dots={false}
          arrows={true}
          infinite={false}
          fade={false}
          ref={sliderRef}
          afterChange={(currentSlide: number) => {
            setSlide(currentSlide);
          }}
        >
          <div className="imain-slide">
            <h1 className="imain-header">{i18n("header")}</h1>
            <p className="imain-text">{i18n("text")}</p>
            <h2 className="imain-subheader">{i18n("subheader")}</h2>
            <div className="imain-table">
              <p
                className="imain-count text-2xl"
                style={{
                  width: "60%",
                  textAlign: "left",
                }}
              >
                {i18n("main")}
              </p>
            </div>
            <p
              className="imain-count"
              style={{
                width: "60%",
                textAlign: "left",
              }}
            >
              {i18n("main2")}
            </p>
          </div>
          <div className="imain-slide">
            <h2 className="imain-header">{i18n("header")}</h2>
            <p className="imain-text">{i18n("text")}</p>
            <h3 className="imain-subheader">{i18n("subheader")}</h3>
            <div className="imain-table flex flex-col">
              <p
                className="imain-count"
                style={{
                  width: "60%",
                  textAlign: "left",
                }}
              >
                {i18n("main")}
              </p>
            </div>
            <p
              className="imain-count"
              style={{
                width: "60%",
                textAlign: "left",
              }}
            >
              {i18n("main2")}
            </p>
          </div>
        </Slider>
        <div className="imain-status">
          <div className="imain-status__current" ref={currentRef}>
            01
          </div>
          &nbsp;/&nbsp;
          <div className="imain-status__count" ref={countRef}>
            02
          </div>
        </div>
      </div>
    </section>
  );
};
