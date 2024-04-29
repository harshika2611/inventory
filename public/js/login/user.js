async function submitbtn() {
  try {
    const data = formData('form');

    const loginValidation = loginFormValidation(data);

    if (Object.keys(loginValidation).length > 0) {
      //----client side validation error
      errorShow(loginValidation);
    } else {
      const response = await fetch('/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status == 200) {
        window.location = `/dashboard`;
      }
      if (response.status == 401) {
        error = 'invalid email or password';
        document.getElementById('main_err').innerHTML = error;
      }
      if (response.status == 404) {
        error = 'user not exist';
        document.getElementById('main_err').innerHTML = error;
      }
      if (response.status == 403) {
        error = 'Password was expired Kindly go through forgot Password';
        document.getElementById('expire').innerHTML = error;
      }
      if (response.status === 400) {
        const errorObject = await response.json();

        errorShow(errorObject);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
