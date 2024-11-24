import { useList, useModal } from "@refinedev/core";
import React from "react";
import { IPhishingAttempt } from "../../../interfaces/phishing-attempt.interface";
import { List, useDataGrid } from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CreateModal from "../modals/create.modal";

export const ListScreen: React.FC = () => {
  const { dataGridProps } = useDataGrid<IPhishingAttempt>({
    resource: "phishing",
  });

  const { visible, close, show } = useModal();

  const columns: GridColDef<IPhishingAttempt>[] = [
    {
      field: "_id",
      headerName: "ID",
      type: "string",
      minWidth: 300,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 300,
      flex: 1,
      filterable: false,
      sortable: false,
      hideable: false,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 0.3,
      filterable: false,
      sortable: false,
      hideable: false,
    },
  ];

  return (
    <>
      <CreateModal visible={visible} close={close} />
      <List canCreate createButtonProps={{ onClick: show }}>
        <DataGrid
          {...dataGridProps}
          getRowId={(row) => row._id}
          columns={columns}
          autoHeight
          hideFooterPagination
        />
      </List>
    </>
  );
};
