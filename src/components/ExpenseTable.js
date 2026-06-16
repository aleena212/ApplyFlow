import { DataGrid } from "@mui/x-data-grid";

const rows=[

{
id:1,
category:"Food",
amount:200
},

{
id:2,
category:"Shopping",
amount:400
},

{
id:3,
category:"Travel",
amount:300
}

];

const columns=[

{
field:"id",
headerName:"ID",
width:100
},

{
field:"category",
headerName:"Category",
width:200
},

{
field:"amount",
headerName:"Amount",
width:150
}

];

function ExpenseTable(){

return(

<div

style={{

height:400,

width:"100%"

}}

>

<DataGrid

rows={rows}

columns={columns}

pageSizeOptions={[2,5]}

initialState={{

pagination:{

paginationModel:{

pageSize:2

}

}

}}

checkboxSelection

disableRowSelectionOnClick

/>

</div>

);

}

export default ExpenseTable;