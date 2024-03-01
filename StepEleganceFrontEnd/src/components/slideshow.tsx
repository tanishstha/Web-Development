import React, { useState, useEffect } from 'react';
import banner1 from "../assets/banner/banner1.jpg";
import banner2 from "../assets/banner/banner2.jpg";
import banner3 from "../assets/banner/banner3.jpg";
import "./slideshow.css";

interface Slide {
    id: number;
}

const Slideshow: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [slidesData, setSlidesData] = useState<Slide[]>([]);

    useEffect(() => {
        // Generate dynamic slide data with IDs
        const dynamicSlidesData: Slide[] = Array.from({ length: 3 }, (_, index) => ({
            id: index + 1,
        }));

        setSlidesData(dynamicSlidesData);

        // Automatically change the slide every 3 seconds
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % dynamicSlidesData.length);
        }, 3000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Run the effect only once when the component mounts

    return (
        <div className="slideshow-container">
            {slidesData.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                    {/* Generate or fetch image URL dynamically */}
                    <img src={index === 0 ? banner1 : index === 1 ? banner2 : banner3} alt={`Banner ${slide.id}`} height={500} />
                </div>
            ))}
        </div>
    );
};

export default Slideshow;
