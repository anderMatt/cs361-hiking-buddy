// Included in master layout.
// Exposes HikingBuddyApi object to interact with backend.

(function(window) {
    console.log('main.js loaded');
    window.hikingBuddyApi = window.hikingBuddyApi || new HikingBuddyApi();

    function HikingBuddyApi(){}

    HikingBuddyApi.prototype.registerUser = function(newUserData) {
        var url = "/api/users/register";
        return $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: newUserData
        });
    };
})(window);