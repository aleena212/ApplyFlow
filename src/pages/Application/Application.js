import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

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

  const [technologies, setTechnologies] = useState([]);

  const [resume, setResume] = useState("");

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
            {/* PERSONAL */}

            {activeStep === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...register("fullName", {
                      required: "Required",
                    })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Email" {...register("email")} />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Phone" {...register("phone")} />
                </Grid>
              </Grid>
            )}

            {/* EDUCATION */}

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

            {/* EXPERIENCE */}

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

            {/* SKILLS */}

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
                  <Controller
                    name="experienceLevel"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
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
                    )}
                  />
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
                  <Controller
                    name="remote"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        }
                        label="Remote"
                      />
                    )}
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

            {/* REVIEW */}

            {activeStep === 4 && (
              <Box>
                <Typography>
                  Name:
                  {formData.fullName}
                </Typography>

                <Typography>
                  Email:
                  {formData.email}
                </Typography>

                <Typography>
                  Job:
                  {formData.jobType}
                </Typography>

                <Typography>
                  Skills:
                  {technologies.join(", ")}
                </Typography>

                <Typography>
                  Resume:
                  {resume}
                </Typography>
              </Box>
            )}

            <Box mt={4}>
              {activeStep > 0 && <Button onClick={prevStep}>Back</Button>}

              <Button
                variant="contained"
                sx={{
                  ml: 2,
                }}
                onClick={handleSubmit(nextStep)}
              >
                {activeStep === 4 ? "Submit" : "Next"}
              </Button>
            </Box>
          </Box>

          <Snackbar open={open}>
            <Alert severity="success">Application Submitted</Alert>
          </Snackbar>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default Application;
