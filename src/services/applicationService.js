export const saveApplication=(data)=>{

const applications=

JSON.parse(

localStorage.getItem(
"applications"
)

)||[];

applications.push(data);

localStorage.setItem(

"applications",

JSON.stringify(
applications
)

);

};

export const getApplications=()=>{

return(

JSON.parse(

localStorage.getItem(
"applications"
)

)||[]

);

};