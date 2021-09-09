import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "@material-ui/core";
import {Preloader} from "../../common/Preloader/Preloader";
import {useEffect} from "react";
import {requestComments} from "../../redux/app-reducer";
import CustomizedAccordions from "../CustomizedAccordions/CustomizedAccordions";
import AddComments from "../AddComments/AddComments";
import BackButton from "../BackButton/BackButton";

function Post() {
    const posts = useSelector(state => state.app.posts);
    const {postId} = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestComments(postId));
    }, [postId])
    if (posts.length === 0) {
        return <Preloader/>
    }
    return (
        <div>
            <BackButton/>
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