import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: { opacity: 1, x: 0, transition: { type: "spring", delay: 0.3 } },
};

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", delay: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", delay: 0.3 } },
};

const imageVariants = {
  hidden: { scale: 0.8 },
  visible: { scale: 1, transition: { type: "spring", delay: 0.4 } },
};

const textHoverVariants = {
  hover: { scale: 1.02, transition: { duration: 0.3 } },
};

const imageHoverVariants = {
  hover: { scale: 1.5, transition: { duration: 0.3 } },
};

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const { portfolioData } = useSelector((state) => state.root);
  const [projects, setProjects] = useState({});

  useEffect(() => {
    if (portfolioData?.projects) {
      setProjects(portfolioData.projects); // Set projects to the entire object
      const firstProjectKey = Object.keys(portfolioData.projects)[0];
      setSelectedProject(firstProjectKey);
    }
  }, [portfolioData]);

  const handleClick = (projectKey) => {
    setSelectedProject(projectKey);
  };

  const projectEntries = Object.entries(projects);
  const selectedProjectDetails = projects[selectedProject] || {};

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <SectionTitle title="Projects" />
      <div className="flex py-10 gap-20 px-20 sm:flex-col">
        <motion.div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {projectEntries.map(
            ([key, project]) =>
              key !== "_id" && (
                <motion.div
                  key={key}
                  className="px-6 cursor-pointer"
                  onClick={() => handleClick(key)}
                  variants={itemVariants}
                  whileHover={textHoverVariants.hover}
                >
                  <motion.h1
                    className={`text-xl px-10 ${
                      selectedProject === key
                        ? "text-tertiary border-secondary border-l-4 -ml-6 bg-teal-100 py-3"
                        : "text-black"
                    }`}
                    whileHover={textHoverVariants.hover}
                  >
                    {project.title}
                  </motion.h1>
                </motion.div>
              )
          )}
        </motion.div>
        <motion.div
          className="flex items-center justify-center gap-10 sm:flex-col"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          <div className="flex flex-col gap-5">
            <motion.h1
              className="text-black text-3xl"
              variants={itemVariants}
              whileHover={textHoverVariants.hover}
            >
              {selectedProjectDetails.title || "No Title"}
            </motion.h1>
            <motion.p
              className="text-black text-xl"
              variants={itemVariants}
              whileHover={textHoverVariants.hover}
            >
              {selectedProjectDetails.description || "No Description"}
            </motion.p>
            <motion.p
              className="text-black text-xl"
              variants={itemVariants}
              whileHover={textHoverVariants.hover}
            >
              <a
                href={selectedProjectDetails.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedProjectDetails.link || "No Link"}
              </a>
            </motion.p>
            <motion.p
              className="text-black text-xl"
              variants={itemVariants}
              whileHover={textHoverVariants.hover}
            >
              Technologies:{" "}
              {selectedProjectDetails.technologies?.join(", ") ||
                "No Technologies"}
            </motion.p>
          </div>
          {selectedProjectDetails.image ? (
            <motion.img
              src={selectedProjectDetails.image}
              alt={selectedProjectDetails.title || "Project Image"}
              className="h-52 w-80"
              variants={imageVariants}
              whileHover={imageHoverVariants.hover}
            />
          ) : (
            <motion.div
              className="h-52 w-80 bg-gray-200 flex items-center justify-center"
              variants={imageVariants}
              whileHover={imageHoverVariants.hover}
            >
              No Image
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Projects;
