import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Card } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card variant={'outlined'} style={{ width: 400, padding: 20 }}>
        <TextField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          variant="outlined"
        />

        <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth={true}
          label="Description"
          variant="outlined"
        />
        <TextField
          onChange={(e) => {
            setImage(e.target.value);
          }}
          fullWidth={true}
          label="Image Link"
          variant="outlined"
        />
        <TextField
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
            await axios
              .post(
                'http://localhost:3000/admin/courses',
                {
                  title: title,
                  description: description,
                  imageLink: image,
                  published: true,
                  price,
                },
                {
                  headers: {
                    // this line is important otherwise worng output
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                  },
                }
              );alert("course added")

          }}

        >
          Add course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
