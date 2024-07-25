import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminContact() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(ShowLoading());
    try {
      console.log('Update contact form values:', values);
      const response = await axios.post('/api/portfolio/update-contact', {
        ...values,
        _id: portfolioData.contact._id, 
      });
      dispatch(HideLoading());

      console.log('API response:', response.data);

      if (response.data.success) {
        message.success(response.data.message);
        
      } else {
        message.error(response.data.message || 'Failed to update contact');
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
    <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.contact}>
      <Form.Item name='Name' label='Name'style={{ fontSize: "18px" }}>
        <Input placeholder='Name'style={{ fontSize: "18px" }} />
      </Form.Item>
      <Form.Item name='Age' label='Age'style={{ fontSize: "18px" }}>
        <Input placeholder='Age' style={{ fontSize: "18px" }}/>
      </Form.Item>
      <Form.Item name='Gender' label='Gender'style={{ fontSize: "18px" }}>
        <Input placeholder='Gender' style={{ fontSize: "18px" }}/>
      </Form.Item>
      <Form.Item name='email' label='Email'style={{ fontSize: "18px" }}>
        <Input placeholder='Email' />
      </Form.Item>
      <Form.Item name='Phone' label='Phone'style={{ fontSize: "18px" }}>
        <Input placeholder='Phone' style={{ fontSize: "18px" }}/>
      </Form.Item>
      <Form.Item name='Address' label='Address'style={{ fontSize: "18px" }}>
        <Input placeholder='Address' style={{ fontSize: "18px" }}/>
      </Form.Item>
      <Form.Item name='Country' label='Country'>
        <Input placeholder='Country'style={{ fontSize: "18px" }} />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='px-10 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold'
        >
          SAVE
        </Button>
      </Form.Item>
    </Form>
  </div>
  );
}

export default AdminContact;
