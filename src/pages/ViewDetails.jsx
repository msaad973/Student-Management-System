import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Container,
    Box,
    Avatar,
    Chip,
    Divider,
    Grid,
    Paper,
    IconButton,
    Fade,
    useTheme
} from '@mui/material';
import {
    ArrowBack,
    Email,
    Phone,
    School,
    CalendarToday,
    Person,
    AccountBalance,
    TrendingUp,
    CheckCircle
} from '@mui/icons-material';

const ViewDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const user = location.state?.user;

    // Mock user data for demonstration
    const mockUser = {
        name: "Alex Johnson",
        email: "alex.johnson@university.edu",
        phone: "+1 (555) 123-4567",
        cgpa: "3.85",
        attendance: "92%",
        department: "Computer Science",
        batch: "CS-2024",
        year: "Final Year",
        dues: "$0",
        dob: "March 15, 2002",
        gender: "Non-binary"
    };

    const displayUser = user || mockUser;

    if (!user && !mockUser) {
        return (
            <Container sx={{ mt: 5 }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        borderRadius: 3
                    }}
                >
                    <Typography variant="h6" gutterBottom>No user data found</Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate(-1)}
                        sx={{
                            mt: 2,
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            '&:hover': {
                                background: 'rgba(255,255,255,0.3)'
                            }
                        }}
                    >
                        Back
                    </Button>
                </Paper>
            </Container>
        );
    }

    const getStatusColor = (cgpa) => {
        const gpa = parseFloat(cgpa);
        if (gpa >= 3.7) return 'success';
        if (gpa >= 3.0) return 'warning';
        return 'error';
    };

    const getAttendanceStatus = (attendance) => {
        const percent = parseInt(attendance);
        if (percent >= 90) return { color: 'success', icon: <CheckCircle /> };
        if (percent >= 75) return { color: 'warning', icon: <TrendingUp /> };
        return { color: 'error', icon: <TrendingUp /> };
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* Header Section */}
                    <Box sx={{ mb: 3 }}>
                        <IconButton
                            onClick={() => navigate(-1)}
                            sx={{
                                mb: 2,
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                '&:hover': {
                                    background: 'rgba(255,255,255,0.2)',
                                    transform: 'translateX(-4px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                    </Box>

                    {/* Main Card */}
                    <Card
                        elevation={0}
                        sx={{
                            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                            borderRadius: 4,
                            overflow: 'hidden',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.05)',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '6px',
                                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                            }
                        }}
                    >
                        {/* Profile Header */}
                        <Box
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                p: 4,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: -50,
                                    right: -50,
                                    width: 200,
                                    height: 200,
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(20px)'
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, position: 'relative', zIndex: 1 }}>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        background: 'rgba(255,255,255,0.2)',
                                        backdropFilter: 'blur(10px)',
                                        fontSize: '2rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {displayUser.name.split(' ').map(n => n[0]).join('')}
                                </Avatar>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                                        {displayUser.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        <Chip
                                            label={displayUser.department}
                                            size="small"
                                            sx={{
                                                background: 'rgba(255,255,255,0.2)',
                                                color: 'white',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        />
                                        <Chip
                                            label={displayUser.year}
                                            size="small"
                                            sx={{
                                                background: 'rgba(255,255,255,0.2)',
                                                color: 'white',
                                                backdropFilter: 'blur(10px)'
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Academic Performance */}
                        <CardContent sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                                Academic Performance
                            </Typography>
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={6}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: 3,
                                            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                                            border: '1px solid rgba(255,255,255,0.3)'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                background: 'rgba(255,255,255,0.7)',
                                                display: 'flex'
                                            }}>
                                                <School color="primary" />
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    CGPA
                                                </Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                    {displayUser.cgpa}
                                                </Typography>
                                                <Chip
                                                    label={parseFloat(displayUser.cgpa) >= 3.7 ? 'Excellent' : 'Good'}
                                                    size="small"
                                                    color={getStatusColor(displayUser.cgpa)}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            borderRadius: 3,
                                            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                                            border: '1px solid rgba(255,255,255,0.3)'
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Box sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                background: 'rgba(255,255,255,0.7)',
                                                display: 'flex'
                                            }}>
                                                {getAttendanceStatus(displayUser.attendance).icon}
                                            </Box>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Attendance
                                                </Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                    {displayUser.attendance}
                                                </Typography>
                                                <Chip
                                                    label={parseInt(displayUser.attendance) >= 90 ? 'Excellent' : 'Good'}
                                                    size="small"
                                                    color={getAttendanceStatus(displayUser.attendance).color}
                                                    sx={{ mt: 0.5 }}
                                                />
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Contact Information */}
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Contact Information
                            </Typography>
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                                        <Email color="action" />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Email
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {displayUser.email}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
                                        <Phone color="action" />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {displayUser.phone}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Divider sx={{ my: 3 }} />

                            {/* Additional Details */}
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                                Additional Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Batch
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {displayUser.batch}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Dues
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 500,
                                                color: displayUser.dues === '$0' ? 'success.main' : 'error.main'
                                            }}
                                        >
                                            {displayUser.dues}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Date of Birth
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {displayUser.dob}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            Gender
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                            {displayUser.gender}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Action Button */}
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => navigate(-1)}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                                        },
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Back to List
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Fade>
        </Container>
    );
};

export default ViewDetails;
