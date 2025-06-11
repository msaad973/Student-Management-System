
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Toolbar } from '@mui/material';

const AddUserModal = ({  open, onClose, onSave, newUser, setNewUser }) => {
    return (
        <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>Add New Student</DialogTitle>
                <DialogContent dividers>
                    {Object.keys(newUser).map((field) => (
                        <TextField
                            key={field}
                            margin="dense"
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            type={field === 'dob' ? 'date' : 'text'}
                            fullWidth
                            name={field}
                            value={newUser[field]}
                            onChange={(e) => setNewUser({ ...newUser, [field]: e.target.value })}
                            InputLabelProps={field === 'dob' ? { shrink: true } : {}}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onSave} disabled={!newUser.name || !newUser.email} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};
export default AddUserModal;