import "../App.css";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
function EditProduct({
    id,
  isOpen,
  onClose,
  fresh,
  editData  

}: {
    id: String;
  isOpen: boolean;
  onClose: () => void;
  fresh: () => void;
editData: {

    name: string;
    description: string;
    price: number;
    stock: number;
  };
}) {
   let [editDatas, setFormData] = useState<any>(editData);
  console.log("editData in EditProduct:", editData);

useEffect(() => {
  if (editData) {
    setFormData(editData);
  }
}, [editData]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...editDatas,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (id :string) => {
   if (!editDatas.name || !editDatas.description || editDatas.price <= 0 || editDatas.stock < 0) {
      alert("Please fill in all fields correctly.");
      return;
    }
   
    try {
      const response = await axios.put(`https://productmanagement-1-y299.onrender.com/api/product/${id}`, editDatas);
      console.log("Product updated:", response.data);
      fresh?.();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={() => onClose()}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="heading ">Edit Product</h2>
        <form>
          <div className="form-group input-group">
            <InputText
              id="name"
              name="name"
              required
              className="input"
              placeholder="Name"
              value={editDatas?.name}
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
              value={editDatas?.description}
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
              value={editDatas?.price.toString()}
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
              value={editDatas?.stock.toString()}
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
            onClick={() => handleSubmit(id.toString())}
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditProduct;
