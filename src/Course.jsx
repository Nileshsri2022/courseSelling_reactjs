import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography } from '@mui/material';
function Course() {
  console.log('hit there from Course');
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    console.log('inside useEffecct');
    axios
      .get('http://localhost:3000/admin/course/' + courseId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setCourse(res.data.course);
      });
  }, []);

  console.log('=>' + course);
  if (!course) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>

        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </div>
  );
  function GrayTopper({ title }) {
    return (
      <div
        style={{
          height: 250,
          background: '#212121',
          top: 0,
          width: '100vw',
          zIndex: 0,
          marginBottom: -250,
        }}
      >
        <div
          style={{
            height: 250,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <Typography
              style={{ color: 'white', fontWeight: 600 }}
              variant="h3"
              textAlign={'center'}
            >
              {title}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
  function UpdateCard({ course, setCourse }) {
    console.log('hi there from UpdateCard');
    const [title, setTitle] = useState(course.title);
    const [image, setImage] = useState(course.imageLink);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant={'outlined'} style={{ width: 600, padding: 20 }}>
          <TextField
            value={title}
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            size={'large'}
            variant="contained"
            onClick={async () => {
              console.log('button clicked');
              console.log("_id=>"+course._id);
              await axios.put(
                'http://localhost:3000/admin/courses/' + course._id,
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price: price,
                },
                {
                  headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
                }
              );
              let updatedCourse = {
                _id: course._id,
                title: title,
                description: description,
                imageLink: image,
                price: price,
              };
              console.log(updatedCourse);
              setCourse(updatedCourse);
            }}
          >
            Update course
          </Button>
        </Card>
      </div>
    );
  }

  function CourseCard(props) {
    console.log('hi there from CourseCard');
    return (
      <div>
        <Card
          style={{
            margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2,
          }}
        >
          <img src={course.imageLink} alt="" style={{ width: 300 }} />
          <div style={{ marginLeft: 10 }}>
            <Typography variant="h6" textAlign={'center'}>
              {props.course.title}
            </Typography>
            <Typography variant="subtitle2" style={{ color: 'grey' }}>
              Price
            </Typography>
            <Typography variant="subtitle1">Rs.{props.course.price}</Typography>
          </div>
        </Card>
      </div>
    );
  }
}
export default Course;

// when update course is clicked the three components get render that is UpdateCard,CourseCard and Course because const [courses, setCourses] = useState([]); is defined in Top level(parent)which is not good
// State management lib Redux,Recoil,Zustand

// https://gist.github.com/Nileshsri2022/c7627ff15524ba18fa4a6677aea9dd2e
