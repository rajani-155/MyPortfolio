import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled components
const ExperienceContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
`;

const ExperienceList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #000;
  width: 30%;

  @media (max-width: 640px) {
    flex-direction: row;
    width: 100%;
  }
`;

const ExperienceItem = styled(motion.div)`
  padding: 1rem;
  cursor: pointer;
  &.selected {
    background-color: #e6f7f9;
    border-left: 4px solid #000;
    margin-left: -1rem;
  }
`;

const ExperienceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", delay: 0.3 } },
};

const textHoverVariants = {
  hover: { scale: 1.05, color: "#000000", transition: { duration: 0.3 } },
};

function Experiences() {
  const { portfolioData } = useSelector((state) => state.root);
  const experiences = portfolioData?.experiences || [];
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <ExperienceContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionTitle title="Experiences" />
      <div className="flex py-10 gap-20 px-20 sm:flex-col">
        <ExperienceList
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {experiences.length > 0 ? (
            experiences.map((exp, index) => (
              <ExperienceItem
                key={exp.id || index}
                className={selectedItemIndex === index ? "selected" : ""}
                onClick={() => handleClick(index)}
                variants={itemVariants}
                whileHover={textHoverVariants.hover}
              >
                <motion.h1
                  className="text-xl"
                  whileHover={textHoverVariants.hover}
                >
                  {exp.duration || "No Duration"}
                </motion.h1>
              </ExperienceItem>
            ))
          ) : (
            <p>No experience data available.</p>
          )}
        </ExperienceList>
        <ExperienceDetails>
          {experiences[selectedItemIndex] ? (
            <>
              <motion.h1
                className="text-3xl"
                whileHover={textHoverVariants.hover}
              >
                {experiences[selectedItemIndex].position || "No Position"}
              </motion.h1>
              <motion.p
                className="text-xl"
                whileHover={textHoverVariants.hover}
              >
                {experiences[selectedItemIndex].description || "No Description"}
              </motion.p>
            </>
          ) : (
            <p>No details available for the selected experience.</p>
          )}
        </ExperienceDetails>
      </div>
    </ExperienceContainer>
  );
}

export default Experiences;
