import React, { useState } from 'react';
import {
    Container, Button, Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, IconButton,
    Menu, MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddUserModal from '../components/AddUserModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, deleteuser } from '../redux/slices/userSlice';

function ViewUser() {
    const [openDialog, setOpenDialog] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '', email: '', attendance: '', dues: '',
        cgpa: '', dob: '', department: '', phone: '',
        batch: '', year: '', gender: ''
    });

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setSelectedUserIndex(index);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUserIndex(null);
    };

    const handleSaveUser = () => {
        dispatch(adduser(newUser));
        closeModal();
    };

    const handleDeleteUser = (index) => {
        dispatch(deleteuser(index));
        handleMenuClose();
    };

    const closeModal = () => {
        setOpenDialog(false);
        setNewUser({
            name: '', email: '', attendance: '', dues: '',
            cgpa: '', dob: '', department: '', phone: '',
            batch: '', year: '', gender: ''
        });
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        onClick={() => setOpenDialog(true)}
                        variant="contained"
                        sx={{
                            backgroundColor: '#333',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#555' }
                        }}
                    >
                        Add Student
                    </Button>
                </Box>

                <AddUserModal
                    open={openDialog}
                    onClose={closeModal}
                    onSave={handleSaveUser}
                    newUser={newUser}
                    setNewUser={setNewUser}
                />

                <Box 
                    sx={{ 
                        backgroundColor: "#555", 
                        borderRadius: "15px", 
                        p: 2 
                    }}
                >
                    <h3 style={{ 
                        fontSize: '24px', 
                        fontWeight: 'bold', 
                        marginLeft: '10px', 
                        color: '#fff',
                        marginTop: 0,
                        marginBottom: '16px'
                    }}>
                        Students:
                    </h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>CGPA</TableCell>
                                    <TableCell>Attendance</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.cgpa}</TableCell>
                                        <TableCell>{user.attendance}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(e) => handleMenuClick(e, index)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={openMenu && selectedUserIndex === index}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={() => {
                                                    navigate('/view-details', { state: { user: users[selectedUserIndex] } });
                                                    handleMenuClose();
                                                }}>
                                                    View
                                                </MenuItem>
                                                <MenuItem onClick={() => {
                                                    alert(`Editing ${user.name}`);
                                                    handleMenuClose();
                                                }}>
                                                    Edit
                                                </MenuItem>
                                                <MenuItem onClick={() => handleDeleteUser(index)}>
                                                    Delete
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Container>
    );
}

export default ViewUser;