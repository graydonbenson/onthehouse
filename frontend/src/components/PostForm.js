import { useState, useEffect } from 'react';
import { Button, TextField } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

const PostForm = ({ initialTitle, initialIngredients, initialDirections, initialTags, initialImageUrl, action }) => {
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
    }, [initialTitle, initialIngredients, initialDirections, initialTags, initialImageUrl]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (action === 'CREATE') {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const newPost = {
                title,
                ingredients,
                directions,
                flair: tags,
                image: imageUrl,
                // TODO: change this to dynamic userId when auth implemented
                userId: userData.username
            };
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts`, {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                setError("Error: Post could not be created.");
            } else {
                navigate("/my-recipes");
            }
        }
        else if (action === 'UPDATE') {
            const updatedPost = {
                title,
                ingredients,
                directions,
                flair: tags,
                image: imageUrl
            };
            const response = await fetch(`${process.env.REACT_APP_API_URL}/posts/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedPost),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                setError("Error: Post could not be updated.");
            } else {
                navigate("/my-recipes");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                InputLabelProps={{
                    shrink: true
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
                    shrink: true,
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
                    shrink: true,
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
            />
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
            />
            <Button
                type="submit"
                variant="contained"
                color="info"
                sx={{ marginTop: 3, fontStyle: "oblique", fontWeight: "bold" }}
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