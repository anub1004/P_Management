import { useEffect, useState } from 'react'
import Table, { type Product } from './Table'
import '../App.css'
import AddProduct from './AddProduct'
import FileUploadDialog from './FileUploadDialog';

function Home() {
  
  const [products, setProducts] = useState<Product[]>([
    ]);
    let api="https://productmanagement-3.onrender.com";

      const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
useEffect(() => {
    fetch(`${api}/api/product`)
      .then(response => response.json())
      .then((data: Product[]) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, [refresh]); 
  return <>
    <h1 className="H ">Product List</h1> 
    <FileUploadDialog  api={api}/>
  
    <Table productss={products}  fresh={() => setRefresh(!refresh)} api={api}/>
 
     

      {/* ── LAYER 1: Product List ── */}
      {/* Add className "blurred" when modal is open */}
      <div className={isOpen ? "  blurred" : " "}>
        <button onClick={() => setIsOpen(true)} className="add-button"> 
          Add Product 
        </button>
      
      </div>
      <AddProduct isOpen={isOpen} onClose={() => setIsOpen(false)} fresh={() => setRefresh(!refresh) } api={api} />

      
  

        </>    
  
          }

export default Home
