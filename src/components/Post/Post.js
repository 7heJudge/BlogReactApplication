import {useParams, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, makeStyles} from "@material-ui/core";
import {Preloader} from "../../common/Preloader/Preloader";
import {useEffect} from "react";
import {requestComments} from "../../redux/app-reducer";
import CustomizedAccordions from "../CustomizedAccordions/CustomizedAccordions";
import AddComments from "../AddComments/AddComments";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function Post() {
    const posts = useSelector(state => state.app.posts);
    console.log(posts);
    const classes = useStyles();
    const {postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(requestComments(postId));
    }, [postId])
    if (!posts) {
        return <Preloader />
    }
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => history.push('/')}
            >
                Back
            </Button>
            Post title: {posts[postId - 1].title}
            <Container maxWidth="sm">
                {posts[postId - 1].body}
            </Container>
            <CustomizedAccordions/>
            <AddComments/>
        </div>
    );
};

export default Post;