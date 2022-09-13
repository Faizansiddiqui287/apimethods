import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import axios from 'axios';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function NavigationBar() {

  const [apiData, setApiData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newModal, setNewModal] =useState(false);
  const [createNewName, setCreateNewName] =useState("")
  const [getCreatename, setGetCreateName] = useState("");
  const [updateUserName, setUpdateUserName] =useState("")
  const [updateUserData, setUpdateUserData] = useState("")
 


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlemodalOpen = () =>setNewModal(true);
  const handleModalClose = ()=>setNewModal(false);
  
  
  

  const baseURL = 'https://reqres.in'

  // Get request
  let userData = () => {
    axios.get(`${baseURL}/api/users?page=1`)
      .then(res => {
        // console.log(res.data)
        setApiData(res?.data?.data)
      }).catch(err => {
        alert("something wrong")
      })
    // fetch("https://reqres.in/api/users?page=1")
    // .then(res => res.json())
    // .then(data => setApiData(data))

  }

  //Delete data


  // Post Request
  const createName=(e)=>{
    setCreateNewName(e.target.value)
  }
  const createNewUser =()=>{
    setGetCreateName(createNewName);
    // console.log(createNewName)


    axios.post(`${baseURL}/api/users`,{
      name:{getCreatename},
      job: "Developer"
    }).then((res)=> console.log(res))
    .catch((err)=>console.log(err))
  }

//Put request
const updateName = (e)=>{
  setUpdateUserName(e.target.value)
}

const updateNewUser = (id)=>{
  setUpdateUserData(updateUserName)
  console.log(updateUserName)
  axios.put(`${baseURL}/api/users/${id}`,{
    name:{updateUserData},
    job: "Developer"
  })
  .then((res)=>{
    console.log(res)
    userData();
    handleModalClose();
  })
  .catch((err)=>console.log(err))
}


//Delete  
const deleteData = (id)=>{
  axios.delete(`${baseURL}/api/users/${id}`)
  .then((res)=>{
    if(res.status === 204){
      alert("Data deleted");
      userData();
    }
    
  });
 
 

}





  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              API METHODS
            </Typography>
            <Button color="inherit" onClick={userData}>Get All users</Button>
            <Button color="inherit" onClick={handleOpen}>Create New User</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <div className='main-container'>
        {
          apiData.map((item) => {
            return (
              <div style={{ display: "flex" }} >
                <Button variant="outlined" onClick={handlemodalOpen} ><EditIcon /></Button>
                <List
                key={item.id}
                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                  aria-label="contacts"
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText inset primary={item.first_name} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Button variant="outlined" onClick={deleteData} ><DeleteIcon /></Button>
              </div>
            )
          })
        }
      </div>

      {/*----------- Modal for create user------------------ */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              Name: <input type="text" onChange={createName} style={{ height: "50px", fontSize: "20px", outline: "none", borderRadius: "10px" }} placeholder="Enter name" />
              <Button onClick={createNewUser} style={{ marginLeft: "132px", marginTop: "20px" }}>Create user <AddCircleOutlineIcon /></Button>
            </form>

          </Box>
        </Modal>
      </div>

      {/* ---------Modal for update user-------------- */}
      <div>
        <Modal
          open={newModal}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form>
              Name: <input type="text" onChange={updateName} style={{ height: "50px", fontSize: "20px", outline: "none", borderRadius: "10px" }} placeholder="Enter name" />
              <Button onClick={updateNewUser} style={{ marginLeft: "132px", marginTop: "20px" }}>Update Data <AddCircleOutlineIcon /></Button>
            </form>

          </Box>
        </Modal>
      </div>
      
    </>
  )
}
export default NavigationBar;
