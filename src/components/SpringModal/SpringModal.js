import React from 'react';
import {Field, Form, Formik} from "formik";
import {requestAddPost, requestUpdatePost} from "../../redux/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

export default function SpringModal() {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const history = useHistory();
    const isEdit = useSelector(state => state.app.isEdit);
    const Submit = (values, {setSubmitting, resetForm}) => {
        console.log(values);
        setSubmitting(false);
        if (isEdit) dispatch(requestUpdatePost(postId, values.title, values.body, setSubmitting));
        else dispatch(requestAddPost(values.title, values.body, setSubmitting));
        resetForm();
        history.push('/');
    };
    return (
        <div>
            <Formik initialValues={{title: '', body: ''}}
                    onSubmit={Submit}
            >
                {({isSubmitting}) => (
                    <div>
                        <h1>Add or change post</h1>
                        <Form>
                            <div><Field type="title" name="title" placeholder={"Title"}/></div>
                            <div><Field type="body" name="body" placeholder={"Body"}/></div>
                            <div>
                                <button type="submit" disabled={isSubmitting}>
                                    Add or change
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}