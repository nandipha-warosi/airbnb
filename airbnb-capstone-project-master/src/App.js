import { Route, Routes } from 'react-router-dom';
import "./App.css";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions/userActions';
import DiscoverExperiences from "./components/Home/DiscoverExperiences";
import HeroBanner from "./components/Home/HeroBanner";
import Inspiration from "./components/Home/Inspiration";
import ShopAirBnb from "./components/Home/ShopAirBnb";
import Filter from "./components/Header/Filter";
import ProfileSection from "./components/Header/ProfileSection";
import QuestionsAboutHosting from "./components/Home/QuestionsAboutHosting";
import FutureGetaways from "./components/Home/FutureGetaways";
import Layout from "./components/Footer/Layout";
import Listing from './components/Listing/Listing';
import LoginPage from "./components/Admin/LoginPage";
import CreateListings from "./components/Admin/CreateListings";
import ListingsPage from "./components/ListingsPage";
import LocationFilter from './components/LocationPage/LocationFilter';
import LocationCards from './components/LocationPage/LocationCards';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      dispatch(login(JSON.parse(userInfo)));
    }
  }, [dispatch]);
  
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <ProfileSection />
              <Filter />
              <Layout>
                <HeroBanner />
                <Inspiration />
                <DiscoverExperiences />
                <ShopAirBnb />
                <QuestionsAboutHosting />
                <FutureGetaways />
              </Layout>
            </>
          } 
        />
        
        <Route 
          path="/locations" 
          element={
            <>
              <LocationFilter />
              <LocationCards />
            </>
          } 
        />

        <Route 
          path="/listings" 
          element={
            <>
              <LocationFilter />
              <ListingsPage />
            </>
          } 
        />

        <Route 
          path="/location-details/:id" 
          element={<Listing />} 
        />
        
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        
        <Route 
          path="/createlisting" 
          element={<CreateListings />} 
        />
      </Routes>
    </div>
  );
}

export default App;
