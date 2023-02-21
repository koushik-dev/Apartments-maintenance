import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

export const Table: React.FC<{
  rows: any[];
  columns: GridColDef[];
  rowId?: string;
}> = ({ rows, columns, rowId }) => {
  return (
    <DataGrid
      sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
      {...{ rows, columns }}
      getRowId={(d) => (rowId ? d[rowId] : d.flat)}
      hideFooter
    />
  );
};
