import React, { useState } from 'react'
import { Button } from '@mui/material'
import { API_URL } from '../../ApiRoutes/ApiRoute';

const AddFirm = () => {

  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [offer, setOffer] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter(item => item != value));
    }else{
      setCategory([...category, value]);
    }
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if(region.includes(value)){
      setCategory(category.filter(item => item != value));
    }else{
      setRegion([...region, value]);
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      category.forEach(value => {
        formData.append('category', value);
      });
      region.forEach(value => {
        formData.append('region', value);
      });
      formData.append('image', file);

      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        alert("Session expired! Please login again");
      }

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method : 'POST',
        headers: {
          'token': loginToken,
        },
        body: formData
      });

      
      if (response.status === 400) {
        alert("Vendor can have only one firm");
        setFirmName("")
        setArea("")
        setCategory([])
        setRegion([])
        setOffer("")
        setFile(null)
      }

      if (response.ok) {
        alert("Firm added successfully");
        setFirmName("")
        setArea("")
        setCategory([])
        setRegion([])
        setOffer("")
        setFile(null)
      }

    }catch{
      alert("Something went wrong! Try again later");
    }
  };

  return (
    <>
        <form onSubmit={handleSubmit} className='addFirmForm'>
          <input type="text" name='firmname' value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder='Firm Name' required />
          <input type="text" name='area' value={area} onChange={(e)=> setArea(e.target.value)} placeholder='Area' required />
          <label htmlFor="">Choose Category</label>
          <div className="row-view">
              <input type="checkbox" name='veg' id='veg' checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
              <label htmlFor="veg">Veg</label>
              <input type="checkbox" name='non-veg' id='non-veg' checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
              <label htmlFor="non-veg">Non-Veg</label>
          </div>
          <label htmlFor="">Choose Region</label>
          <div className="row-view">
              <input type="checkbox" name='north-indian' id='North-Indian' checked={region.includes('north-indian')} onChange={handleRegionChange} value="north-indian" />
              <label htmlFor="north-indian">North Indian</label>
              <input type="checkbox" name='south-indian' id='South-Indian' checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionChange} />
              <label htmlFor="south-indian">South Indian</label>
              <input type="checkbox" name='chinese' id='Chinese' checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange} />
              <label htmlFor="chinese">Chinese</label>
              <input type="checkbox" name='bakery' id='Bakery' checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange} />
              <label htmlFor="bakery">Bakery</label>
          </div>
          <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)} placeholder='Offer' />
          <label htmlFor="firm-img">Upload Image</label>
          <input type="file" accept='.png,.jpeg,.jpg' id='firm-img' onChange={handleFileUpload} name='firm-img' />
          <Button type='submit' variant="contained" size="medium" style={{ backgroundColor: "red"  ,marginTop: "30px"}}>
          Submit
          </Button>
        </form>
    </>
  )
}

export default AddFirm;