const patterns = {
  textOnly: '^[a-zA-Z\\s]+$',
  numberOnly: '^\\d+$',
  email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  date: '^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$',
};

// Pattern Field is optional
const validation = {
  firstname: {
    required: true,
    pattern: patterns.textOnly,
  },
  lastname: {
    required: true,
    pattern: patterns.textOnly,
  },
  dob: {
    required: true,
    pattern: patterns.date,
    validator: (d) => {
      if (new Date(d) <= new Date()) return true;
      return false;
    },
  },
  email: {
    required: true,
    pattern: patterns.email,
  },
};

function checkValidation(body, validation) {
  const result = [];
  for (let arr of Object.entries(validation)) {
    const field = arr[0];
    const obj = arr[1];

    const value = body[field]?.[0]?.value?.trim();
    if (obj.required) {
      if (!value) {
        result.push({
          status: 'error',
          field,
          message: `${field} is required!`,
        });
      }
    }

    // Note pattern is optional property
    if (obj?.pattern && value) {
      if (!new RegExp(obj.pattern, 'i').test(value)) {
        result.push({
          status: 'error',
          field,
          message: `Invalid input for ${field}!`,
        });
      }
    }

    if (obj?.validator && !obj?.validator(value)) {
      result.push({
        status: 'error',
        field,
        message: `Invalid input for ${field}!`,
      });
    }
  }

  if (result.length > 0) {
    result.forEach((obj) => {
      document.getElementsByName(obj.field)[0].value = '';
      document.getElementsByName(obj.field)[0].required = true;
    });
    return false;
  }

  return true;
}

function validator(e) {
  return checkValidation(
    Object.groupBy(Array.from(e.srcElement), (o) => o.name),
    validation
  );
  return false;
}
