import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import "../AddProduct/AddProduct.css";
import { useParams } from 'react-router-dom';


const EditProduct = () => {
  const [car, setCar] = useState(null);
    const [formData, setFormData] = useState({ 
    name: '',
    car_brand: '',
    description: " ",
    vehicule_category: {
      title: ''
    } ,
    files: [],
  });
  const [categories, setCategories] = useState([]);

  const params = useParams();
	const getByIdUrl = `${import.meta.env.VITE_API_URL}/productos/${params.id}`;
  const patchUrl = `${import.meta.env.VITE_API_URL}/productos/${params.id}`;
  const categoryUrl = `${import.meta.env.VITE_API_URL}/categorias`;

  const getCarById = async () => {
    try {
      const response = await axios.get(`${getByIdUrl}`);
      setCar(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error al obtener el auto:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      vehicule_category: {
        ...formData.vehicule_category,
        title: e.target.value,
        id: null
      }
    });
    e.target.value
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      files: Array.from(files),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let newFormData = new FormData();
        newFormData.append('name', formData.name)
        newFormData.append('car_brand', formData.car_brand)
        newFormData.append('description', formData.description)
        newFormData.append('vehicule_category.title', formData.category)
        newFormData.append("addedFeatures", car.addedFeatures);
        console.log(formData);
        console.log(car);
        const response = await axios({
          method: 'PATCH',
          url: patchUrl, 
          body: formData,
          headers: {
          "Content-Type": "multipart/form-data",
        }});
        console.log('Auto modificado:', response.data);
      } catch (error) {
        console.error('Error al modificar el auto:', error);
      }
    };

  useEffect(() => {
    getCarById();
    axios.get(categoryUrl).then(res => {
      setCategories(res.data);
    });

  }, [])

  return (
    <div>        
        {car &&(
            <form onSubmit={handleSubmit} className="addCarForm">
          <input
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="carBrand"
            value={formData?.car_brand}
            onChange={handleInputChange}
          />
          <textarea
            type="text"
            name="description"
            value={formData?.description}
            onChange={handleInputChange}
          />
          <select
            name="category"
            onChange={handleCategoryChange}>
              <option>{formData?.vehicule_category.title}</option>
          {categories.map(category => (
            <option key={category.id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
          <button type="submit">Guardar Cambios</button>
          </form>
        )}
      </div>
    );
  };
  

export default EditProduct
