import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import styled from "styled-components";

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align to the left */
  padding: 2rem;
  background: transparent; /* Make background transparent */
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem; /* Space between contact info and form */
  flex-direction: row; /* Align items in a row */
  width: 100%;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px; /* Adjust width if needed */
  margin-bottom: 2rem;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px; /* Increase width of form */
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #4caf50; /* Emerald green border */
  border-radius: 4px;
  font-size: 1rem;
  color: #333; /* Dark gray text color */
  background-color: rgb(
    167 243 208
  ); /* Light green background for better contrast */
  transition: background-color 0.3s, border-color 0.3s;
  &:focus {
    border-color: #2e7d32; /* Darker emerald green on focus */
    outline: none;
  }
  &:hover {
    background-color: rgb(144 238 190); /* Slightly darker green on hover */
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid #4caf50; /* Emerald green border */
  border-radius: 4px;
  font-size: 1rem;
  color: #333; /* Dark gray text color */
  background-color: rgb(
    167 243 208
  ); /* Light green background for better contrast */
  resize: vertical;
  min-height: 150px;
  transition: background-color 0.3s, border-color 0.3s;
  &:focus {
    border-color: rgb(15 118 110); /* Darker emerald green on focus */
    outline: none;
  }
  &:hover {
    background-color: rgb(144 238 190); /* Slightly darker green on hover */
  }
`;

const Button = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: rgb(4 47 46); /* Emerald green background */
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(15 118 110); /* Darker emerald green on hover */
  }
`;

const AnimationWrapper = styled.div`
  height: 400px;
  width: 100%;
  max-width: 600px; /* Adjust width if needed */
  margin-top: 2rem;
  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Contact = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const contact = portfolioData?.contact || {};

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);

    // Email API call
    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending your message.");
    }
  };

  return (
    <ContactWrapper>
      <SectionTitle title="Say Hello" />
      <ContentWrapper>
        <ContactInfo className="ml-40 mt-3">
          <div className="flex items-center text-2xl gap-2">
            <FaPhone className="text-gray-500" />
            <p className="text-black text-xl ml-2 mt-3">
              {contact.Phone || "No phone number available"}
            </p>
          </div>
          <div className="flex items-center text-2xl gap-2">
            <FaEnvelope className="text-gray-500" />
            <p className="text-black text-xl ml-2 mt-3">
              {contact.email || "No email address available"}
            </p>
          </div>
          <div className="flex items-center text-2xl gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <p className="text-black text-xl ml-2 mt-3">
              {contact.Address || "No address available"}
            </p>
          </div>
        </ContactInfo>

        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <TextArea
            placeholder="Your Message"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <p className="text-red-500">{errors.message.message}</p>
          )}

          <Button type="submit">Send Message</Button>
        </FormWrapper>

        <AnimationWrapper>
          <lottie-player
            src="https://lottie.host/d76ec543-977b-4fd2-ad0c-f73cd12e7560/RJoW91igVs.json"
            background="transparent"
            speed="1"
            autoplay
            direction="1"
            mode="normal"
          ></lottie-player>
        </AnimationWrapper>
      </ContentWrapper>
    </ContactWrapper>
  );
};

export default Contact;
