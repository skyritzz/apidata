import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
 stuListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
});

const View = () => {
  
  const classes = useStyles();
  const {id} = useParams();
  //console.log(id);
  const history = useNavigate();
  const [employee, setEmployee] = useState([]);
  
  useEffect(()=>{
    async function getEmployee(){
    try{
        const employee = await axios.get(`http://localhost:3333/data/${id}`)
     //   console.log(employee.data);
        setEmployee(employee.data);

    }catch(e){
        console.log("something wrong");
    }
}
    getEmployee();
}, [id])


function handleClick(){
  history("/")
}

  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
    <Typography variant="h4">Employee Detail</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Salary</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>AGE</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      <TableRow>
       <TableCell align="center">{employee.id}</TableCell>
       <TableCell align="center">{employee.employee_name}</TableCell>
       <TableCell align="center">{employee.employee_salary}</TableCell>
       <TableCell align="center">{employee.employee_age}</TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </TableContainer>
   <Box m={3} textAlign="center">
    <Button variant="contained" color="primary" onClick = {handleClick}>Back to Home</Button>
   </Box>
    </>
  )
}

export default View