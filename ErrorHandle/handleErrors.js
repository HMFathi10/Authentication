const handleError = (error) => {
    let errors = { email: '', password: '' };

    if (error.message == "Incorrect email.") {
        errors.email = "That email is not registered.";
    }
    if (error.message == "Incorrect password.") {
        errors.password = "That password is incorrect.";
    }


    if (error.code == 11000) {
        errors.email = "That email is already exist.";
        return errors;
    }

    if (error.message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors
};

module.exports = { handleError };