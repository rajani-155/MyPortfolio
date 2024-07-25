import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminEducation() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { educations } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm(); // Create form instance

  const handleAdd = () => {
    setSelectedItemForEdit(null);
    form.resetFields(); // Reset form fields for a new entry
    setShowAddEditModal(true);
  };

  const handleEdit = (education) => {
    setSelectedItemForEdit(education);
    form.setFieldsValue({
      degree: education.degree,
      institution: education.institution,
      details: education.details,
      year: education.year
    }); // Populate form fields for editing
    setShowAddEditModal(true);
  };

  const handleDelete = async (educationId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/portfolio/delete-education', { id: educationId });
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
      const response = selectedItemForEdit
        ? await axios.post('/api/portfolio/update-education', { ...values, id: selectedItemForEdit._id })
        : await axios.post('/api/portfolio/add-education', values);
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
          Add Education
        </button>
      </div>
      <div className="grid grid-cols-3 mt-8 gap-5 sm:grid-cols-1">
        {educations.map((education) => (
          <div
            key={education._id}
            className="shadow border border-gray-400 p-5 flex flex-col"
          >
            <h1 className="text-black text-xl font-bold">
              {education.degree}
            </h1>
            <hr />
            <h1 className="text-black text-xl mt-2">
              Institution: {education.institution}
            </h1>
            <h1 className="text-black text-xl mt-2">
              Details: {education.details}
            </h1>
            <h1 className="text-black text-xl mt-2">
              Year: {education.year}
            </h1>
            <div className="flex justify-end gap-3 mt-5">
              <Button
                type="danger"
                onClick={() => handleDelete(education._id)}
                className="px-10 py-2 bg-red-500 hover:bg-red-700 text-white font-bold"
              >
                Delete
              </Button>
              <Button
                type="primary"
                onClick={() => handleEdit(education)}
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
        title={selectedItemForEdit ? "Edit Education" : "Add Education"}
        onCancel={() => setShowAddEditModal(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Degree"
            name="degree"
            rules={[{ required: true, message: 'Please enter the degree' }]}
          >
            <Input placeholder="Degree" />
          </Form.Item>
          <Form.Item
            label="Institution"
            name="institution"
            rules={[{ required: true, message: 'Please enter the institution' }]}
          >
            <Input placeholder="Institution" />
          </Form.Item>
          <Form.Item
            label="Details"
            name="details"
            rules={[{ required: true, message: 'Please enter the details' }]}
          >
            <Input.TextArea placeholder="Details" />
          </Form.Item>
          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: 'Please enter the year' }]}
          >
            <Input placeholder="Year" />
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

export default AdminEducation;
