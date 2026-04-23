import "../App.css";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useState, type ChangeEvent, type MouseEvent } from "react";
function AddProduct({
  isOpen,
  onClose,
  fresh

}: {
  isOpen: boolean;
  onClose: () => void;
  fresh: () => void;
}   ) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!formData.name || !formData.description || formData.price <= 0 || formData.stock < 0) {
      alert("Please fill in all fields correctly.");
      return;
    }
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7178/api/product", formData);
      console.log("Product added:", response.data);
      setFormData({
        name: "",
        description: "",
        price: Number(0),
        stock: Number(0),
      })
      fresh?.();
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={() => onClose()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="heading ">Add New Product</h2>
        <form>
          <div className="form-group input-group">
            <InputText
              id="name"
              name="name"
              required
              className="input"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="name" className="formcontentheading">
              Name:
            </label>
          </div>
          <div className="form-group input-group">
            <InputText
              id="description"
              name="description"
              required
              className="input"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <label htmlFor="description" className="formcontentheading">
              Description:
            </label>
          </div>
          <div className="form-group input-group">
            <InputText
              type="number"
              id="price"
              name="price"
              required
              className="input"
              placeholder="Price"
              value={formData.price.toString()}
              onChange={handleChange}
            />
            <label htmlFor="price" className="formcontentheading">
              Price:
            </label>
          </div>
          <div className="form-group input-group">
            <InputText
              type="number"
              id="stock"
              name="stock"
              required
              className="input"
              placeholder="Stock"
              value={formData.stock.toString()}
              onChange={handleChange}
            />
            <label htmlFor="stock" className="formcontentheading">
              Stock:
            </label>
          </div>
        </form>
        <div className="button-group">
          <button onClick={onClose} className="Cancel-button">
            Cancel
          </button>
          <button
            type="submit"
            className="Submit-but"
            onClick={(e) => handleSubmit(e)}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddProduct;
