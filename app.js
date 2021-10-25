const github = new Github;
const ui = new UI;
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('blur', search);
searchUser.addEventListener('keypress', function (e) {
    if (13 == e.keyCode || e.key === 'Enter') {
        search(e);
    }
});
function search(e) {
    const userText = e.target.value;

    if (userText !== '') {
        github.getUser(userText)
            .then(data => {
                //    console.log(data); // uncomment to check if the api reach its limit request
                if (data.profile.message === 'Not Found') {
                    //show alert 
                    ui.addLandingPage();
                    ui.clearAlert();
                    ui.clearProfile();
                    ui.showAlert('user not found', 'alert alert-danger');

                } else if (data.profile.message === "API rate limit exceeded for 103.100.136.57. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)") {
                    ui.addLandingPage();
                    ui.clearAlert();
                    ui.clearProfile();
                    ui.showAlert("API rate limit exceeded for 103.100.136.57. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)", 'alert alert-danger');

                } else {
                    //show profile 
                    ui.removeLandingPage();
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            })

    } else {
        //clear profile
        ui.clearProfile();
    }
}