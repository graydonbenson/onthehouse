import { useState, useEffect } from 'react';
import { Button, TextField } from "@mui/material";
import { usePostsContext } from '../hooks/usePostsContext';
import { useNavigate } from 'react-router-dom';

const PostForm = ({ initialTitle, initialIngredients, initialDirections, initialTags, initialImageUrl, action }) => {
    const { dispatch } = usePostsContext();
    const navigate = useNavigate();

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
    }, [initialTitle, initialIngredients, initialDirections, initialTags, initialImageUrl]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newPost = {
            title,
            ingredients,
            directions,
            flair: tags,
            image: imageUrl,
            // TODO: change this to dynamic userId when auth implemented
            userId: 'JohnDoe2'
        };
        if (action === 'CREATE') {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            if (!response.ok) {
                setError("Error: " + json.error);
            } else {
                dispatch({ type: 'CREATE_POST', payload: json });
                navigate("/my-recipes");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                InputLabelProps={{
                    shrink: action === 'CREATE' ? false : true,
                }}
                fullWidth
                margin="normal"
                value={title || ''}
                onChange={handleTitleChange}
                required
            />
            <TextField
                label="Ingredients"
                InputLabelProps={{
                    shrink: action === 'CREATE' ? false : true,
                }}
                placeholder="e.g. Tomato, Ginger, Eggs, etc."
                fullWidth
                margin="normal"
                multiline
                value={ingredients || ''}
                onChange={handleIngredientsChange}
                required
            />
            <TextField
                label="Directions to Prepare"
                InputLabelProps={{
                    shrink: action === 'CREATE' ? false : true,
                }}
                placeholder="Step 1."
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={directions || ''}
                onChange={handleDirectionsChange}
                required
            />
            <TextField
                label="Tag(s)"
                InputLabelProps={{
                    shrink: action === 'CREATE' ? false : true,
                }}
                placeholder="e.g. Quick Meal, Greek, Dessert, etc."
                fullWidth
                margin="normal"
                multiline
                value={tags || ''}
                onChange={handleTagsChange}
                required
            />
            <TextField
                label="Add Image URL"
                InputLabelProps={{
                    shrink: action === 'CREATE' ? false : true,
                }}
                type="url"
                placeholder="https://www.linktoimage.com"
                pattern="https://.*"
                fullWidth
                value={imageUrl || ''}
                onChange={handleImageUrlChange}
                required
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 3 }}
                onSubmit={handleSubmit}
            >
                {action === 'CREATE' ? "Create ✨" : "Save Changes"}
            </Button>
            {error &&
                <div>
                    {error}
                </div>
            }
        </form>
    );
}

export default PostForm;