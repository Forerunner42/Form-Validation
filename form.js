// Regular Expressions to validate form fields

// Ex 1 : Get form and success message elements
const form = document.getElementById('validateForm');
const successMsg = document.getElementById('successMessage');

// Regex all validations
const rePatt = {
    name: /^[A-Za-z\s]+$/,  // Name: letters and spaces only
    username: /^[A-Za-z0-9_]{5,16}$/, // Username: 4-16 characters, letters, numbers, and underscore
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email: standard email format
    phone: /^\d{3}-\d{3}-\d{4}$/, // Phone : XXX-XXX-XXXX
    zipcode: /^\d{5}$/, // Zipcode: 5 digit
    date: /^(0[1-9]|1[0-2])\/(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/\d{4}$/, // Date: MM/DD/YYYY
    creditCard: /^(\d{4}[- ]?){3}\d{4}$|^\d{16}$/ // Credit Card: 16 digits, optional spaces or dashes
}
// console.log(rePatt.name, rePatt.username, rePatt.email, rePatt.phoneNum, rePatt.zipcode, rePatt.date, rePatt.creditCard);


// function to validate a field
function valField(field, regex)
{
    if(!field)
    {
        console.error(`Field with ID ${field.id} not found`);
        return false;
    }

    const value = field.value.trim();
    const errorElmt = document.getElementById(`${field.id}Error`);
    console.log(field.id);

    // Add null check for error element
    if (!errorElmt)
    {
        console.error(`Error element for ${field.id} not found`);
        // Continue without showing error
    }

    // Test the value against the regex pattern
    const isVal = regex.test(value);
    if(isVal)
    {
        errorElmt.style.display = 'none';
    } else {
        errorElmt.style.display = 'block';
    }

    return isVal;
}





function handleSubmit(event)
{
    event.preventDefault();

    // Track if all validation passes
    let isFormVal = true;

    // Validate each field
    for(const fieldId in rePatt)
    {
        const field = document.getElementById(fieldId);
        const isVal = valField(field, rePatt[fieldId]);
        // if any field is invalid, mark the form as invalid

        if(!isVal)
        {
            isFormVal=false;
        }

       /*  if(isVal && field.value.trim() !== '')
        {
            isFormVal = false;
        } */
    } // end of for . . in loop


    // show success message if all validations pass
    if(isFormVal)
    {
        successMsg.style.display = 'block';
    } else {
        successMsg.style.display = 'none';
    }
}

    // Add input event listeners to all fields for real time validation
    for(const fieldId in rePatt)
    {
        const field = document.getElementById(fieldId);
        field.addEventListener('input', function(){
            valField(this, rePatt[fieldId]);
        });
    }

    // Add event listenter for button
    form.addEventListener('submit', handleSubmit);