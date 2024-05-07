function startFormButtons () {
    const formContainer = document.querySelector('.form_container');
    const signup = document.querySelector('.signup_form_button');
    const login = document.querySelector(".login_form_button");
    
    signup.addEventListener('click', () => {
        formContainer.classList.add('active');
    })
    
    login.addEventListener('click', () => {
        formContainer.classList.remove('active');
    })
}

function validatePassword(){
    var password = document.querySelector("input[name='passwordField']");
    var confirmPassword = document.querySelector("input[name='confirmPassword']");

    if(password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords don't match");
        alert(password.value);
      } else {
        confirmPassword.setCustomValidity('');
      }
    
    password.onchange = validatePassword;
    confirmPassword.onkeyup = validatePassword;
}