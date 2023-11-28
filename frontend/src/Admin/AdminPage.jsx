import {useState, useEffect} from 'react'
import axios from 'axios'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {CiEdit} from 'react-icons/ci'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import { useContext } from "react";
import  { Context } from '../context/Context'
import AddTable from './AddTable';
import { ApiDomain } from '../utils/utils';



function Orders() {
  const {user} = useContext(Context)
  console.log(user)
    const [orders, setOrders] = useState([])


    const getOrders = async () => {
      
      const response = await axios.get(`${ApiDomain}/reservation`, {
        method: "GET",
        headers: {
           "Authorization": `${user.token}`
        }
      });
      setOrders(response.data);
      console.log(response.data);
   }


    useEffect(()=>{
        getOrders()
    }, [])
    const handleEditClick= ()=>{
      console.log("edited")
    }
     const handleDeleteClick = async (reservation_id)=>{
      await axios.delete(`${ApiDomain}reservation/${reservation_id}`)
      setOrders(orders.filter((order) => order.reservation_id !== reservation_id));
     }

    const columns = [
      { field: 'reservation_id', headerName: 'ID', width: 100, checkboxSelection: true},
      { field: 'username', headerName: 'Name', width: 120 },
      { field: 'email', headerName: 'Email', width: 150 },
      { field: 'tel', headerName: 'Phone', width: 120 },
      { field: 'tableNumber', headerName: 'table', width: 120 },
      { field: 'reservation_date', headerName: 'date', width: 120 },
      { field: 'reservation_time', headerName: 'time', width: 120 },
      { field: 'actions', headerName: 'Actions', width: 120, 
        renderCell: (params)=>{
          return(
            <div className="actions">
               <Link to = "/">
               <CiEdit
            className="edit-icon"
            onClick={() => handleEditClick(params.getValue('reservation_id'))}
          /></Link>
          <RiDeleteBin5Line
            className="delete-icon"
            onClick={() => handleDeleteClick(params.row.reservation_id)}
          />
            </div>
          )
        } }
      // Add more columns as needed
    ];
   


  return (
    <div style={{ width: '100%',marginTop: '10%' }}>
        {/* <AddTable/> */}
      <div className='user-header'>
        <h2> Current Bookings: {orders.length}</h2>
      </div>

      <DataGrid className= "orders users" rows={orders} 
      columns={columns} 
      pageSize={5} 
      getRowId={(row) => row.reservation_id}
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

export default Orders
