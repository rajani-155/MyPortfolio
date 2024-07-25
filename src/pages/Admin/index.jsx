import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import AdminAbout from './adminAbout'; 
import AdminIntro from './adminIntro'; 
import AdminExperience from './adminExperience';
import AdminCourse from './adminCourse';
import AdminProject from './adminProject';
import AdminEducation from './adminEducation';
import AdminContact from './adminContact';
import '../../index.css';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

function Admin() {
  const { portfolioData } = useSelector((state) => state.root);
  useEffect(() => {
    if(!localStorage.getItem("token")){
      window.location.href = "/admin-login";
    }
  }, []);
  return (
    <div className="bg-white min-h-screen flex flex-col justify-betwee">
   <div className="flex gap-10 items-center py-2 ">
      <h1 className="px-5 py-2 text-3xl text-emerald-950 ">Portfolio Admin</h1>
      <div className="w-80 h-[1px] bg-gray-400 me-96" ></div>
      <h1 className='text-xl underline ms-96 cursor-pointer'
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/admin-login";
      }

      }>Logout</h1>
    </div>
     {portfolioData &&  <div className="px-5 ">
        <Tabs defaultActiveKey="1"  centered size="large">
          <TabPane tab={<span className="custom-tab">Intro</span>} key="1">
            <AdminIntro />
          </TabPane>
          <TabPane tab={<span className="custom-tab">About</span>} key="2">
            <AdminAbout />
          </TabPane>
          <TabPane tab={<span className="custom-tab">Education</span>} key="3">
            <AdminEducation />
          </TabPane>
          <TabPane tab={<span className="custom-tab">Experiences</span>} key="4">
            <AdminExperience />
          </TabPane>
          <TabPane tab={<span className="custom-tab">Courses</span>} key="5">
            <AdminCourse />
          </TabPane>
          <TabPane tab={<span className="custom-tab">Projects</span>} key="6">
            <AdminProject />
          </TabPane>
          <TabPane tab={<span className="custom-tab">Contacts</span>} key="7">
            <AdminContact />
          </TabPane>
        </Tabs>
      </div>}
    </div>
  );
}

export default Admin;
