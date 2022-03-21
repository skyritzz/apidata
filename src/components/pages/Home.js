import { Typography, Box, makeStyles ,Grid,  TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import List from "../employee/List";
import axios from 'axios';
import {useState} from "react";


const useStyles = makeStyles ({
 headingColor: {
  backgroundColor: deepPurple[400],
  color: "white"
 },
 addStuColor: {
 backgroundColor: green[400],
 color: "white"
}

})

const Home = () => {
    const classes = useStyles();
    const [employee, setEmployee] = useState({
        employee_name: "",
        employee_salary: "",
        employee_age: ""

    });
    const [status, setStatus] = useState();

    function onTextFieldChange(e) {
        setEmployee({
         ...employee,
         [e.target.name]: e.target.value
        })
       }

       async function onFormSubmit(e) {
        e.preventDefault()
        try {
         await axios.post(`http://localhost:3333/data`, employee)
         setStatus(true);
        } catch (error) {
         console.log("Something is Wrong");
        }
       }
       if (status) {
        return <Home />
       }
  return (
    <>
        <Box textAlign="center" className={classes.headingColor} p={2} style={{ backgroundColor: "#2196f3" }}>

            <Typography variant="h2">
                REACT CRUD
            </Typography>
        </Box>
        <Grid container justify= "center" spacing = {4}> 
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} className={classes.addStuColor}  style={{ backgroundColor: "#c51162" }} mb={2}>
                        <Typography variant="h4">Add Employee</Typography>
                </Box>
                <form noValidate>
                    <Grid container justify = "center" spacing={2} >
                        <Grid item xs={12} container justify = "center" >
                            <TextField autoComplete="employee_name" name="employee_name"
                            variant="outlined" required  id="employee_name"
                            placeholder = "name"
                            Label="Name"
                            onChange={e => onTextFieldChange(e)}
                            />
                        </Grid>
                        <Grid container justify = "center" item xs={12}>
                            <TextField autoComplete="employee_salary" name="employee_salary"
                            variant="outlined" required fullwidth id="employee_salary"
                            placeholder = "salary"
                            Label="Salary"
                            onChange={e => onTextFieldChange(e)} />
                        </Grid>
                        <Grid container justify = "center" item xs={12}>
                            <TextField autoComplete="employee_age" name="employee_age"
                            variant="outlined" required fullwidth id="employee_age"
                            placeholder = "age"
                            Label="age"
                            onChange={e => onTextFieldChange(e)} />
                        </Grid>
                    </Grid>
                        <Box textAlign="center" m={3}>
                            <Button container justify = "center" type="submit" variant="contained"
                            color="primary" fullwidth onClick={e => onFormSubmit(e)}>Add</Button>
                        </Box>
                </form>
            </Grid> 

        
            <Grid item md={6} xs={12}>
                <List/>
            </Grid>
        </Grid>
    </>
  )
}

export default Home