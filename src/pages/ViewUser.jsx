import { useState } from 'react';
import {
    AppBar, Toolbar, Typography, Container, Button, Box, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddUserModal from '../components/AddUserModal';
import EditModal from '../components/EditModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, deleteuser, updateuser } from '../redux/slices/userSlice';

function ViewUser() {
    const [openDialog, setOpenDialog] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '', email: '', attendance: '', dues: '',
        cgpa: '', dob: '', department: '', phone: '',
        batch: '', year: '', gender: ''
    });
    const [openEditModal, setOpenEditModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const openMenu = Boolean(anchorEl);

    const dispatch = useDispatch();
    const users = useSelector((state) => state.user);
    const navigate = useNavigate();

    const handleMenuClick = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSaveUser = () => {
        if (!newUser.name || !newUser.email) {
            alert("Name and Email are required.");
            return;
        }

        const userWithId = {
            ...newUser,
            id: Date.now()
        };
        dispatch(adduser(userWithId));
        closeModal();
    };

    const handleDeleteUser = (id) => {
        dispatch(deleteuser(id));
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

    const handleEditSave = (updatedUser) => {
        dispatch(updateuser({ id: selectedUser.id, updatedUser }));
        setOpenEditModal(false);
        setSelectedUser(null);
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#333', mb: 3 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" component="div">
                        Student Management System
                    </Typography>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => navigate('/')}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

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
                            p: 2,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 'bold',
                                color: '#fff',
                                mb: 2,
                                ml: 1
                            }}
                        >
                            Students:
                        </Typography>
                        <TableContainer component={Paper} >
                            <Table>
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Attendance</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>CGPA</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            hover
                                            sx={{ transition: '0.3s', '&:hover': { backgroundColor: '#f9f9f9' } }}
                                        >
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.attendance}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>{user.cgpa}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={(e) => handleMenuClick(e, user)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={openMenu && selectedUser?.id === user.id}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={() => {
                                                        navigate('/view-details', { state: { user } });
                                                        handleMenuClose();
                                                    }}>
                                                        View
                                                    </MenuItem>
                                                    <MenuItem onClick={() => {
                                                        handleMenuClose();
                                                        setSelectedUser(user);
                                                        setOpenEditModal(true);
                                                    }}>
                                                        Edit
                                                    </MenuItem>
                                                    <MenuItem onClick={() => handleDeleteUser(user.id)}>
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

                {selectedUser && (
                    <EditModal
                        open={openEditModal}
                        onClose={() => {
                            setOpenEditModal(false);
                            setSelectedUser(null);
                        }}
                        user={selectedUser}
                        onSave={handleEditSave}
                    />
                )}
            </Container>
        </>
    );
}

export default ViewUser;
