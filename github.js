class Github {
    constructor() {
        this.client_id = '6d9f8d58e96955d71682';
        this.client_secret = '9a16eab6a6990b0b7c8ba0848206b30f9a8f2564';
        // this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }
    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id${this.client_id}&client_secret=${this.client_secret}`);
        // const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id${this.client_id}&client_secret=${this.client_secret}`);
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?sort=${this.repos_sort}&client_id${this.client_id}&client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }
}
