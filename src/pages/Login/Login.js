import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Container,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Link,
  Snackbar,
  Alert,
  Avatar,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  Person,
} from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      remember: false,
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [severity, setSeverity] = useState("success");

  const handleLogin = (data) => {
    const users =
      JSON.parse(
        localStorage.getItem("loggedUsers")
      ) || [];

    const exists =
      users.some(
        (user) =>
          user.email === data.email
      );

    if (exists) {
      setSeverity("warning");

      setMessage(
        "Email already logged in"
      );

      setOpen(true);

      return;
    }

    users.push(data);

    localStorage.setItem(
      "loggedUsers",
      JSON.stringify(users)
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(data)
    );

    setSeverity("success");

    setMessage(
      "Login Successful"
    );

    setOpen(true);

    setTimeout(() => {
      navigate(
        "/dashboard"
      );
    }, 1500);
  };

  return (
    <Container maxWidth="lg">

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <Paper
          elevation={8}
          sx={{
            width: 950,
            display: "flex",
            overflow: "hidden",
            borderRadius: 5,
          }}
        >

          <Box
            sx={{
              flex: 1,
              background:
                "linear-gradient(135deg,#1976d2,#42a5f5)",
              color: "white",
              p: 8,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >

            <Typography
              variant="h2"
              fontWeight="bold"
            >
              ApplyFlow
            </Typography>

            <Typography mt={3}>
              Smart Job Application Portal
            </Typography>

            <Typography mt={2}>
              Track applications,
              manage profiles,
              and apply faster.
            </Typography>

          </Box>

          <Box
            sx={{
              flex: 1,
              p: 6,
            }}
          >

            <Box
              display="flex"
              justifyContent="center"
              mb={3}
            >

              <Avatar
                sx={{
                  width: 70,
                  height: 70,
                }}
              >
                <Person />
              </Avatar>

            </Box>

            <Typography
              variant="h4"
              textAlign="center"
              mb={4}
              fontWeight="bold"
            >
              Welcome Back
            </Typography>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register(
                "email",
                {
                  required:
                    "Email is required",

                  pattern: {
                    value:
                      /^\S+@\S+\.\S+$/,

                    message:
                      "Invalid email",
                  },
                }
              )}
              error={
                !!errors.email
              }
              helperText={
                errors.email?.message
              }
            />

            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              {...register(
                "password",
                {
                  required:
                    "Password required",

                  minLength: {
                    value: 6,

                    message:
                      "Minimum 6 characters",
                  },

                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z]).+$/,

                    message:
                      "Must contain uppercase and lowercase",
                  },
                }
              )}
              error={
                !!errors.password
              }
              helperText={
                errors.password?.message
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">

                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >

                      {showPassword
                        ? <VisibilityOff />
                        : <Visibility />}

                    </IconButton>

                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              mt={1}
            >

              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          field.value
                        }
                        onChange={(e) =>
                          field.onChange(
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Remember"
                  />
                )}
              />

              <Link href="#">
                Forgot Password?
              </Link>

            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
                height: 55,
                fontSize: 18,
              }}
              onClick={
                handleSubmit(
                  handleLogin
                )
              }
            >
              Sign In
            </Button>

          </Box>

        </Paper>

      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() =>
          setOpen(false)
        }
      >

        <Alert severity={severity}>
          {message}
        </Alert>

      </Snackbar>

    </Container>
  );
}

export default Login;