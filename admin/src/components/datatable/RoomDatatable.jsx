import React, { useState, useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";


const Datatable = ({columns}) => {
  const location  = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const {data} = useFetch(`/${path}`)

  useEffect(()=>{
      setList(data)
  },[data])

  const handleDelete = async (id, hotelId) =>{
    try{
     await axiosInstance.delete(`/${path}/${id}/${hotelId}`)
    }catch(err){}
    setList(list.filter((item)=>item._id !== id))
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" className="link">
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id, params.row.hotelId)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="userDatatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="addnew">
          Add New
        </Link>
      </div>

      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
