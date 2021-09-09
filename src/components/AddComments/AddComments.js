import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {requestAddComment} from "../../redux/app-reducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {Button, makeStyles, TextField} from "@material-ui/core";
import cls from "./AddComments.module.css";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function AddComments() {
    const [comment, setComment] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const {postId} = useParams();
    const Submit = (values, {setSubmitting, resetForm}) => {
        setSubmitting(false);
        dispatch(requestAddComment(postId, comment));
        resetForm();
    };
    const onCommentChange = (e) => {
        setComment(e.currentTarget.value);
    }
    return (
        <div>
            <Formik initialValues={{body: ''}}
                    onSubmit={Submit}
            >
                {({isSubmitting}) => (
                    <div>
                        <Form>
                            <div className={cls.field}>
                                <TextField id="outlined-basic" label="Body"
                                           variant="outlined" name="body"
                                           required
                                           value={comment}
                                           onChange={onCommentChange}/>
                            </div>
                            <div className={cls.btnAdd}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon/>}
                                    type="submit" disabled={isSubmitting}
                                >
                                    Add comment
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}