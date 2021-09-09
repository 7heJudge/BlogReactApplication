import {useHistory} from "react-router-dom";
import {Button, makeStyles} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {toggleIsEdit} from "../../redux/app-reducer";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function BackButton() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const onBackClick = () => {
        history.push('/');
        dispatch(toggleIsEdit(false));
    }
    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onBackClick}
        >
            Back
        </Button>
    );
};

export default BackButton;