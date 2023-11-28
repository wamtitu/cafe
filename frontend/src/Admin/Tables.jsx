import {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {CiEdit} from 'react-icons/ci'
import { useContext } from "react";
import  { Context } from '../context/Context'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {Link, useNavigate} from 'react-router-dom'
import { ApiDomain } from '../utils/utils';



function Tables() {
  const {user} = useContext(Context)
    const navigate = useNavigate();
    const [tables, setTables] = useState([])


    const fetchTables = async () => {
      
      const response = await axios.get(`${ApiDomain}/available-tables`, {
        method: "GET",
        headers: {
           "Authorization": `${user.token}`

        }
      });
      setTables(response.data.data);
      console.log(response.data.data)
   }
   useEffect(()=>{
    fetchTables()
   }, [])


   
    const handleEditClick= ()=>{
      console.log("edited")
    }
     const handleDeleteClick = async (orderID)=>{
      await axios.delete(`${orderID}`)
      setOrders(orders.filter((order) => order.orderID !== orderID));
     }
     const handleAddProduct= () =>{
        navigate('/admin/add-table')
    }

    const columns = [
      { field: 'tableId', headerName: 'ID', width: 100, checkboxSelection: true},
      { field: 'tableNumber', headerName: 'Number', width: 120 },
      { field: 'name', headerName: 'Name', width: 120 },
      { field: 'description', headerName: 'description', width: 150 },
      { field: 'actions', headerName: 'Actions', width: 120, 
        renderCell: (params)=>{
          return(
            <div className="actions">
               <Link to = "/">
               <CiEdit
            className="edit-icon"
            onClick={() => handleEditClick(params.getValue('orderID'))}
          /></Link>
          <RiDeleteBin5Line
            className="delete-icon"
            onClick={() => handleDeleteClick(params.row.orderID)}
          />
            </div>
          )
        } }
      // Add more columns as needed
    ];
   


  return (
    <div style={{ width: '100%',marginTop: '15%' }}>
        {/* <AddTable/> */}
        <button className='add-product' onClick={handleAddProduct}>Add table</button>
      <div className='user-header'>
        <h2> Current Tables: {tables.length}</h2>
      </div>

      <DataGrid className= "orders users" rows={tables} 
      columns={columns} 
      pageSize={5} 
      getRowId={(row) => row.tableId}
      checkboxSelection
      slots={{toolbar: GridToolbar}}
      slotProps={{
        toolbar: {
          showQuickFilter :true,
          quickFilterProps: {debounceMs:500}
        }
      }}
      disableColumnFilter
      disableColumnSelector
      disableDensitySelector
      disableRowSelectionOnClick/>
    </div>
  )
}

export default Tables
