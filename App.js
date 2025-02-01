document.addEventListener('DOMContentLoaded', () => {
    const tagCloudContainer = document.querySelector('.tagcloud');

    // GitHub username
    const username = 'RyanCPotts';

    // Fetch repository names from GitHub API
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            const myTags = data.map(repo => ({
                name: repo.name,
                url: repo.html_url
            }));

            // Initialize TagCloud with fetched repository names
            const tagCloud = new TagCloud(tagCloudContainer, myTags.map(tag => tag.name), {
                // options
                radius: 300,
                maxSpeed: 'fast',
                initSpeed: 'normal',
                direction: 135,
                keep: true
            });

            // Add anchor elements to each tag
            const tags = tagCloudContainer.querySelectorAll('.tag');
            tags.forEach((tag, index) => {
                const anchor = document.createElement('a');
                anchor.href = myTags[index].url;
                anchor.target = '_blank';
                anchor.textContent = tag.textContent;
                anchor.className = 'tag';
                tag.replaceWith(anchor);
            });
        })
        .catch(error => console.error('Error fetching repository data:', error));
});