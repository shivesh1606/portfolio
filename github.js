// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Wrap each <i> element in a <span> with an alt attribute and a random color
function createIconElement(iconHtml, languageName) {
    const span = document.createElement('span');
    span.innerHTML = iconHtml;
    span.setAttribute('alt', languageName); // Set the alt attribute
    span.style.color = getRandomColor(); // Set a random color
    return span.outerHTML; // Return the HTML as a string
}

// Update iconLinks object
var iconLinks = {
    "CSS": createIconElement(`<i class="fa-brands fa-css3 fa-lg"></i>`, "CSS"),
    "Python": createIconElement(`<i class="fa-brands fa-python fa-lg"></i>`, "Python"),
    "HTML": createIconElement(`<i class="fa-brands fa-html5 fa-lg"></i>`, "HTML"),
    "JavaScript": createIconElement(`<i class="fa-brands fa-js fa-lg"></i>`, "JavaScript"),
    "React": createIconElement(`<i class="fa-brands fa-react fa-lg"></i>`, "React"),
    "Node.js": createIconElement(`<i class="fa-brands fa-node-js fa-lg"></i>`, "Node.js"),
    "GitHub": createIconElement(`<i class="fa-brands fa-github fa-lg"></i>`, "GitHub"),
    "MongoDB": createIconElement(`<i class="fa-brands fa-mongodb fa-lg"></i>`, "MongoDB"),
    "MySQL": createIconElement(`<i class="fa-brands fa-mysql fa-lg"></i>`, "MySQL"),
    "jQuery": createIconElement(`<i class="fa-brands fa-jquery fa-lg"></i>`, "jQuery"),
    "Django": createIconElement(`<i class="fa-brands fa-django fa-lg"></i>`, "Django"),
    "Java": createIconElement(`<i class="fa-brands fa-java fa-lg"></i>`, "Java"),
    "C": createIconElement(`<i class="fa-brands fa-c fa-lg"></i>`, "C")
};


// Settings for GitHub API request
var settings = {
    "url": "https://api.github.com/users/shivesh1606/repos",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Authorization": "token ",
        "Cookie": "logged_in=no"
    },
};

// Function to fetch repositories and store them in localStorage
function fetchAndDisplayRepos() {
    $.ajax(settings).done(function (response) {
        console.log(response);

        // Store response in localStorage
        localStorage.setItem('github_repos', JSON.stringify(response));

        // Call the function to display repos from the fetched data
        displayRepos(response);
    }).fail(function (error) {
        console.error("Error fetching repositories:", error);
    });
}

// Function to display repositories
// Function to display repositories
// Function to display repositories
function displayRepos(repos) {
    var cardsBox = document.getElementById('cards-box');
  
    repos.forEach(function (repo) {
        var card = document.createElement('div');
        card.classList.add('card-container');

        var html_url = repo.html_url;
        var repoName = repo.name;
        var repoDescription = repo.description;
        var forked = repo.fork;
  
        var forkedSpan = document.createElement('span');
        forkedSpan.classList.add('pro');
        if (forked) {
            forkedSpan.textContent = "Forked";
            card.appendChild(forkedSpan);
            card.appendChild(document.createElement('br'));
        }
        var img=document.createElement('img');
        img.classList.add('round');
        img.src=repo.owner.avatar_url;
        card.appendChild(img);
        var title = document.createElement('h3');
        title.classList.add('repoTitile');
        title.textContent = repoName;
        card.appendChild(title);

        // Create and append language paragraph initially
        var languageParagraph = document.createElement('p');
        languageParagraph.classList.add('language');
        // card.appendChild(languageParagraph);
        var description = document.createElement('p');
        description.classList.add('repoDescription');
        description.textContent = repoDescription || "No description available";
        card.appendChild(description);

        var buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');
        
        var githubLinkButton = document.createElement('button');
        githubLinkButton.classList.add('primary');

        var githubLink = document.createElement('a');
        githubLink.classList.add('htmlUrl');
        githubLink.href = html_url;
        githubLink.textContent = "Contribute";
        githubLinkButton.appendChild(githubLink);
        buttonsDiv.appendChild(githubLinkButton);
        // Append the buttons div to the card
        card.appendChild(buttonsDiv);
        var skillsDiv = document.createElement('div');
        skillsDiv.classList.add('skills');
        var SkillText=document.createElement('h6')
        SkillText.textContent="Skills"
        skillsDiv.appendChild(SkillText)
        var skillUl = document.createElement('ul');
        skillUl.classList.add('skillUl');
        card.appendChild(skillsDiv);
        

        // Fetch and display languages with icons asynchronously
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "token ");
        myHeaders.append("Cookie", "logged_in=no");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`https://api.github.com/repos/shivesh1606/${repo.name}/languages`, requestOptions)
            .then(response => response.json())
            .then(languages => {
                var languageList = "";
                for (const language in languages) {
                    // Check if the language has an associated icon
                    if (iconLinks[language]) {
                        languageList += `${iconLinks[language]}   `; // Use the icon
                        var skillUlLi = document.createElement('li');
                        skillUlLi.innerHTML =`${iconLinks[language]}   `;
                        skillUl.appendChild(skillUlLi);
                    } else {
                        languageList += `${language}   `; // Use the text if no icon is found
                        var skillUlLi = document.createElement('li');
                        skillUlLi.innerHTML =`${language}   `;
                        skillUl.appendChild(skillUlLi);
                    }
                }
                
                languageParagraph.innerHTML = languageList || "No language detected";
                skillsDiv.appendChild(skillUl);
            })
            .catch(error => console.error("Error fetching languages:", error));
        

        cardsBox.appendChild(card);
    });
}


// Check if data is in localStorage
var cachedRepos = localStorage.getItem('github_repos');
if (cachedRepos) {
    // Parse and display cached data
    displayRepos(JSON.parse(cachedRepos));
} else {
    // Fetch data from GitHub API and display
    fetchAndDisplayRepos();
}
