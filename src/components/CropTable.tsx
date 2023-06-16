import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import stardewService from "../service/stardewService";
import ICrop from "../interface/ICrop";

const columns: GridColDef[] = [
  { field: "Object Id", headerName: "ID" },
  { field: "Name", headerName: "Name" },
  { field: "Price", headerName: "Price" },
  { field: "Edibility", headerName: "Edibility" },
  { field: "Type", headerName: "Type" },
  { field: "Category", headerName: "Category" },
  // { field: "English Name", headerName: "English Name" },
  { field: "Description", headerName: "Description", flex: 1 },
];

export default function CropTable() {
  const [rows, setRows] = useState<ICrop[]>([]);
  useEffect(() => {
    async function getData() {
      const rows = await stardewService.getCrops();
      setRows(rows);
    }
    console.log("getting data");
    getData();
  }, []);
  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <h3>Crop Table Two</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row["Object Id"]}
        density="compact"
      />
    </div>
  );
}
