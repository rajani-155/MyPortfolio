import React, { useEffect } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import SvgButton from "../../components/SvgButton";
import { useInView } from "@react-spring/web";

// Animation variants
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function About({ uniqueKey }) {
  const { portfolioData } = useSelector((state) => state.root);
  const about = portfolioData?.about || {};
  const { lottieURL, description1, description2, skills = [] } = about;

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      key={uniqueKey}
      className="py-10"
    >
      <SectionTitle title="About" />
      <div className="flex w-full items-center sm:flex-col">
        <motion.div
          className="h-[70vh] w-1/2 sm:w-full"
          variants={fadeInUpVariants}
        >
          {lottieURL ? (
            <lottie-player
              src={lottieURL}
              speed="1"
              loop
              autoplay
              direction="1"
              mode="normal"
              aria-label="About animation"
            ></lottie-player>
          ) : (
            <p>No animation available.</p>
          )}
        </motion.div>
        <motion.div
          className="flex flex-col gap-6 w-1/2 sm:w-full"
          variants={staggerContainerVariants}
        >
          <motion.p
            className="text-black text-lg"
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.05, color: "#3498db" }}
          >
            {description1 || "No description available."}
          </motion.p>
          <motion.p
            className="text-black text-lg"
            variants={fadeInUpVariants}
            whileHover={{ scale: 1.05, color: "#3498db" }}
          >
            {description2 || "No description available."}
          </motion.p>
        </motion.div>
      </div>

      <motion.div variants={fadeInUpVariants}>
        <h1 className="text-xl ml-20 mt-5">
          Here are a few technologies I've been working with recently:
        </h1>
        <motion.div
          className="flex flex-wrap gap-5 ml-20 mt-4"
          variants={staggerContainerVariants}
        >
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <motion.div key={index} variants={fadeInUpVariants}>
                <SvgButton text={skill} href="#" />
              </motion.div>
            ))
          ) : (
            <p>No skills data available.</p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default About;
