let url = new URL(window.location.href);

function loadPreview(e) {
  let reader = new FileReader();
  reader.readAsDataURL(e.target.files[0]);
  reader.onload = () => {
    document.getElementById('profileImage').src = reader.result;
  };
}

function profileFormValidation(data) {
  let profileError = {};
  const regextext = /^[a-zA-Z\\s]+$/;
  for (let key in data) {
    console.log(key);
    switch (key) {
      case 'firstname':
        if (data[key].length === 0) {
          profileError[key] = '* require';
        } else if (!regextext.test(data[key]) && data[key] !== '') {
          profileError[key] = '* Please valid Firstname';
        } else if (data[key].length < 3 && data[key] !== '') {
          profileError[key] = '* Please valid firstname';
        } else if (data[key].length > 15 && data[key] !== '') {
          profileError[key] = '* Please valid firstname';
        } else {
          delete profileError[key];
        }
        break;
      case 'lastname':
        if (data[key].trim().length === 0) {
          profileError[key] = '* require';
        } else if (!regextext.test(data[key]) && data[key] !== '') {
          profileError[key] = '* Please valid Lastname';
        } else if (data[key].trim().length === 0 && data[key] !== '') {
          profileError[key] = '* Please Enter Lastname';
        } else if (data[key].trim().length < 3 && data[key] !== '') {
          profileError[key] = '* Please valid Lastname';
        } else if (data[key].trim().length > 15 && data[key] !== '') {
          profileError[key] = '* Please valid Lastname';
        } else {
          delete profileError[key];
        }
        break;
      case 'email':
        const regexemail = /^(?!.{51})[a-z0-9-_.+]+@[a-z0-9]+[a-z0-9-.]*\.[a-z0-9]{2,9}/
        if (data[key].trim().length === 0) {
          profileError[key] = '* require';
        } else if (!regexemail.test(data[key]) && data[key] !== '') {
          profileError[key] = '* Please Enter Valid Email';
        } else {
          delete profileError[key];
        }
        break;
      case 'dob':
        const date = /\d{4}-\d{1,2}-\d{1,2}/;
        if (data[key].trim().length === 0) {
          profileError[key] = '* require';
        } else if (!date.test(data[key]) && data[key] !== '') {
          profileError[key] = '* Please Enter Valid date';
        }
        break;
    }
  }
  return profileError;
}

function submitbtn() {
  try {
    const data = formData('form');
    const profileValidation = profileFormValidation(data);
    console.log(data, 'alsp');
    if (Object.keys(profileValidation).length > 0) {
      errorShow(profileValidation);

      // for (let key in profileValidation) {
      //   const test = (document.getElementsByName(`${key}`)[0].value = '');
      // }

      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
}
