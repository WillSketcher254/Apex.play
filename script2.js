const form = document.querySelector('form');
const container = document.querySelector('.image-container');


form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    let query = form.querySelector('input').value.trim();
    if (query) {
        console.log(query);
        tvMazeApi(query);
    } else {
        alert('Please enter a valid search term.');
    }
});

const randomSearch = ['mov', 'ms', 'hul', 'demo', 'takt','miles','death','dcu', 'mcu', 'fam'];
tvMazeApi();

async function tvMazeApi(query) {
    try {
        const searchQuery = query || randomSearch[Math.floor(Math.random() * randomSearch.length)];
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const movies = await response.json();
        console.log(movies);
        makeImages(movies); 
    } catch (error) {
        console.error("An error occurred:", error.message);
        container.innerHTML = `<p>Could not fetch the data. Please try again later.</p>`;
    }
}

function makeImages(movies) {
    container.innerHTML = ''; 
    let topContentDiv = document.querySelector('.side-bar');
    topContentDiv.innerHTML = '';

    for (let movie of movies) {
        let src = movie.show.image?.medium || 'NoImg.jpg'; 
        let link = movie.show.officialSite || '#';
        let summary = movie.show.summary || 'NO SUMMARY AVAILABLE'; 
        let premiered = movie.show.premiered || 'NO DATE GIVEN';
        let imgName = movie.show.name;

        let contents = {
            imgName: imgName,
            link: link,
            premiered: premiered,
            summary: summary,
            src: src
        };

        const imgDiv = `
            <div class="black-back">
                <img src="${src}" alt="${imgName}">
                <h3>${imgName}</h3>
                <a href="${link}" target="_blank">Watch now <i class='bx bx-play-circle' style="font-size: 20px;"></i></a>
            </div>
        `;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = imgDiv;

        tempDiv.addEventListener('click', () => details(contents));

        container.appendChild(tempDiv);
    }
}

function details(contents) {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    let topContentDiv = document.querySelector('.side-bar');
    topContentDiv.innerHTML = ''; 

    let topContent = `
        <div style="background: rgb(61, 40, 40) url(${contents.src}) no-repeat fixed center; background-size: 30%;">
            <h3>${contents.imgName}</h3>
            <div class="content">
                <a href="${contents.link}" target="_blank"><button>WATCH NOW <i class='bx bx-play-circle' style="font-size: 20px;"></i></button></a>
                <h4>Premiered: ${contents.premiered}</h4>
                <p>${contents.summary}</p>
            </div>
        </div>
    `;
    topContentDiv.innerHTML = topContent;
}
