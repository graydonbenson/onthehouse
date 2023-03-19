import { useState } from 'react';
import { Button, TextField } from "@mui/material";

const PostForm = ({initialTitle, initialDesc, initialTags, initialImageUrl}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDesc);
    const [tags, setTags] = useState(initialTags);
    const [imageUrl, setImageUrl] = useState(initialImageUrl);

    const handleTitleChange = (event) => setTitle(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    const handleTagsChange = (event) => setTags(event.target.value);
    const handleImageUrlChange = (event) => setImageUrl(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle submit logic here

        console.log(title);
        console.log(description);
        console.log(tags);
        console.log(imageUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                fullWidth
                margin="normal"
                value={title}
                onChange={handleTitleChange}
                required
            />
            <TextField
                label="Ingredients"
                placeholder="e.g. Tomato, Ginger, Eggs, etc."
                fullWidth
                margin="normal"
                multiline
                value={description}
                onChange={handleDescriptionChange}
                required
            />
            <TextField
                label="Directions to Prepare"
                placeholder="Step 1."
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                required
            />
            <TextField
                label="Tag(s)"
                placeholder="e.g. Quick Meal, Greek, Dessert, etc."
                fullWidth
                margin="normal"
                multiline
                value={tags}
                onChange={handleTagsChange}
                required
            />
            <TextField
                label="Add Image URL"
                type="url"
                placeholder="https://www.linktoimage.com"
                pattern="https://.*"
                fullWidth
                value={imageUrl}
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
                Create ✨
            </Button>
        </form>
    );
}

export default PostForm;