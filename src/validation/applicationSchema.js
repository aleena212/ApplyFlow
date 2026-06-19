import * as yup from "yup";

export const applicationSchema =
yup.object({

fullName:

yup
.string()
.required(
"Full Name required"
),

email:

yup
.string()
.email(
"Invalid Email"
)
.required(
"Email required"
),

phone:

yup
.string()
.matches(
/^[0-9]{11}$/,

"Enter 11 digits"
)
.required(),

university:

yup
.string()
.required(
"University required"
),

degree:

yup
.string()
.required(
"Degree required"
),

cgpa:

yup
.number()
.min(
0
)
.max(
4
),

company:

yup
.string()
.required(),

role:

yup
.string()
.required(),

years:

yup
.number()

});