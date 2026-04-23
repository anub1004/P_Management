import { useState, type ChangeEvent, type SetStateAction } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Papa from "papaparse";
import axios from "axios";

function FileUploadDialog() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<Record<string, unknown>[]>([]);
   const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    try {
      if (!file) {
        alert("Please select a CSV file first");
           setVisible(false);
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("https://productmanagement-1-y299.onrender.com/api/product/uploadcsv", formData);
      console.log("File uploaded:", response.data);
      setVisible(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
     if (!file) {  setVisible(false); return};
        Papa.parse(file, {
      header: true,
      complete: (results: { data: SetStateAction<Record<string, unknown>[]>; }) => {
        setData(results.data);
      },
    });
  if (file.type !== "text/csv") {
    alert("Only CSV files are allowed");
    setVisible(false);
    return;
  }
setFile(file);
  };
  return (
    <>
     
      <Button label="Upload CSV" onClick={() => setVisible(true)} />

      {/* Dialog Box */}
      <Dialog
        header="Upload File"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <div style={{ textAlign: "center" }}>
        
           <input 
      type="file" 
      accept=".csv" 
      onChange={handleFileChange} 
      className="inputcsv" 
    />
       <table>
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((val, j) => (
                <td key={j}>{String(val ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
          <br /><br />

          <Button
            label="Upload"
            icon="pi pi-check"
            onClick={handleUpload}
          />
        </div>
      </Dialog>
    </>
  );
}

export default FileUploadDialog;