import { useEffect, useState } from 'react'
import Table, { type Product } from './Table'
import '../App.css'
import AddProduct from './AddProduct'
import FileUploadDialog from './FileUploadDialog';

function Home() {
  
  const [products, setProducts] = useState<Product[]>([
    ]);

      const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
useEffect(() => {
    fetch('https://dashboard.render.com/web/srv-d7kvbb6gvqtc73876mbg/api/product')
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [refresh]); 
  return <>
    <h1 className="H ">Product List</h1> 
    <FileUploadDialog />
  
    <Table productss={products}  fresh={() => setRefresh(!refresh)}/>
 
     

      {/* ── LAYER 1: Product List ── */}
      {/* Add className "blurred" when modal is open */}
      <div className={isOpen ? "  blurred" : " "}>
        <button onClick={() => setIsOpen(true)} className="add-button"> 
          Add Product 
        </button>
      
      </div>
      <AddProduct isOpen={isOpen} onClose={() => setIsOpen(false)} fresh={() => setRefresh(!refresh)}  />

      
  

        </>    
  
          }

export default Home
