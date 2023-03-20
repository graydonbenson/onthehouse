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

export const RecipeCard = ({ postId }) => {

  const [expanded, setExpanded] = useState(false);
  const [data, setData] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://us-central1-seng-401-on-the-house.cloudfunctions.net/api/posts/${postId}`);
      const json = await response.json();
      if (response.ok) {
        setData(json);
      } else {
        console.log("did not work")
      }
    }

    fetchData();
  }, [postId]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      {data && <>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">{data.userId?.substring(0, 1)}</Avatar>
          }
          title={data.title}
          subheader={new Date(data.date?._seconds * 1000).toLocaleDateString("en-US")}
        />
        <Link to={`/post/${data.postId}`}>
          <CardMedia
            component="img"
            height="194"
            image={data.image}
            alt=""
          />
        </Link>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.ingredients}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Upvote Recipe">
            <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="Downvote Recipe">
            <ThumbDownIcon />
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
            <Typography paragraph>{data.directions}</Typography>
          </CardContent>
        </Collapse>
      </>}
    </Card>
  )
}

export default RecipeCard;