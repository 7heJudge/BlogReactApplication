import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import cls from "./ImgMediaCard.module.css";
import {requestDeletePost, toggleIsEdit} from "../../redux/app-reducer";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

export default function ImgMediaCard() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const posts = useSelector(state => state.app.posts);
    const history = useHistory();
    console.log(posts);
    return (
        <div className={cls.wrapper}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => history.push('/addPost')}
            >
                Add new post
            </Button>
            {
                posts && posts.map(post => <Card key={post.id} className={`${classes.root} ${cls.listItem}`}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.body}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => {dispatch(toggleIsEdit(true))}}>
                            <NavLink to={'/edit/' + post.id}>
                                Edit
                            </NavLink>
                        </Button>
                        <Button size="small" color="primary">
                            <NavLink to={'/posts/' + post.id}>
                                Learn More
                            </NavLink>
                        </Button>
                        <Button size="small" color="primary" onClick={() => {
                            dispatch(requestDeletePost(post.id))
                        }}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>)
            }
        </div>
    );
}