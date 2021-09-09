import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {requestAddPost, requestUpdatePost, toggleIsEdit} from "../../redux/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import {Preloader} from "../../common/Preloader/Preloader";
import BackButton from "../BackButton/BackButton";
import {Button, makeStyles, TextField} from "@material-ui/core";
import cls from "./SpringModal.module.css"
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function SpringModal() {
    const classes = useStyles();
    const [fieldTitle, setFieldTitle] = useState("");
    const [fieldBody, setFieldBody] = useState("");
    const dispatch = useDispatch();
    const {postId} = useParams();
    const history = useHistory();
    const posts = useSelector(state => state.app.posts);
    const isEdit = useSelector(state => state.app.isEdit);
    const Submit = (values, {setSubmitting, resetForm}) => {
        setSubmitting(false);
        console.log(fieldTitle);
        console.log(fieldBody);
        if (isEdit) dispatch(requestUpdatePost(postId, fieldTitle, fieldBody));
        else dispatch(requestAddPost(fieldTitle, fieldBody));
        resetForm();
        dispatch(toggleIsEdit(false));
        history.push('/');
    };
    if (posts.length === 0) {
        return <Preloader/>
    }
    const onPostChange = (e) => {
        if (e.currentTarget.name === 'title') {
            setFieldTitle(e.currentTarget.value);
        } else {
            setFieldBody(e.currentTarget.value);
        }
    };
    return (
        <div className={cls.centerBlock}>
            <Formik initialValues={{title: '', body: ''}}
                    onSubmit={Submit}
            >
                {({isSubmitting}) => (
                    <div>
                        <BackButton/>
                        {isEdit ? <h1>Edit post</h1> : <h1>Add new post</h1>}
                        <Form autoComplete="off">
                            {isEdit ?
                                <>
                                    <div className={cls.field}><TextField id="outlined-basic" label="Title"
                                                                          variant="outlined" name="title"
                                                                          value={fieldTitle} onChange={onPostChange}
                                                                          required/></div>
                                    <div className={cls.field}><TextField id="outlined-basic" label="Body"
                                                                          variant="outlined" name="body"
                                                                          value={fieldBody} onChange={onPostChange}
                                                                          required/></div>
                                </>
                                :
                                <>
                                    <div className={cls.field}><TextField id="outlined-basic" label="Title"
                                                                          variant="outlined" name="title"
                                                                          onChange={onPostChange} required/></div>
                                    <div className={cls.field}><TextField id="outlined-basic" label="Body"
                                                                          variant="outlined" name="body"
                                                                          value={fieldBody} onChange={onPostChange}
                                                                          required/></div>
                                </>
                            }
                            <div>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon/>}
                                    type="submit" disabled={isSubmitting}
                                >
                                    {isEdit ? "Edit post" : "Add post"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}