import { Card, Typography } from '@mui/material';
import  Button  from '@mui/material/Button';
import axios from 'axios';
import { useEffect, useState } from 'react';import { useNavigate } from 'react-router-dom';

function Courses() {

  console.log("inside Courses.jsx")
  const [courses, setCourses] = useState([]);

  useEffect(() => {

    console.log("inside useEffect");

    const fetchCourses = async () => {
      try {
        function callback1(response){
        console.log(response.data.courses);
        setCourses(response.data.courses);
        }
        await axios.get("http://localhost:3000/admin/courses/", {
          headers: {
            "Authorization": 'Bearer ' + localStorage.getItem('token'),
          },
        }).then(callback1)

      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
      {/* Courses{JSON.stringify(courses)} */}
      {courses.map((course) =>{
        return <Course course={course} key={Math.random()} />
      })}
    </div>
  );
}
function Course({course}) {
  const navigate=useNavigate()
  return (
    <Card style={{
      margin:10,
      width:300 ,
      minHeight:200
    }}>
{/* here you optional chaining error solve */}
      <Typography variant='h6'textAlign={'center'}>{course?.title}</Typography>
      <Typography variant='h6'textAlign={'center'}>{course?.price}</Typography>

      <Typography textAlign={'center'} variant='p'>{course?.description}</Typography>
      <img src={course?.imageLink} alt="" style={{width:300}}/>
      <div style={{display:"flex",justifyContent:"center",marginTop:20}}
      >
        <Button variant="contained"size="large"
        onClick={()=>{
          navigate("/course/"+course?._id)
        }}>Edit</Button>
      </div>

    </Card>
  );
}
export default Courses;
