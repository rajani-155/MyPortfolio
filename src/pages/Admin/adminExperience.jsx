import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminExperience() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { experiences } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm(); // Get the form instance

  const handleAdd = () => {
    setSelectedItemForEdit(null);
    form.resetFields(); // Reset fields when adding a new experience
    setShowAddEditModal(true);
  };

  const handleEdit = (experience) => {
    setSelectedItemForEdit(experience);
    form.setFieldsValue({
      duration: experience.duration,
      company: experience.company,
      position: experience.position,
      description: experience.description
    }); // Set form fields for editing
    setShowAddEditModal(true);
  };

  const handleDelete = async (experienceId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/portfolio/delete-experience', { id: experienceId });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      console.log('Request Payload:', values);
      const response = selectedItemForEdit
        ? await axios.post('/api/portfolio/update-experience', { ...values, id: selectedItemForEdit._id })
        : await axios.post('/api/portfolio/add-experience', values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModal(false);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button className="py-2 px-5 bg-cyan-500 hover:bg-cyan-600 text-white font-bold" onClick={handleAdd}>
          Add Experience
        </button>
      </div>
      <div className="grid grid-cols-4 mt-8 gap-5 sm:grid-cols-1">
        {experiences.map((experience) => (
          <div
            key={experience._id}
            className="shadow border border-gray-400 p-5 flex flex-col"
          >
            <h1 className="text-black text-xl font-bold">
              {experience.duration}
            </h1>
            <hr />
            <h1 className="text-black text-xl mt-2">
              Company: {experience.company}
            </h1>
            <h1 className="text-black text-xl mt-2">
              Role: {experience.position}
            </h1>
            <h1 className="text-black text-xl mt-2">
              {experience.description}
            </h1>
            <div className="flex justify-end gap-3 mt-5">
              <Button
                type="danger"
                onClick={() => handleDelete(experience._id)}
                className="px-10 py-2 bg-red-500 hover:bg-red-700 text-white font-bold"
              >
                Delete
              </Button>
              <Button
                type="primary"
                onClick={() => handleEdit(experience)}
                className="px-10 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        visible={showAddEditModal}
        title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
        onCancel={() => setShowAddEditModal(false)}
        footer={null}
      >
        <Form
          form={form} 
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: 'Please enter the duration' }]}
          >
            <Input placeholder="Duration" />
          </Form.Item>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true, message: 'Please enter the company' }]}
          >
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please enter the position' }]}
          >
            <Input placeholder="Position" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <div className="flex justify-end gap-3">
            <Button onClick={() => setShowAddEditModal(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {selectedItemForEdit ? "Update" : "Add"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminExperience;
