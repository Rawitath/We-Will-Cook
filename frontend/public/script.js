const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('form');

const name_error = document.getElementById('name_error');

const email_error = document.getElementById('email_error');

const pass_error = document.getElementById('pass_error');

form.addEventListener('submit',(e)=>
{  


   var email_check = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

   if(username.value === '' || username.value == null)

   {
      e.preventDefault();
      name_error.innerHTML = "Name is required";
   }


   else
   {
      name_error.innerHTML = "";
   }

   if(!email.value.match(email_check))
   {
      e.preventDefault();
      email_error.innerHTML = "Valid Email is required";

   }


   else
   {
      email_error.innerHTML = "";
   }




   if(password.value.length <= 5)

   {
      e.preventDefault();
      pass_error.innerHTML = "Password must be more than 6 characters";
   }

   else
   {
     pass_error.innerHTML = "";
   }

   if(password.value.length >= 20)

   {
      e.preventDefault();
      pass_error.innerHTML = "Password cannot be more than 20 characters";
   }

   if(password.value === 'password')

   {
      e.preventDefault();
      pass_error.innerHTML = "Password cannot be password";
   }
})