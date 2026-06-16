import { useState } from "react";

import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

function UserForm() {
  const [name, setName] = useState("");

  const [role, setRole] = useState("");

  const submit = () => {
    alert(
      `Name: ${name}
Role: ${role}`,
    );
  };

  return (
    <Box
      sx={{
        maxWidth: 500,

        mx: "auto",

        mt: 5,

        display: "flex",

        flexDirection: "column",

        gap: 3,
      }}
    >
      <Typography variant="h4">Application Form</Typography>

      <TextField
        label="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Select Role</InputLabel>

        <Select
          label="Select Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <MenuItem value="Frontend">Frontend</MenuItem>

          <MenuItem value="Backend">Backend</MenuItem>

          <MenuItem value="UI/UX">UI / UX</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={submit}>
        Submit
      </Button>
    </Box>
  );
}

export default UserForm;
