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
  const [name,setName] = useState("");
  const [firstName, setFirstName] =useState({
    id:0,
    first_name:name
  })


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  // Get request
  let userData = () => {
    axios.get('https://reqres.in/api/users?page=1')
      .then(res => {
        // console.log(res.data)
        // setApiData(res?.data?.data)
        setApiData(res?.data?.data)
      }).catch(err => {
        alert("something wrong")
      })
    // fetch("https://reqres.in/api/users?page=1")
    // .then(res => res.json())
    // .then(data => setApiData(data))

  }

  // Post Request
 const postData=()=>{
  const url = 'https://reqres.in/api/users';
  axios.post(url,firstName)
  .then((res)=>{
    console.log(res)
  })
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
          apiData.map((item, idx) => {
            return (
              <div style={{ display: "flex" }} key={idx}>
                <Button variant="outlined"><EditIcon /></Button>
                <List
                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                  aria-label="contacts"
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText inset primary={item.first_name} />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Button variant="outlined"><DeleteIcon /></Button>
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
              Name: <input type="text" onChange={(e)=>setName(e.target.value)} style={{ height: "50px", fontSize: "20px", outline: "none", borderRadius: "10px" }} placeholder="Enter name" />
              <Button onClick={postData} style={{ marginLeft: "132px", marginTop: "20px" }}>Create user <AddCircleOutlineIcon /></Button>
            </form>

          </Box>
        </Modal>
      </div>

    </>
  )
}
export default NavigationBar;