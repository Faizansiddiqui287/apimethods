import * as React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import { baseURL } from './index'



class Apimethods extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            isOpen: false,
            isOpen1: false,
            isOpen2: false,
            userData: [],
            userName: "",
            job: "",
            editName: "",
            editJob: "",

        };


    }


    // baseURL = 'https://reqres.in';


    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    toggleModal1 = () => {
        this.setState({
            isOpen1: !this.state.isOpen1,
        });
    }
    toggleModal2 = () => {
        this.setState({
            isOpen2: !this.state.isOpen2
        })
    }
    // ------------Function to get all user data--------------------//
    handleUser = async () => {

        try {
            let requestUsers = await fetch(`${baseURL}/api/users?page=2`)
            const res = await requestUsers.json()
            console.log(res.data);
            this.setState({ userData: res.data })
        }
        catch (err) {
            console.log(err)
        }
    }


    //--------------------Function for post method--------------------//
    getValue = (e) => {
        // console.log(e.target.value);
        this.setState({ userName: e.target.value })
    }
    getJobValue = (e) => {
        this.setState({ job: e.target.value })
    }

    handleSubmitData = () => {
        const value = this.state.userName
        const jobDetails = this.state.job
        this.toggleModal();
        axios.post(`${baseURL}/api/users`, {
            name: value,
            job: jobDetails
        }).then((res) => console.log(res))
            .catch((err) => console.log(err))

    }

    //---------------------------Function for PUT Method--------------------//
    getValue1 = (e) => {
        // console.log(e.target.value);
        this.setState({ editName: e.target.value })
    }
    getEditJob = (e) => {
        this.setState({ editJob: e.target.value })
    }
    handleEditData = (id) => {
        const nameValue = this.state.editName;
        const jobValue = this.state.editJob
        this.toggleModal1();
        axios.put(`${baseURL}/api/users/${id}`, {
            name: nameValue,
            job: jobValue,
        })
            .then((res) => {
                console.log(res)

            })
            .catch((err) => console.log(err))
    }



    // -------------------------------Delete Method----------------------------//
    handleDeleteData = (id) => {
        this.toggleModal2();
        axios.delete(`${baseURL}/api/users/${id}`)
            .then((res) => {
                if (res.status === 204) {
                    alert("User is deleted");
                    console.log(res);
                }

            });
    }

    //------------------------Handle Cancel----------------------------------//
    handleCancel = () => {
        this.toggleModal2();
        this.handleUser();
    }





    render() {
        return <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => this.handleUser()}
                style={{ marginTop: 20, marginRight: 20 }}
            >
                Get All user
            </Button>



            <Button
                variant="contained"
                color="primary"
                onClick={() => this.toggleModal('Create User')}
                style={{ marginTop: 20, }}

            >
                Create User
            </Button>


            <Dialog open={this.state.isOpen} onClose={() => this.toggleModal()}>
                <DialogTitle>User Information</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Name"
                        onChange={this.getValue}
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        label="Job"
                        onChange={this.getJobValue}
                        fullWidth
                    />
                    <Button variant="contained" color="primary" onClick={() => this.handleSubmitData()}>
                        Create user
                    </Button>
                </DialogContent>
            </Dialog>


            {/* --------------------------------------Edit Data----------------------------------------------------- */}
            <Dialog open={this.state.isOpen1} onClose={() => this.toggleModal1()}>
                <DialogTitle>User Information</DialogTitle>
                <DialogContent>
                    <TextField
                        variant="outlined"
                        label="Name"
                        onChange={this.getValue1}
                        fullWidth

                    />
                    <TextField
                        variant="outlined"
                        label="Job"
                        onChange={this.getEditJob}
                        fullWidth

                    />
                    <Button variant="contained" color="primary" onClick={() => this.handleEditData()}>
                        Create user
                    </Button>
                </DialogContent>
            </Dialog>
            {/* -------------------------User List--------------------- */}
            <div style={{ marginTop: 50, marginLeft: 250 }}>
                {
                    this.state.userData.map((item) => {
                        return (<>
                            <div style={{ display: "flex", marginTop: 10 }} >
                                <Button variant="outlined" onClick={() => this.toggleModal1('Edit user')} ><EditIcon /></Button>
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

                                {/* ----------------------------------------------------------- */}
                                <Button variant="outlined" onClick={() => this.toggleModal2()} ><DeleteIcon /></Button>
                                <Dialog open={this.state.isOpen2} onClose={() => this.toggleModal2()}>
                                    <DialogTitle>Are you sure ?</DialogTitle>
                                    <DialogContent>
                                        <h5>Do you really want to delete this user data? This can not be undone.</h5>
                                        <Button variant="contained" color="primary" onClick={() => this.handleDeleteData(item.id)} >
                                            Delete
                                        </Button>
                                        <Button variant="text" onClick={() => this.handleCancel()} >Cancel</Button>
                                    </DialogContent>
                                </Dialog>
                                {/* <Button variant="outlined" onClick={() => this.handleDeleteData(item.id)}  ><DeleteIcon /></Button> */}
                                {/* onClick={() => this.handleDeleteData(item.id)} */}
                            </div>
                        </>)
                    })
                }
            </div>



        </>;
    }
}

export default Apimethods;