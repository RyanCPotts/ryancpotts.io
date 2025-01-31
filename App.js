document.addEventListener('DOMContentLoaded', () => {
    const tagCloudContainer = document.querySelector('.tagcloud');

    // GitHub username
    const username = 'RyanCPotts';

    // Fetch repository names from GitHub API
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            const myTags = data.map(repo => repo.name);

            // Initialize TagCloud with fetched repository names
            new TagCloud(tagCloudContainer, myTags, {
                // options
                radius: 300,
                maxSpeed: 'fast',
                initSpeed: 'normal',
                direction: 135,
                keep: true
            });
        })
        .catch(error => console.error('Error fetching repository data:', error));
});