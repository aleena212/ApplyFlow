import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const steps = ["Personal", "Education", "Experience", "Skills", "Review"];

const initialData = {
  fullName: "",
  email: "",
  phone: "",

  university: "",
  degree: "",
  cgpa: "",

  company: "",
  role: "",
  years: "",

  jobType: "",
  experienceLevel: "",

  technologies: [],

  resume: "",

  remote: false,
};

function Application() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState(initialData);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",

      primary: {
        main: "#8E24AA",
      },

      secondary: {
        main: "#EC407A",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 15,

            padding: "12px",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },
    },
  });

  const progress = (activeStep / (steps.length - 1)) * 100;

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleResume = (e) => {
    if (e.target.files[0]) {
      setFormData({
        ...formData,

        resume: e.target.files[0].name,
      });
    }
  };

  const handleCheckbox = (skill) => {
    setFormData({
      ...formData,

      technologies: formData.technologies.includes(skill)
        ? formData.technologies.filter((item) => item !== skill)
        : [...formData.technologies, skill],
    });
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setOpen(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={5}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h4">Job Application</Typography>

          <Switch
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </Box>

        <Paper
          sx={{
            p: 4,

            boxShadow: 10,
          }}
        >
          <Typography>Application Progress</Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,

              borderRadius: 5,

              mb: 3,
            }}
          />

          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box mt={4}>
            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="University"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="CGPA"
                    name="cgpa"
                    value={formData.cgpa}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Years"
                    name="years"
                    value={formData.years}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 3 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>

                    <Select
                      name="jobType"
                      value={formData.jobType}
                      label="Job Type"
                      onChange={handleChange}
                    >
                      <MenuItem value="Frontend">Frontend</MenuItem>

                      <MenuItem value="Backend">Backend</MenuItem>

                      <MenuItem value="UIUX">UI / UX</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <RadioGroup
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Fresher"
                      control={<Radio />}
                      label="Fresher"
                    />

                    <FormControlLabel
                      value="Experienced"
                      control={<Radio />}
                      label="Experienced"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={12}>
                  <Typography mb={2}>Select Skills</Typography>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.technologies.includes("React")}
                        onChange={() => handleCheckbox("React")}
                      />
                    }
                    label="React"
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.technologies.includes("Node")}
                        onChange={() => handleCheckbox("Node")}
                      />
                    }
                    label="Node"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.remote}
                        onChange={(e) =>
                          setFormData({
                            ...formData,

                            remote: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Open for Remote Work"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload Resume
                    <input hidden type="file" onChange={handleResume} />
                  </Button>
                </Grid>
              </Grid>
            )}

            <Box mt={5}>
              {activeStep > 0 && <Button onClick={prevStep}>Back</Button>}

              <Button variant="contained" sx={{ ml: 2 }} onClick={nextStep}>
                {activeStep === 4 ? "Submit" : "Next"}
              </Button>
            </Box>
          </Box>

          <Snackbar open={open} autoHideDuration={3000}>
            <Alert severity="success">Application Submitted</Alert>
          </Snackbar>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Application;
