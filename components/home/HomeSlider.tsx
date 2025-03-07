"use client";

import {FC, useRef} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BG1 from '../../assets/images/imain-bg1.png';
import BG2 from '../../assets/images/imain-bg2.png';
import {StaticImageData} from "next/image";

const ImageSlide: FC<{image: StaticImageData}> = ({image}) => {
    return (
        <div className="imain-imgs__slide" style={{
            backgroundImage: `url(${image.src})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: "100%"
        }}/>
    )
}

export const HomeSlider: FC = () => {
    const sliderRef = useRef<Slider>(null);
    const imageSliderRef = useRef<Slider>(null);
    const currentRef = useRef<HTMLDivElement>(null);
    const countRef = useRef<HTMLDivElement>(null);

    return (
        <section className="imain">
            <Slider  className="imain-imgs"
                     slidesToShow={1}
                     slidesToScroll={1}
                     dots={false}
                     arrows={false}
                     infinite={false}
                     fade={true}
                     ref={imageSliderRef}
            >
                <ImageSlide image={BG1} />
                <ImageSlide image={BG2} />
            </Slider>

            <div className="container">
                <Slider className="imain-slider" slidesToShow={1}
                        slidesToScroll={1}
                        dots={false}
                        arrows={true}
                        infinite={false}
                        fade={false}
                        ref={sliderRef}
                        afterChange={(currentSlide: number) => {
                            const i = currentSlide + 1;
                            const slideCount = 2;
                            imageSliderRef.current?.slickGoTo(currentSlide)
                            if (i < 10) {
                                if (countRef.current) countRef.current.textContent = "0" + slideCount;
                                if (currentRef.current) currentRef.current.textContent = "0" + i
                            } else {
                                if (countRef.current) countRef.current.textContent = String(slideCount);
                                if (currentRef.current) currentRef.current.textContent = String(i)
                            }
                        }}
                >
                    <div className="imain-slide">
                        <h2 className="imain-header">КУПИТЬ ПРОКСИ</h2>
                        <p className="imain-text">индивидуальные АНОНИМНЫЕ ПРОКСИ</p>
                        <h3 className="imain-subheader">HTTPS/SOCKS5</h3>
                        <div className="imain-table">
                            <div>
                                <div>
                                    <p className="imain-count">329122</p>
                                    <p className="imain-hint">КЛИЕНТОВ ВЫБРАЛИ НАС</p>
                                </div>
                                <div>
                                    <p className="imain-count">289596</p>
                                    <p className="imain-hint">ПРОКСИ В РАБОТЕ</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className="imain-count">1158898</p>
                                    <p className="imain-hint">ПРОДАННЫХ ПРОКСИ</p>
                                </div>
                                <div>
                                    <p className="imain-count">3133702</p>
                                    <p className="imain-hint">ЗАКАЗОВ ОБРАБОТАНО</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="imain-slide">
                        <h2 className="imain-header">КУПИТЬ ПРОКСИ</h2>
                        <p className="imain-text">индивидуальные АНОНИМНЫЕ ПРОКСИ</p>
                        <h3 className="imain-subheader">HTTPS/SOCKS5</h3>
                        <div className="imain-table">
                            <div>
                                <div>
                                    <p className="imain-count">329122</p>
                                    <p className="imain-hint">КЛИЕНТОВ ВЫБРАЛИ НАС</p>
                                </div>
                                <div>
                                    <p className="imain-count">289596</p>
                                    <p className="imain-hint">ПРОКСИ В РАБОТЕ</p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className="imain-count">1158898</p>
                                    <p className="imain-hint">ПРОДАННЫХ ПРОКСИ</p>
                                </div>
                                <div>
                                    <p className="imain-count">3133702</p>
                                    <p className="imain-hint">ЗАКАЗОВ ОБРАБОТАНО</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className="imain-status">
                    <div className="imain-status__current" ref={currentRef}>01</div>
                    &nbsp;/&nbsp;
                    <div className="imain-status__count" ref={countRef}>02</div>
                </div>
            </div>
        </section>
    );
};