import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled components with animations
const EducationContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1rem;
`;

const EducationList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;
  border-left: 2px solid;
  width: 30%;

  @media (max-width: 640px) {
    flex-direction: row;
    width: 100%;
  }
`;

const EducationItem = styled(motion.div)`
  padding: 1rem;
  cursor: pointer;
  &.selected {
    background-color: #e6f7f9;
    border-left: 4px solid;
    margin-left: -1rem;
  }
`;

const EducationDetails = styled.div`
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

function Education() {
  const { portfolioData } = useSelector((state) => state.root);
  const educations = portfolioData?.educations || [];
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleClick = (index) => {
    setSelectedItemIndex(index);
  };

  return (
    <EducationContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionTitle title="Education" />
      <div className="flex py-10 gap-20 px-20 sm:flex-col">
        <EducationList
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {educations.length > 0 ? (
            educations.map((edu, index) => (
              <EducationItem
                key={edu._id || index} // Use _id for uniqueness if available
                className={selectedItemIndex === index ? "selected" : ""}
                onClick={() => handleClick(index)}
                variants={itemVariants}
                whileHover={textHoverVariants.hover}
              >
                <motion.h1
                  className="text-xl"
                  whileHover={textHoverVariants.hover}
                >
                  {edu.degree || "No Degree"}
                </motion.h1>
              </EducationItem>
            ))
          ) : (
            <p>No education data available.</p>
          )}
        </EducationList>
        <EducationDetails>
          {educations[selectedItemIndex] ? (
            <>
              <motion.h1
                className="text-2xl"
                whileHover={textHoverVariants.hover}
              >
                {educations[selectedItemIndex].institution || "No Institution"}
              </motion.h1>
              <motion.p
                className="text-xl"
                whileHover={textHoverVariants.hover}
              >
                {educations[selectedItemIndex].details || "No Details"}
              </motion.p>
              <motion.p
                className="text-md"
                whileHover={textHoverVariants.hover}
              >
                {educations[selectedItemIndex].year || "No Year"}
              </motion.p>
            </>
          ) : (
            <p>No details available for the selected education.</p>
          )}
        </EducationDetails>
      </div>
    </EducationContainer>
  );
}

export default Education;
