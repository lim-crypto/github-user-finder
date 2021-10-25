class UI {
    constructor() {
        this.profile = document.getElementById('profile');
        this.header = document.getElementById('nav');

    }
    removeLandingPage(){
        this.header.classList.remove("landing-page");
    }
    addLandingPage(){
        this.header.classList.add("landing-page");
    }
    showProfile(user) {
        this.profile.innerHTML = `  
        <aside>
            <div class="user-profile">
                <figure>
                    <img src="${user.avatar_url}" alt="avatar">
                </figure>
                <h1>
                    ${user.name ? `${user.name}` : ''}
                    <span>${user.login}</span>
                </h1>
            </div>

            <a class="btn" href="${user.html_url}" target="_blank"> View Profile in github </a>

            <div class="user-info">
            ${user.bio ? `<div class="bio">${user.bio}</div>` : ''}  
           <div class="follow">
                    <a target="_blank"  href="${user.followers_url}"><span class="icon"><i
                                class="fas fa-user-friends"></i></span><span>${user.followers}</span>followers</a>
                    ·
                    <a target="_blank"  href="${user.following_url}"><span>${user.following}</span>following</a>
                </div>

                <ul class="contacts">
                ${user.location ? `<li><span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                ${user.location}</li>` : ''}
                
                    ${user.twitter_username ? `<li><span class="icon"><i class="fa fa-twitter"></i></span>
                    <a target="_blank"   href="https://twitter.com/${user.blog}">@${user.twitter_username}</a>
                    ${user.twitter_username}</li>` : ''} 

                ${user.blog ? `<li><span class="icon"><i class="fas fa-link"></i></span>
                <a target="_blank"  href="${user.blog}">${user.blog}</a></li>` : ''}
                 
                </ul>
                <div>
                </div>
            </div>


        </aside> 
        <section id="repos"></section> 
      `;
    }

    showRepos(repos) {
        let output = '';



        repos.forEach((repo) => {
            var arr = repo.updated_at.split("-");
            var d = new Date(repo.updated_at) ;
            var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            
            var date=months[d.getMonth()] +" " + d.getDate() ; 
            
            if(new Date().getFullYear()!=d.getFullYear()){
                date +=" "+ d.getFullYear();
            }
            output += `

            <div class="repo">
            <h3 class="repos-name"> <a href="${repo.html_url}" target="_blank">${repo.name}</a> <span>Public</span></h3>
            ${repo.description ? `<p class="repos-description">
            ${repo.description}</p>`: ''} 
            <div>
            ${repo.language ? ` <span class="language"><i class="fas fa-circle"></i>${repo.language}</span>` :''} 
            ${repo.stargazers_count ?`<span class="star"><i class="far fa-star"></i>${repo.stargazers_count}</span>`:'' }
            ${repo.forks_count ?`<span class="fork"><i class="fas fa-code-branch"></i>${repo.forks_count}</span>`:'' }
            ${repo.license ?`<span class="license"><i class="fas fa-balance-scale"></i>${repo.license.name}</span>`:'' } 
            <span> Updated on ${date}</span>

            </div>
        </div>

         
            `;
        });
        document.getElementById('repos').innerHTML = output;
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const nav = document.getElementById('nav');
        // const search = document.querySelector('.search');
        // profile.insertBefore(div, search);
        nav.appendChild(div);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }
    clearProfile() {
        this.profile.innerHTML = '';
    }
}