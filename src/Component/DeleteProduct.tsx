function DeleteProduct({ isdeleteOpen, id, onClose,fresh}: any) {

  const deleteProduct = async (id: string) => {
    try {
      const response = await fetch(`https://productmanagement-1-y299.onrender.com/api/product/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Product deleted successfully");
        fresh?.();
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      onClose();
    }
  };
 
return (
  <>
    {isdeleteOpen && (
      <div className="overlay" onClick={() => onClose()}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="delete-modal">
            <h2 className="heading">
              Are you sure you want to delete this product?
            </h2>
            <div className="button-container">
              <button
                onClick={() => onClose()}
                className="cancel-button "
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduct(id)}
                className="delete-button"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
}
export default DeleteProduct;
