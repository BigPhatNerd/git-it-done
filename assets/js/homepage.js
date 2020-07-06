var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoSearchTerm = document.querySelector("#repo-search-term");
var repoContainerEl = document.querySelector("#repos-container");

var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();
    username ? getUserRepos(username) : alert("Please enter a Github username");
    nameInputEl.value = '';
}

userFormEl.addEventListener("submit", formSubmitHandler);

var displayRepos = function(repos, searchTerm) {

    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm;
    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html");

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        repoEl.appendChild(titleEl);
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoContainerEl.appendChild(repoEl);
        repoEl.appendChild(statusEl);
    }
}

var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(data => {
                        displayRepos(data, user);
                    })
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(error => {
            alert("Unable to connect to Github");
        })
}




//