const patterns = {
  textOnly: '^[a-zA-Z\\s]+$',
  numberOnly: '^\\d+$',
  email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
  date: '^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$',
};

// Pattern Field is optional
const validation = {
  form1: {
    name: {
      required: true,
      pattern: patterns.textOnly,
    },
    date: {
      required: true,
      pattern: patterns.date,
    },
    supplier_id: {
      required: true,
      pattern: patterns.numberOnly,
    },
    amount: {
      required: true,
      pattern: patterns.numberOnly,
    },
    payment_status: {
      required: false,
      pattern: patterns.numberOnly,
    },
  },
  form2: {
    product_id: {
      required: true,
      pattern: patterns.numberOnly,
    },
    unit_price: {
      required: true,
      pattern: patterns.numberOnly,
    },
    quantity: {
      required: true,
      pattern: patterns.numberOnly,
    },
  },
};

function checkValidation(body, validation, special = false) {
  const result = [];
  for (let arr of Object.entries(validation)) {
    const field = arr[0];
    const obj = arr[1];

    const value = body[field]?.trim();
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
  }

  if (special) {
    return result;
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
