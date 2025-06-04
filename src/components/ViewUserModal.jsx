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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Grid,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
            <Box sx={{ mt: 4 }}>
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


                <Dialog open={openDialog} onClose={closeModal} maxWidth="sm" fullWidth>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                            {Object.entries(newUser).map(([key, value]) => (
                                <Grid item xs={12} sm={6} key={key}>
                                    <TextField
                                        fullWidth
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        name={key}
                                        value={value}
                                        onChange={(e) => setNewUser({ ...newUser, [key]: e.target.value })}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal}>Cancel</Button>
                        <Button onClick={handleSaveUser} variant="contained">Save</Button>
                    </DialogActions>
                </Dialog>

                <Box backgroundColor="#555" borderRadius="15px" p={2}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>Students:</h3>
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
                                                <MenuItem onClick={() => { alert(JSON.stringify(user, null, 2)); handleMenuClose(); }}>View</MenuItem>
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
