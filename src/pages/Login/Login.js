import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

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
          elevation={4}
          sx={{
            width: "900px",
            display: "flex",
            overflow: "hidden",
            borderRadius: 4,
          }}
        >
          {/* Left */}

          <Box
            sx={{
              flex: 1,
              background: "#1976d2",
              color: "white",
              p: 6,
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

            <Typography mt={2}>
              Apply for internships and jobs
              with ease.
            </Typography>
          </Box>

          {/* Right */}

          <Box
            sx={{
              flex: 1,
              p: 5,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={4}
            >
              Login
            </Typography>

            <TextField
              fullWidth
              label="Email"
              margin="normal"
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
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
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
              <FormControlLabel
                control={<Checkbox />}
                label="Remember Me"
              />

              <Link href="#">
                Forgot Password?
              </Link>
            </Box>

            <Button
            variant="contained"
            fullWidth
            sx={{
                mt:3,
                height:50
            }}
            onClick={() =>
                navigate("/dashboard")
                }
                >
                    Sign In
                    </Button>

          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;