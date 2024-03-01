package com.example.stepelegance.controller.Authentication;

import com.example.stepelegance.Entity.User;

interface UserDataCheck {
    public String CheckRegistrationPageRegulation(User user);// For check every information

    public boolean BothPasswordsMatch(String password1, String password2);// For checking if both password and confirm passwords match.

    public boolean UsernameTaken(String username1);// To check if username is available or not.

    public String FieldEmptyCheck(User user);// To check if any fields are left empty.

    public String DateSelected();// To check if date is left empty.

    public boolean isValidEmail(String email);// To check if given email is a valid email.
}
