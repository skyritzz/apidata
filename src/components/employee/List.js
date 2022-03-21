import { Typography, Box, makeStyles ,TableContainer,
    Table, TableBody, TableCell, TableHead, TableRow, Paper,
    IconButton, Tooltip } from "@material-ui/core"
    import {orange } from '@material-ui/core/colors';
    import VisibilityIcon from '@material-ui/icons/Visibility';
    import EditIcon from '@material-ui/icons/Edit';
    import DeleteIcon from '@material-ui/icons/Delete';
    import { Link } from "react-router-dom"
    import axios from "axios";
    import { useState, useEffect } from "react";


    
    const useStyles = makeStyles ({
     stulistColor: {
     backgroundColor: orange[400],
     color: "white"
    },
    tableHeadCell: {
     color: "white",
     fontWeight: "bold",
     fontSize: 16
    }
    })


const List = () => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    useEffect(()=>{
        async function getAllEmployee(){
        try{
            const employees = await axios.get("http://localhost:3333/data")
            // console.log(employees.data);
            setEmployees(employees.data);

        }catch(e){
            console.log("something wrong");
        }
    }
        getAllEmployee();
    }, [])

    const handleDelete = async id => {
        await axios.delete(`http://localhost:3333/data/${id}`);
        var newemployee = employees.filter((item) => {
         // console.log(item);
         return item.id !== id;
        })
        setEmployees(newemployee);
       }
      
    
  return (
    <>
                <Box textAlign="center" p={2} className={classes.stulistColor} style={{ backgroundColor: "#311b92" }}>
                        <Typography variant="h4">Student List</Typography>
                </Box>
                <TableContainer >
                        <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#00796b" }}>
                                <TableCell align="center" className={classes.
                                tableHeadCell}>S.N</TableCell>
                                <TableCell align="center" className={classes.
                                tableHeadCell}>Name</TableCell>
                                <TableCell align="center" className={classes.
                                tableHeadCell}>Salary</TableCell>
                                <TableCell align="center" className={classes.
                                tableHeadCell}>Age</TableCell>
                                <TableCell align="center" className={classes.
                                tableHeadCel1}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            employees.map((employees, i)=>{
                                return (
                                    <TableRow key = {i}>
                                            <TableCell align="center">{i+1}</TableCell>
                                            <TableCell align="center">{employees.employee_name}</TableCell>
                                            <TableCell align="center">{employees.employee_salary}</TableCell>
                                            <TableCell align="center">{employees.employee_age}</TableCell>
                                            <TableCell align="center">
                                            <Tooltip title="View">
                                                    <IconButton><Link to={`/view/${employees.id}`}><VisibilityIcon
                                                    color="primary" /></Link></IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton><Link to={`/edit/${employees.id}`}><EditIcon /></Link></IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDelete(employees.id)}><DeleteIcon color="secondary" /></IconButton>
                                                </Tooltip> 
                                            </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        
                        </TableBody>
                        </Table>
                        </TableContainer>
    </>
  )
}

export default List


