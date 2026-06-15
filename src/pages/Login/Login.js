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

const navigate =
useNavigate();

const [showPassword,
setShowPassword]=
useState(false);

const [open,
setOpen]=
useState(false);

const [message,
setMessage]=
useState("");

const [severity,
setSeverity]=
useState("success");

const [loginData,
setLoginData]=
useState({

email:"",
password:"",

});

const handleChange=
(e)=>{

setLoginData({

...loginData,

[e.target.name]:
e.target.value,

});

};

const handleLogin=()=>{

if(
!loginData.email ||
!loginData.password
){

setSeverity(
"error"
);

setMessage(
"Fill all fields"
);

setOpen(true);

return;

}

const users=
JSON.parse(
localStorage.getItem(
"loggedUsers"
)
)||[];

const exists=
users.some(

(user)=>

user.email ===
loginData.email

);

if(
exists
){

setSeverity(
"warning"
);

setMessage(
"Email already logged in"
);

setOpen(true);

return;

}

users.push(
loginData
);

localStorage.setItem(

"loggedUsers",

JSON.stringify(
users
)

);

localStorage.setItem(

"currentUser",

JSON.stringify(
loginData
)

);

setSeverity(
"success"
);

setMessage(
"Login Successful"
);

setOpen(true);

setTimeout(()=>{

navigate(
"/dashboard"
);

},1500);

};

return(

<Container maxWidth="lg">

<Box
sx={{
height:"100vh",
display:"flex",
alignItems:"center",
justifyContent:"center",
}}
>

<Paper
elevation={8}

sx={{
width:950,
display:"flex",
overflow:"hidden",
borderRadius:5,
}}
>

<Box
sx={{
flex:1,

background:
"linear-gradient(135deg,#1976d2,#42a5f5)",

color:"white",

p:8,

display:"flex",

justifyContent:"center",

flexDirection:"column",
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
flex:1,
p:6,
}}
>

<Box
display="flex"
justifyContent="center"
mb={3}
>

<Avatar
sx={{
width:70,
height:70,
}}
>

<Person/>

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

name="email"

margin="normal"

value={
loginData.email
}

onChange={
handleChange
}
/>

<TextField
fullWidth

label="Password"

name="password"

margin="normal"

value={
loginData.password
}

onChange={
handleChange
}

type={
showPassword
?
"text"
:
"password"
}

InputProps={{

endAdornment:(

<InputAdornment
position="end"
>

<IconButton
onClick={()=>

setShowPassword(

!showPassword

)

}
>

{
showPassword
?

<VisibilityOff/>

:

<Visibility/>

}

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
control={
<Checkbox/>
}
label="Remember"
/>

<Link href="#">

Forgot Password?

</Link>

</Box>

<Button
variant="contained"

fullWidth

sx={{
mt:4,
height:55,
fontSize:18,
}}

onClick={
handleLogin
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

onClose={()=>
setOpen(false)
}
>

<Alert
severity={
severity
}
>

{
message
}

</Alert>

</Snackbar>

</Container>

);

}

export default Login;