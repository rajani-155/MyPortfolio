import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "tailwindcss/tailwind.css";
import { useSpring, animated, config, useInView } from "@react-spring/web";
import profileImage from "../../assets/profile.png";
import { useSelector } from "react-redux";

const AnimatedSection = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-20% 0px",
  });

  const props = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(50px)",
    delay,
    config: config.molasses,
  });

  return (
    <animated.div ref={ref} style={props}>
      {children}
    </animated.div>
  );
};

const Intro = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const intro = portfolioData?.intro || {};
  const {
    firstName,
    lastName,
    welcomeText,
    description1,
    description2,
    caption,
  } = intro;

  const textItems = [
    welcomeText,
    `I'm ${firstName} ${lastName}`,
    caption,
    description1,
    description2,
  ].filter(Boolean);

  const socialIcons = [
  { href: "https://www.instagram.com", icon: "instagram" },
  { href: "https://twitter.com", icon: "twitter" },
  { href: "https://google.com", icon: "google-plus" },
  { href: "https://www.linkedin.com/in/rajanishrestha115", icon: "linkedin" },
  { href: "https://www.pinterest.com/shrestharajani155/", icon: "pinterest" },
];


  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    rootMargin: "-20% 0px",
  });

  const imageSpring = useSpring({
    opacity: imageInView ? 1 : 0,
    transform: imageInView
      ? "scale(1) rotate(0deg)"
      : "scale(0.8) rotate(-10deg)",
    config: config.wobbly,
  });

  return (
    <div className="bg-teal-300 min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-center min-h-screen backdrop-blur-md bg-black bg-opacity-50 p-8">
        <div className="w-full lg:w-1/2 text-white pr-0  ml-20 lg:pr-8 mb-8 lg:mb-0">
          {textItems.map((item, index) => (
            <AnimatedSection key={index} delay={index * 200}>
            <div
              className={`${
                index === 0 ? "text-4xl" : index === 1 ? "text-5xl" : "text-xl"
              } mb-6`}
            >
              {item}
            </div>

            </AnimatedSection>
          ))}
          <AnimatedSection delay={textItems.length * 200}>
            <div className="flex flex-wrap gap-4 text-3xl mt-12 mb-8">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  aria-label={icon.icon}
                  className="flex items-center justify-center h-10 w-10 border-2 rounded-full no-underline text-white hover:bg-gray-400 transition-all duration-300 hover:scale-110"
                >
                  <i className={`fab fa-${icon.icon}`}></i>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
        <animated.div
          ref={imageRef}
          style={imageSpring}
          className="w-full lg:w-2/5 p-4 border-4 border-green-300 overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={profileImage}
            alt="Profile"
            className="h-auto w-full rounded-lg"
          />
        </animated.div>
      </div>
    </div>
  );
};

export default Intro;
