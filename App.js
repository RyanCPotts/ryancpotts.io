const fetchRepos = async () => {
    const username = 'RyanCPotts'; // Replace with your GitHub username
    const reposApiUrl = `https://api.github.com/users/RyanCPotts/repos`;

    try {
        const response = await fetch(reposApiUrl);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const reposData = await response.json();
        return reposData.map(repo => repo.name); // Return an array of repo names
    } catch (error) {
        console.error('Error fetching repos:', error);
        return []; // Return empty array if fetch fails
    }
};

// Initialize the tag cloud with dynamic repos
window.onload = async () => {
    console.log("Initializing TagCloud");

    const tagCloudContainer = document.getElementById('tagCloud');

    // Fetch repo names dynamically
    const repos = await fetchRepos();
    if (repos.length === 0) {
        console.error("No repositories found");
        return;
    }

    const options = {
        radius: 200,
        maxSpeed: 'fast',
        initSpeed: 'fast',
        direction: 135,
        keep: true,
        // Customize options like direction and speed
    };

    // Initialize TagCloud with dynamic data
    if (typeof TagCloud === 'function') {
        new TagCloud(tagCloudContainer, repos, options); // Use 'new' to create an instance of the class
    } else {
        console.error("TagCloud library is not loaded correctly.");
    }
};