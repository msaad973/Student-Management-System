// import React, { useState } from 'react';
// import {
//     Container,
//     Button,
//     Box,
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     IconButton,
//     Menu,
//     MenuItem,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Avatar
// } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// function ViewUser() {
//     const [openDialog, setOpenDialog] = useState(false);
//     const [users, setUsers] = useState([]);
//     const [newUser, setNewUser] = useState({
//         name: '',
//         email: '',
//         attendance: '',
//         dues: '',
//         cgpa: '',
//         dob: '',
//         department: '',
//         phone: '',
//         batch: '',
//         year: '',
//         gender: ''
//     });

//     const [anchorEl, setAnchorEl] = useState(null);
//     const [selectedUserIndex, setSelectedUserIndex] = useState(null);
//     const openMenu = Boolean(anchorEl);

//     const handleMenuClick = (event, index) => {
//         setAnchorEl(event.currentTarget);
//         setSelectedUserIndex(index);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//         setSelectedUserIndex(null);
//     };

//     const handleSaveUser = () => {
//         setUsers([...users, newUser]);
//         closeModal();
//     };

//     const closeModal = () => {
//         setOpenDialog(false);
//         setNewUser({
//             name: '',
//             email: '',
//             attendance: '',
//             dues: '',
//             cgpa: '',
//             dob: '',
//             department: '',
//             phone: '',
//             batch: '',
//             year: '',
//             gender: ''
//         });
//     };

//     return (
//         <Container maxWidth="md" sx={{ mt: 4 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//                 <Button
//                     onClick={() => setOpenDialog(true)}
//                     variant="contained"
//                     sx={{
//                         backgroundColor: '#333',
//                         color: '#fff',
//                         '&:hover': { backgroundColor: '#555' }
//                     }}
//                 >
//                     Add Student
//                 </Button>
//             </Box>

//             {/* Dialog for Adding Student */}
//             <Dialog open={openDialog} onClose={closeModal} maxWidth="sm" fullWidth>
//                 <DialogTitle>Add New Student</DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         {Object.entries(newUser).map(([key, value]) => (
//                             <Grid item xs={12} sm={6} key={key}>
//                                 <TextField
//                                     fullWidth
//                                     label={key.charAt(0).toUpperCase() + key.slice(1)}
//                                     name={key}
//                                     value={value}
//                                     onChange={(e) => setNewUser({ ...newUser, [key]: e.target.value })}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={closeModal}>Cancel</Button>
//                     <Button onClick={handleSaveUser} variant="contained">Save</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Card View for Each User */}
//             <Grid container spacing={3}>
//                 {users.map((user, index) => (
//                     <Grid item xs={12} sm={6} key={index}>
//                         <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
//                             <CardContent>
//                                 <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                                     <Box display="flex" alignItems="center">
//                                         <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
//                                         <Box>
//                                             <Typography variant="h6">{user.name}</Typography>
//                                             <Typography variant="body2" color="text.secondary">{user.email}</Typography>
//                                         </Box>
//                                     </Box>
//                                     <IconButton onClick={(e) => handleMenuClick(e, index)}>
//                                         <MoreVertIcon />
//                                     </IconButton>
//                                 </Box>

//                                 <Grid container spacing={1}>
//                                     <Grid item xs={6}><strong>Phone:</strong> {user.phone}</Grid>
//                                     <Grid item xs={6}><strong>CGPA:</strong> {user.cgpa}</Grid>
//                                     <Grid item xs={6}><strong>Attendance:</strong> {user.attendance}</Grid>
//                                     <Grid item xs={6}><strong>Department:</strong> {user.department}</Grid>
//                                     <Grid item xs={6}><strong>Batch:</strong> {user.batch}</Grid>
//                                     <Grid item xs={6}><strong>Year:</strong> {user.year}</Grid>
//                                     <Grid item xs={6}><strong>Dues:</strong> {user.dues}</Grid>
//                                     <Grid item xs={6}><strong>DOB:</strong> {user.dob}</Grid>
//                                     <Grid item xs={6}><strong>Gender:</strong> {user.gender}</Grid>
//                                 </Grid>
//                             </CardContent>
//                         </Card>

//                         {/* Action Menu */}
//                         <Menu
//                             anchorEl={anchorEl}
//                             open={openMenu && selectedUserIndex === index}
//                             onClose={handleMenuClose}
//                         >
//                             <MenuItem onClick={() => { alert(JSON.stringify(user, null, 2)); handleMenuClose(); }}>View</MenuItem>
//                             <MenuItem onClick={() => { alert(`Editing ${user.name}`); handleMenuClose(); }}>Edit</MenuItem>
//                             <MenuItem onClick={() => {
//                                 const updated = [...users];
//                                 updated.splice(index, 1);
//                                 setUsers(updated);
//                                 handleMenuClose();
//                             }}>Delete</MenuItem>
//                         </Menu>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// }

// export default ViewUser;
