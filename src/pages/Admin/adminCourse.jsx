import React, { useState } from "react";
import { Form, Input, Button, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function AdminCourses() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const { courses } = portfolioData;
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setSelectedItemForEdit(null);
    form.resetFields(); // Reset fields when adding a new course
    setShowAddEditModal(true);
  };

  const handleEdit = (course) => {
    setSelectedItemForEdit(course);
    form.setFieldsValue({ // Set fields when editing
      title: course.title,
      image: course.image,
      duration: course.duration,
      instructor: course.instructor,
      description: course.description
    });
    setShowAddEditModal(true);
  };

  const handleDelete = async (courseId) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post('/api/portfolio/delete-course', { id: courseId });
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
        ? await axios.post('/api/portfolio/update-course', { ...values, id: selectedItemForEdit._id })
        : await axios.post('/api/portfolio/add-course', values);
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
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-3 mt-8 gap-5 sm:grid-cols-1">
        {courses.map((course) => (
          <div
            key={course._id}
            className="shadow border border-gray-400 p-5 flex flex-col"
          >
            <h1 className="text-black text-xl font-bold">
              {course.title}
            </h1>
            <hr />
            <img src={course.image} alt="" className="h-60 w-80"/>
            <h1 className="text-black text-xl font-bold">
              {course.description}
            </h1>
            <h1 className="text-black text-xl mt-2">
              Duration: {course.duration}
            </h1>
            <h1 className="text-black text-xl mt-2">
              Instructor: {course.instructor}
            </h1>
            <div className="flex justify-end gap-3 mt-5">
              <Button
                type="danger"
                onClick={() => handleDelete(course._id)}
                className="px-10 py-2 bg-red-500 hover:bg-red-700 text-white font-bold"
              >
                Delete
              </Button>
              <Button
                type="primary"
                onClick={() => handleEdit(course)}
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
        title={selectedItemForEdit ? "Edit Course" : "Add Course"}
        onCancel={() => setShowAddEditModal(false)}
        footer={null}
      >
        <Form
          form={form} // Use form instance
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: 'Please enter the image URL' }]}
          >
            <Input placeholder="Image URL" />
          </Form.Item>
          <Form.Item
            label="Duration"
            name="duration"
            rules={[{ required: true, message: 'Please enter the duration' }]}
          >
            <Input placeholder="Duration" />
          </Form.Item>
          <Form.Item
            label="Instructor"
            name="instructor"
            rules={[{ required: true, message: 'Please enter the instructor name' }]}
          >
            <Input placeholder="Instructor" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea placeholder="Description" />
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

export default AdminCourses;
