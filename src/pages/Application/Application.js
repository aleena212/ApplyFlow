import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { applicationSchema } from "../../validation/applicationSchema";

import { saveApplication } from "../../services/applicationService";

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

function Application() {
  const navigate = useNavigate();

  const {
    register,

    handleSubmit,

    watch,

    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(applicationSchema),

    defaultValues: {
      jobType: "",

      experienceLevel: "",

      remote: false,
    },
  });

  const formData = watch();

  const [darkMode, setDarkMode] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  const [open, setOpen] = useState(false);

  const [resume, setResume] = useState("");

  const [technologies, setTechnologies] = useState([]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const progress = (activeStep / (steps.length - 1)) * 100;

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      saveApplication({
        ...formData,

        resume,

        skills: technologies,
      });

      setOpen(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleResume = (e) => {
    if (e.target.files[0]) {
      setResume(e.target.files[0].name);
    }
  };

  const toggleSkill = (skill) => {
    setTechnologies((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill],
    );
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

        <Paper sx={{ p: 4 }}>
          <Typography>Application Progress</Typography>

          <LinearProgress variant="determinate" value={progress} />

          <Stepper activeStep={activeStep} sx={{ mt: 3 }}>
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
                    {...register("fullName")}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
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
                    {...register("university")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Degree" {...register("degree")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="CGPA" {...register("cgpa")} />
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Company"
                    {...register("company")}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Role" {...register("role")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Years" {...register("years")} />
                </Grid>
              </Grid>
            )}

            {activeStep === 3 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>

                    <Controller
                      name="jobType"
                      control={control}
                      render={({ field }) => (
                        <Select label="Job Type" {...field}>
                          <MenuItem value="Frontend">Frontend</MenuItem>

                          <MenuItem value="Backend">Backend</MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox onChange={() => toggleSkill("React")} />}
                    label="React"
                  />

                  <FormControlLabel
                    control={<Checkbox onChange={() => toggleSkill("Node")} />}
                    label="Node"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button component="label" variant="outlined" fullWidth>
                    Upload Resume
                    <input hidden type="file" onChange={handleResume} />
                  </Button>
                </Grid>
              </Grid>
            )}

            <Box mt={4}>
              {activeStep > 0 && <Button onClick={prevStep}>Back</Button>}

              <Button
                variant="contained"
                sx={{ ml: 2 }}
                onClick={handleSubmit(nextStep)}
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
    </ThemeProvider>
  );
}

export default Application;
