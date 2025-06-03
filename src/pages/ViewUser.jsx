import React, { useState } from 'react';
import {
    Container,
    Button,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddUserModal from '../components/AddUserModal';
import DrawerAppBar from '../components/DrawerAppBar';

function ViewUser() {
    const [openDialog, setOpenDialog] = useState(false);
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        attendance: '',
        dues: '',
        cgpa: '',
        dob: '',
        department: '',
        phone: '',
        batch: '',
        year: '',
        gender: ''
    });

    
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
        setUsers([...users, newUser]);
        closeModal();
    };

    const closeModal = () => {
        setOpenDialog(false);
        setNewUser({
            name: '',
            email: '',
            attendance: '',
            dues: '',
            cgpa: '',
            dob: '',
            department: '',
            phone: '',
            batch: '',
            year: '',
            gender: ''
        });
    };

    return (
        <Container>
            <DrawerAppBar />
            <Box sx={{ mt: 14 }}>
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
                        Add User
                    </Button>
                </Box>

                <AddUserModal
                    open={openDialog}
                    onClose={closeModal}
                    onSave={handleSaveUser}
                    newUser={newUser}
                    setNewUser={setNewUser}
                />

                <Box>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}> Users:</h3>
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
                                                <MenuItem onClick={() => { alert(`Viewing ${user.name}`); handleMenuClose(); }}>View</MenuItem>
                                                <MenuItem onClick={() => { alert(`Editing ${user.name}`); handleMenuClose(); }}>Edit</MenuItem>
                                                <MenuItem onClick={() => {
                                                    const updated = [...users];
                                                    updated.splice(index, 1);
                                                    setUsers(updated);
                                                    handleMenuClose();
                                                }}>Delete</MenuItem>
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
