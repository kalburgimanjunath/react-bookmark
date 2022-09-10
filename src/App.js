import React, { useEffect, useState } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEarthoOne } from '@eartho/one-client-react';
// import { useAlert } from 'react-alert';

import { Button } from 'reactstrap';
export default function App() {
  // const alert = useAlert();
  const { isLoading, isConnected, error, user, connectWithPopup, logout } =
    useEarthoOne();
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    fetch(
      'https://api.airtable.com/v0/appWToptGxYlLEtgo/Bookmarks?api_key=keyeNXyxxuuYJY19w'
    )
      .then((res) => res.json())
      .then((response) => {
        setBookmarks(response.records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookmarks]);

  const saveData = (data) => {
    const url = `https://api.airtable.com/v0/appWToptGxYlLEtgo/Bookmarks`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer keyeNXyxxuuYJY19w',
      },
      body: JSON.stringify(data),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

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
          <div
            className="col-6 aligncenterdiv"
            xs="2"
            style={{ backgroundColor: 'pink' }}
          >
            <div className="bookmark_form">
              <Formik
                initialValues={{ title: '', link: '' }}
                validate={(values) => {
                  const errors = {};
                  if (!values.title) {
                    errors.title = 'Required';
                  }
                  if (!values.link) {
                    errors.link = 'Required';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    saveData({ fields: values });
                    setSubmitting(false);
                  }, 4000);
                  // alert.show('Oh look, an alert!');
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <label htmlFor="title">Title</label>
                      <Field type="text" name="title" />
                      <ErrorMessage name="title" component="div" />
                    </div>
                    <div className="row">
                      <label htmlFor="link">Link</label>
                      <Field type="text" name="link" />
                      <ErrorMessage name="link" component="div" />
                    </div>
                    <Button
                      title="Add"
                      type="submit"
                      className="primary"
                      disabled={isSubmitting}
                    >
                      Add
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-6" xs="2" style={{ backgroundColor: 'orange' }}>
            {bookmarks &&
              bookmarks.map((item, index) => {
                return (
                  <div
                    className="bookmark-card-item"
                    key={item.fields['title'] + index}
                  >
                    <div>{item.fields['title']}</div>
                    <div>
                      <a href={item.fields['link']}>{item.fields['link']}</a>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="login">
        <h4>Please login to start creating your bookmark links</h4>
        <div>
          <button
            className="btn btn-outline-success"
            id="login"
            onClick={() =>
              connectWithPopup({ access_id: 'gHnGmdqszGAjvgW1GPmf' })
            }
          >
            Log in
          </button>
        </div>
      </div>
    );
  }
}
