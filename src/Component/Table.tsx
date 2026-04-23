import { useEffect, useMemo, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';
export interface Product {
    Id: any;
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    createdAt: string;
}
export interface TemplateDemoProps {
    productss: Product[];
}
export default function TemplateDemo({ productss ,fresh}: any) {
    const products = useMemo(() => productss ?? [], [productss]);
const [isdeleteOpen, setIsDeleteOpen] = useState(false);
const [id, setId] = useState<string>('');
const [isEditOpen, setIsEditOpen] = useState(false);
let [editData, setEditData] = useState<any>(null);
  
useEffect(() => {
    if (editData) {
        setEditData(editData);  // Populate form fields with old data
    }
}, [editData, isEditOpen]);
    const formatCurrency = (value: number) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };


         const statusBodyTemplate = (product: Product) => {
        return <Tag value={product.stock} severity={getSeverity(product)}></Tag>;
    };

    const getSeverity = (product: Product) => {
        if (product.stock<10) {
            return 'danger';
        }
        else{
            return 'success';
        }
       
    };

    const priceBodyTemplate = (product: Product) => {
        return formatCurrency(product.price);
    };

    const dateBodyTemplate = (product: Product) => {
        if (!product.createdAt) {
            return '-';
        }

        return new Date(product.createdAt).toLocaleString();
    };
                                                     
    const footer = `In total there are ${products ? products.length : 0} products.`;
   
    ;

let del=(id: string)=> {
    setId(id);
setIsDeleteOpen(true);
         }
         let edit=(id:string,data: any)=> {
setIsEditOpen(true);
setId(id);
setEditData(data);
         }


    return <>
             <DeleteProduct isdeleteOpen={isdeleteOpen} onClose={()=>setIsDeleteOpen(false)}  productss={productss} id={id}  fresh={fresh}/>
           <EditProduct isOpen={isEditOpen} onClose={()=>setIsEditOpen(false)}   editData={editData} fresh={fresh} id={id} />
        <div className="card">
            <DataTable value={products}  footer={footer} tableStyle={{ minWidth: '60rem' }}>
              <Column
    header="S.No"
        body={(_rowData: Product, options: { rowIndex: number }) => options.rowIndex + 1}
  />
                <Column field="name" header="Name"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="price" header="Price" body={priceBodyTemplate}></Column>
               
                <Column header="Stock" body={statusBodyTemplate}></Column>
                <Column field="createdAt" header="Created At" body={dateBodyTemplate}></Column>
           
           <Column header="Action" body={(rowData) => <button className="edit-button" onClick={()=>{edit(rowData.id.toString(),rowData)}}>Edit</button>}></Column>
           <Column header="Action" body={(rowData) => <button className="delete-button" onClick={()=>{ del(rowData.id.toString())}}>Delete</button>}></Column>
        
            </DataTable>
        </div>
    </>
}
        