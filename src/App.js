import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEarthoOne } from '@eartho/one-client-react';
export default function App() {
  const { isLoading, isConnected, error, user, connectWithPopup, logout } =
    useEarthoOne();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isConnected) {
    return (
      <div className="container-fluid">
        <div>
          <h1>Hello {user.user.displayName}</h1>
          <img src={user.user.photoURL} width={50} height={50} />
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
        <div className="row">
          <div className="col-6" xs="2" style={{ backgroundColor: 'pink' }}>
            <div className="bookmark_form">
              <Formik
                initialValues={{ title: '', link: '' }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <label for="title">Title</label>
                      <Field type="text" name="title" />
                    </div>
                    <div className="row">
                      <label for="link">Link</label>
                      <Field type="text" name="link" />
                    </div>
                    <button type="button">Add</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-6" xs="2" style={{ backgroundColor: 'orange' }}>
            Right
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <button
        className="btn btn-outline-success"
        id="login"
        onClick={() => connectWithPopup({ access_id: 'gHnGmdqszGAjvgW1GPmf' })}
      >
        Log in
      </button>
    );
  }
}
