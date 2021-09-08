import React from 'react';
import {Field, Form, Formik} from "formik";
import {requestAddComment} from "../../redux/app-reducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

export default function AddComments() {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const Submit = (values, {setSubmitting, resetForm}) => {
        console.log(values);
        setSubmitting(false);
        dispatch(requestAddComment(postId, values.body, setSubmitting));
        resetForm();
    };
    return (
        <div>
            <Formik initialValues={{body: ''}}
                    onSubmit={Submit}
            >
                {({isSubmitting}) => (
                    <div>
                        <Form>
                            <div><Field type="body" name="body" placeholder={"Body"}/></div>
                            <div>
                                <button type="submit" disabled={isSubmitting}>
                                    Add comment
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
}