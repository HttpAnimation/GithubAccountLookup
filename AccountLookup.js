const form = document.querySelector('form');
const infoDiv = document.querySelector('#info');
const repoDiv = document.querySelector('#repo');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value;

  try {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userInfo.json();
    
    infoDiv.innerHTML = `
      <h2>${userData.login}</h2>
      <p>${userData.bio || 'No bio provided'}</p>
    `;

    const userRepos = await fetch(userData.repos_url);
    const repoData = await userRepos.json();
    
    repoDiv.innerHTML = '';
    repoData.forEach((repo) => {
      const repoName = repo.name;
      const repoURL = repo.html_url;

      const repoLink = document.createElement('a');
      repoLink.href = repoURL;
      repoLink.textContent = `${repoName} (${repoURL})`;

      const repoItem = document.createElement('div');
      repoItem.classList.add('repo-item');
      repoItem.appendChild(repoLink);

      repoDiv.appendChild(repoItem);
    });
  } catch (error) {
    console.error(error);
    infoDiv.innerHTML = `
      <h2>Oops!</h2>
      <p>Something went wrong. Please check your input and try again.</p>
    `;
    repoDiv.innerHTML = '';
  }
});
