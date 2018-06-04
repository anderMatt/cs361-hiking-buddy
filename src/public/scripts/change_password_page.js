$(document).ready(function() {
    var passwordChangeForm = $('#changePassword');
    var submitBtn = $('#passwordSubmit');

    passwordChangeForm.submit(onPasswordChange);

    function onPasswordChange(event) {
        console.log('Changing password...');
        event.preventDefault();
        submitBtn.prop('disabled', true);

        var formData = passwordChangeForm.serialize();
        window.hikingBuddyApi.updateUserPassword(formData)
            .done(function() {
                submitBtn.prop('disabled', false);
            })
            .fail(function(response) {
                console.log("Error updating password: " + response);
                submitBtn.prop('disabled', false);
            });
    }
});
