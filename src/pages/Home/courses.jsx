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


function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { portfolioData } = useSelector((state) => state.root);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log('portfolioData:', portfolioData);
    if (portfolioData?.courses && Array.isArray(portfolioData.courses) && portfolioData.courses.length > 0) {
      console.log('Courses data:', portfolioData.courses);
      setCourses(portfolioData.courses);
      // Set the first course as selected, excluding the '_id' key
      const firstCourse = portfolioData.courses.find(course => course._id !== '_id');
      if (firstCourse) {
        setSelectedCourse(firstCourse._id);
      }
    } else {
      console.error('No courses data found');
    }
  }, [portfolioData]);

  console.log('Courses state:', courses);
  console.log('Selected course:', selectedCourse);

  const handleClick = (courseId) => {
    setSelectedCourse(courseId);
  };

  const selectedCourseDetails = courses.find(course => course._id === selectedCourse) || {};

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <SectionTitle title="Courses" />
      <div className="flex py-10 gap-20 px-20 sm:flex-col">
        <motion.div
          className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full"
          initial="hidden"
          animate="visible"
          variants={listVariants}
        >
          {courses.length > 0 ? (
            courses.map((course) => (
              <motion.div
                key={course._id}
                className="px-6 cursor-pointer"
                onClick={() => handleClick(course._id)}
                variants={itemVariants}
                whileHover={textHoverVariants.hover}
              >
                <motion.h1
                  className={`text-xl px-10 ${
                    selectedCourse === course._id
                      ? "text-tertiary border-secondary border-l-4 -ml-6 bg-teal-100 py-3"
                      : "text-black"
                  }`}
                  whileHover={textHoverVariants.hover}
                >
                  {course.title}
                </motion.h1>
              </motion.div>
            ))
          ) : (
            <p>No courses available</p>
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
              {selectedCourseDetails.title || "No Title"}
            </motion.h1>
            <motion.p
              className="text-black text-xl"
              variants={itemVariants}
              whileHover={textHoverVariants.hover}
            >
              {selectedCourseDetails.description || "No Description"}
            </motion.p>
            <motion.p
              className="text-black text-xl"
              variants={itemVariants}
              whileHover={textHoverVariants.hover}
            >
              Instructor: {selectedCourseDetails.instructor || "No Instructor"}
            </motion.p>
            <motion.p
              className="text-black text-xl"
              variants={itemVariants}
              whileHover={textHoverVariants.hover}
            >
              Duration: {selectedCourseDetails.duration || "No Duration"}
            </motion.p>
          </div>
          {selectedCourseDetails.image ? (
            <motion.img
              src={selectedCourseDetails.image}
              alt={selectedCourseDetails.title || "Course Image"}
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

export default Courses;