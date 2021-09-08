import './App.module.css';
import ImgMediaCard from "./components/ImgMediaCard/ImgMediaCard";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Post from "./components/Post/Post";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {requestPosts} from "./redux/app-reducer";
import SpringModal from "./components/SpringModal/SpringModal";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(requestPosts());
    }, [])
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ImgMediaCard}/>
                <Route path='/posts/:postId' component={Post}/>
                <Route path='/addPost' component={SpringModal}/>
                <Route path='/edit/:postId' component={SpringModal}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;