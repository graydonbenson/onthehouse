import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";
import { Tooltip } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const RecipeCard = ({ postId, userId, title, date, image, ingredients, directions, upvoteCount }) => {
    const [expanded, setExpanded] = useState(false);
    const [data, setData] = useState([]);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_DEPLOYED_API_URL}/posts/${postId}`);
            const json = await response.json();
            if (response.ok) {
                setData(json);
            } else {
                console.log("did not work")
            }
        }

        fetchData();
    }, [postId]);

    function handleLikeClick() {
        setLike(true);
        setDislike(false);
    }

    function handleDislikeClick() {
        setLike(false);
        setDislike(true);
    }

    return (
        <Card sx={{ maxWidth: 345, color: "black", backgroundColor: "#f5c589", borderRadius: "20px", boxShadow: 20, textAlign: "left" }}>
            {data && <>
                <CardHeader
                    avatar={
                        <Tooltip title={userId}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{userId.charAt(0)}</Avatar>
                        </Tooltip>
                    }
                    title={<Typography variant="body1" sx={{fontWeight: "bold", fontFamily: "unset", fontStyle: "oblique"}}>{title}</Typography>}
                    subheader={<Typography variant="">{new Date(date._seconds * 1000).toDateString()}</Typography>}
                />
                <Link to={`/post/${postId}`}>
                    <CardMedia
                        component="img"
                        height="194"
                        image={image}
                        alt=""
                    />
                </Link>
                <CardContent>
                    <Typography color="black" variant="subtitle2" sx={{fontWeight: "bold"}}>
                        {ingredients}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Upvote Recipe">
                        <ThumbUpIcon onClick={handleLikeClick} style={{ color: like ? 'blue' : 'inherit' }} />
                    </IconButton>
                    {upvoteCount}
                    <IconButton aria-label="Downvote Recipe">
                        <ThumbDownIcon onClick={handleDislikeClick} style={{ color: dislike ? 'red' : 'inherit' }} />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded} 
                        aria-label="Show More"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography color="black" variant="" sx={{fontSize: 18}}
                            style={{
                                textAlign: 'left',
                                whiteSpace: 'pre-wrap'
                            }}
                        >{directions}</Typography>
                    </CardContent>
                </Collapse>
            </>}
        </Card>
    )
}

export default RecipeCard;