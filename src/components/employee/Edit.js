import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addStuColor: {
  backgroundColor: green[400],
  color: "white"
 },

});

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const history = useNavigate();
    const [employee, setEmployee] = useState({
        employee_name: "",
        employee_salary: "",
        employee_age: ""
    });

    useEffect(() => {
      async function getEmployee() {
       try {
        const employee = await axios.get(`http://localhost:3333/data/${id}`)
        // console.log(employee.data);
        setEmployee(employee.data);
       } catch (error) {
        console.log("Something is Wrong");
       }
      }
      getEmployee();
     }, [id]);

    function onTextFieldChange(e) {
      setEmployee({
       ...employee,
       [e.target.name]: e.target.value
      })
     }
    
     async function onFormSubmit(e) {
      e.preventDefault()
      try {
       await axios.put(`http://localhost:3333/data/${id}`, employee)
       history("/")
      } catch (error) {
       console.log("Something is Wrong");
      }
     }
     function handleClick() {
      history("/")
     }
    return (
      <>
         <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
    <Typography variant="h2">React CRUD with API Call</Typography>
   </Box>

   <Grid container justify="center" spacing={4}>
    <Grid item md={6} xs={12}>
     <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
      <Typography variant="h4">Edit Employee</Typography>
     </Box>
     <form>
      <Grid container spacing={2}>
       <Grid item xs={12} sm={6}>
        <TextField autoComplete="id" name="id" variant="outlined" required fullWidth id="id" label="ID" autoFocus value = {employee.id} disabled />
       </Grid>
       <Grid item xs={12} sm={6}>
        <TextField 
        autoComplete="employee_name"
        name="employee_name" 
        variant="outlined" 
        required 
        fullWidth 
        id="employee_name" 
        label="Name" 
        value = {employee.employee_name}
        onChange={e => onTextFieldChange(e)} 
        />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="employee_salary"
          name="employee_salary"
          variant="outlined"
          required
          fullWidth id="employee_salary" 
          label="salary" 
          value = {employee.employee_salary}   
          onChange={e => onTextFieldChange(e)}  />
       </Grid>
       <Grid item xs={12}>
        <TextField autoComplete="employee_age"
          name="employee_age"
          variant="outlined"
          required
          fullWidth id="employee_age" 
          label="age" 
          value = {employee.employee_age}   
          onChange={e => onTextFieldChange(e)}  />
       </Grid>
      </Grid>
      <Box m={3}>
       <Button type="button" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)} > Update </Button>
      </Box>
     </form>
     <Box m={3} textAlign="center">
      <Button variant="contained" color="primary"  onClick={handleClick}>Back to Home</Button>
     </Box>
    </Grid>
   </Grid >
      </>
    )
  }
  
  export default Edit