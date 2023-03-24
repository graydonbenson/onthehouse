import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = ({
  initialTitle,
  initialIngredients,
  initialDirections,
  initialTags,
  initialImageUrl,
  action,
}) => {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState(initialTitle);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [directions, setDirections] = useState(initialDirections);
  const [tags, setTags] = useState(initialTags);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [error, setError] = useState('');

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleIngredientsChange = (event) => setIngredients(event.target.value);
  const handleDirectionsChange = (event) => setDirections(event.target.value);
  const handleTagsChange = (event) => setTags(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);

  useEffect(() => {
    setTitle(initialTitle);
    setIngredients(initialIngredients);
    setDirections(initialDirections);
    setTags(initialTags);
    setImageUrl(initialImageUrl);
  }, [
    initialTitle,
    initialIngredients,
    initialDirections,
    initialTags,
    initialImageUrl,
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (action === 'CREATE') {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const newPost = {
        title,
        ingredients,
        directions,
        flair: tags,
        image: imageUrl,
        // TODO: change this to dynamic userId when auth implemented
        userId: userData.username,
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setError('Error: Post could not be created.');
      } else {
        navigate('/my-recipes');
      }
    } else if (action === 'UPDATE') {
      const updatedPost = {
        title,
        ingredients,
        directions,
        flair: tags,
        image: imageUrl,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/posts/${params.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedPost),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        setError('Error: Post could not be updated.');
      } else {
        navigate('/my-recipes');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        margin="normal"
        value={title || ''}
        onChange={handleTitleChange}
        required
		placeholder="Basic Omelette"
      />
      <TextField
        label="Ingredients"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder=" 2 eggs
		2 tbsp (30 mL) water
		etc."
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={ingredients || ''}
        onChange={handleIngredientsChange}
        required
      />
      <TextField
        label="Directions to Prepare"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder=" Step 1. Whisk eggs, water.
		Step 2. Pour egg mixture in non-stick skillet.
		etc."
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={directions || ''}
        onChange={handleDirectionsChange}
        required
      />
      {/* <TextField
                label="Tag(s)"
                InputLabelProps={{
                    shrink: true,
                }}
                placeholder="e.g. Quick Meal, Greek, Dessert, etc."
                sx={{mb: 3}}
                fullWidth
                margin="normal"
                multiline
                value={tags || ''}
                onChange={handleTagsChange}
                required
            /> */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tag</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tags || ''}
          label="Tag"
          required
          onChange={handleTagsChange}
        >
          <MenuItem value={'Canadian'}>Canadian</MenuItem>
          <MenuItem value={'American'}>American</MenuItem>
          <MenuItem value={'Mexican'}>Mexican</MenuItem>
          <MenuItem value={'Indian'}>Indian</MenuItem>
          <MenuItem value={'Chinese'}>Chinese</MenuItem>
          <MenuItem value={'East Asian'}>East Asian</MenuItem>
          <MenuItem value={'South Asian'}>South Asian</MenuItem>
          <MenuItem value={'South American'}>South American</MenuItem>
          <MenuItem value={'African'}>African</MenuItem>
          <MenuItem value={'Other'}>Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Add Image URL"
        InputLabelProps={{
          shrink: true,
        }}
        type="url"
        placeholder="https://www.linktoimage.com"
        pattern="https://.*"
        fullWidth
        value={imageUrl || ''}
        onChange={handleImageUrlChange}
        required
        sx={{ marginTop: 3 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onSubmit={handleSubmit}
      >
        {action === 'CREATE' ? 'Create ✨' : 'Save Changes'}
      </Button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default PostForm;
