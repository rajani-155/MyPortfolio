import React, { useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Home from "./pages/Home"; 
import Admin from "./pages/Admin"; 
import Loader from "./components/Loader";
import Login from "./pages/Admin/login";
//import login 
import { ShowLoading, HideLoading, SetPortfolioData , ReloadData} from "./redux/rootSlice"; 

function App() {
  const { loading, portfolioData, reloadData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get(
        "http://localhost:5000/api/portfolio/get-portfolio-data"
      );
      dispatch(SetPortfolioData(response.data));
      dispatch(ReloadData(false));
    } catch (error) {
      console.log("Error fetching portfolio data:", error);
    } finally {
      dispatch(HideLoading());
    }
  }, [dispatch]);

  useEffect(() => {
    getPortfolioData();
  }, [getPortfolioData]);

  useEffect(() => {
    console.log("Portfolio Data:", portfolioData);
  }, [portfolioData]);

  useEffect(() => {
   if (reloadData){
    getPortfolioData();
   }
  }, [reloadData]);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
