import './App.css';
import {useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {increment} from "./redux/app-reducer";

function App({count}) {
    const onHandler = () => {
      increment();
    };
    return (
        <div className="App">
            List of all Posts:
            {count}
            <button onClick={onHandler}>Increment</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        count: state.app.count
    }
}

export default connect(mapStateToProps, {increment})(App);
