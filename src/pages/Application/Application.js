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

  skills: "",
  github: "",

  resume: "",
};

function Application() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const [errors, setErrors] = useState({});

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState(initialData);

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

  const validateStep = () => {
    let temp = {};

    if (activeStep === 0) {
      if (!formData.fullName) temp.fullName = "Required";

      if (!formData.email) temp.email = "Required";

      if (!formData.phone) temp.phone = "Required";
    }

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const nextStep = () => {
    if (activeStep < 4) {
      if (validateStep()) {
        setActiveStep(activeStep + 1);
      }
    } else {
      const oldData = JSON.parse(localStorage.getItem("applications")) || [];

      localStorage.setItem(
        "applications",

        JSON.stringify([...oldData, formData]),
      );

      setOpen(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

      setActiveStep(0);

      setFormData(initialData);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box p={5}>
      <Typography variant="h4" mb={4}>
        Job Application
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box mb={4}>
          <Typography fontWeight="bold" mb={1}>
            Application Progress
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 12,
              borderRadius: 5,
            }}
          />

          <Typography mt={1}>{Math.round(progress)}% Completed</Typography>
        </Box>

        <Stepper activeStep={activeStep}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={5}>
          {activeStep === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
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
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth>
                  Upload Resume
                  <input
                    hidden
                    type="file"
                    accept=".pdf"
                    onChange={handleResume}
                  />
                </Button>
              </Grid>

              {formData.resume && (
                <Grid item xs={12}>
                  <Typography>
                    Uploaded:
                    {formData.resume}
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}

          {activeStep === 4 && (
            <Box>
              <Typography variant="h5" mb={3}>
                Review Application
              </Typography>

              <Typography>
                Name:
                {formData.fullName}
              </Typography>

              <Typography>
                Email:
                {formData.email}
              </Typography>

              <Typography>
                University:
                {formData.university}
              </Typography>

              <Typography>
                Company:
                {formData.company}
              </Typography>

              <Typography>
                Skills:
                {formData.skills}
              </Typography>

              <Typography>
                Resume:
                {formData.resume}
              </Typography>
            </Box>
          )}

          <Box mt={5}>
            {activeStep > 0 && <Button onClick={prevStep}>Back</Button>}

            <Button
              variant="contained"
              sx={{
                ml: 2,
              }}
              onClick={nextStep}
            >
              {activeStep === 4 ? "Submit" : "Next"}
            </Button>
          </Box>
        </Box>

        <Snackbar open={open} autoHideDuration={3000}>
          <Alert severity="success">Application Submitted</Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}

export default Application;
