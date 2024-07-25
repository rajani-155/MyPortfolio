import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminIntro() {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    dispatch(ShowLoading());
    try {
      console.log('Update intro form values:', values);
      const response = await axios.post('/api/portfolio/update-intro', {
        ...values,
        _id: portfolioData.intro._id, 
      });
      dispatch(HideLoading());

      console.log('API response:', response.data);

      if (response.data.success) {
        message.success(response.data.message);
        
      } else {
        message.error(response.data.message || 'Failed to update intro');
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' initialValues={portfolioData.intro}>
        <Form.Item name='welcomeText' label='Welcome Text ' style={{ fontSize: "16px" }}>
          <Input placeholder='Welcome Text'style={{ fontSize: "16px" }} />
        </Form.Item>
        <Form.Item name='firstName' label='First Name' style={{ fontSize: "16px" }}>
          <Input placeholder='First Name'style={{ fontSize: "16px" }} />
        </Form.Item>
        <Form.Item name='lastName' label='Last Name'style={{ fontSize: "16px" }}>
          <Input placeholder='Last Name'style={{ fontSize: "16px" }} />
        </Form.Item>
        <Form.Item name='caption' label='Caption'style={{ fontSize: "16px" }}>
          <Input placeholder='Caption' style={{ fontSize: "16px" }}/>
        </Form.Item>
        <Form.Item name='description1' label='Description1'style={{ fontSize: "16px" }}>
          <Input.TextArea placeholder='Description1'style={{ fontSize: "16px" }} />
        </Form.Item>
        <Form.Item name='description2' label='Description2'style={{ fontSize: "16px" }}>
          <Input.TextArea placeholder='Description2' style={{ fontSize: "16px" }}/>
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

export default AdminIntro;
