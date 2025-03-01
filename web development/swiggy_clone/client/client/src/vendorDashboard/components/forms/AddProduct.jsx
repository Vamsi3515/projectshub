import React from 'react'
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

const AddProduct = () => {
  return (
    <div className="addProductForm">
    <input type="text" name='product-name' placeholder='Product Name' required />
    <input type="number" name='price' placeholder='Price' required />
    <label htmlFor="">Choose Category</label>
    <div className="row-view">
        <input type="checkbox" name='veg' id='veg' value="veg" />
        <label htmlFor="veg">Veg</label>
        <input type="checkbox" name='non-veg' id='non-veg' value="non-veg" />
        <label htmlFor="non-veg">Non-Veg</label>
    </div>
    <label htmlFor="firm-img">Upload Product Image</label>
    <input type="file" accept='.png,.jpeg,.jpg' id='product-img' name='product-img' />
    <FormControlLabel control={<Switch defaultChecked />} label="Best Seller" />
    <textarea name="product-desc" id="product-desc" placeholder='Product Description' rows={5} cols={3}></textarea>
    <Button variant="contained" size="medium" style={{ backgroundColor: "red"  ,marginTop: "30px"}}>
    Submit
    </Button>
</div>
  )
}

export default AddProduct