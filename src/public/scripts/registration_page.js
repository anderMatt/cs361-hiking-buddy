$(document).ready(function() {
    var userRegistrationForm = $('#registerUser');
    var submitBtn = $('#registrationSubmit');
    console.log(submitBtn);

    userRegistrationForm.submit(onUserRegistration);

    function onUserRegistration(event) {
        console.log('Registering user...');
        event.preventDefault();
        submitBtn.prop('disabled', true);

        var formData = userRegistrationForm.serialize();
        window.hikingBuddyApi.registerUser(formData)
            .done(function(newUserId) {
                window.location.href(`/profile/${newUserId}`);
            })
            .fail(function(response) {
                alert('Failed to register user! Error: ' + response.responseText);
                submitBtn.prop('disabled', false);
            });
    }
});
