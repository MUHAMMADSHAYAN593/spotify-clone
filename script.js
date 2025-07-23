let currentsong = new Audio();
let songs;
let currFolder;
function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "00:00";
    }
    const totalSeconds = Math.round(seconds);
    const minutes = Math.round(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
}
async function getsongs(folder) {
    currFolder = folder;
    try {
        let a = await fetch(`http://127.0.0.1:5500/${folder}/`);
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;

        let as = div.getElementsByTagName("a");

        songs = [];
        for (let index = 0; index < as.length; index++) {
            const element = as[index];
            if (element.href.endsWith(".mp3") || element.href.endsWith(".m4a") || element.href.endsWith(".wav")) {
                songs.push(element.href.split(`/${folder}/`)[1]);
            }
        }
        return songs;  // ✅ ADD THIS LINE
    } catch (error) {
        alert(error)
        
    }
    return songs
}


const playMusic = (track, pause = false) => {
    //let audio = new Audio("/songs/"+track)
    currentsong.src = `/${currFolder}/` + track
    if (!pause) {
        currentsong.play()
        play.src = "img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
}

async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await a.text();
    let div = document.createElement("div")
    let cardContainer = document.querySelector(".cardContainer")
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++) {
        const e = array[index];

        if (e.href.includes("/songs")) {
            let folder = e.href.split("/").filter(Boolean).pop();
            //get medata of folder
            try {
                let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`);
                let response = await a.json();
                cardContainer.innerHTML += `
        <div data-folder="${folder}" class="card">
            <div class="play">
                <svg class="play-icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="24" fill="none" />
                    <path d="M20 15V35L35 25L20 15Z" fill="black" />
                </svg>
            </div>
            <img src="/songs/${folder}/cover.jpg" alt="">
            <h2>${response.title}</h2>
            <p>${response.description}</p>
        </div>`;
            } catch (err) {
                console.warn(`Skipping ${folder}: Missing or invalid info.json`);
            }

        }
    }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
            playMusic(songs[0])
        });
    });
}

async function main() {
    await getsongs("songs/cs")
    playMusic(songs[0], true)


    //display all the albuums
    displayAlbums()


    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUL.innerHTML = ""
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li><img class="invert" src="img/music.svg" alt="">
                                <div class="info">
                                    <div>${song.replaceAll("%20", " ").replaceAll("%F0%9F%8E%B5", "")}</div>
                                    <div>Shayan</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img class="invert" src="img/play.svg" alt="">
                                </div></li>`;
    }

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").firstElementChild.innerHTML)
        })
    })

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "img/pause.svg"
        } else {
            currentsong.pause()
            play.src = "img/play.svg"
        }
    })

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)} / ${formatTime(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
    })

    document.querySelector(".seekbar").addEventListener("click", e => {
        const seekbar = e.target.getBoundingClientRect();
        const offsetX = e.clientX - seekbar.left;
        const percentage = (offsetX / seekbar.width) * 100;
        document.querySelector(".circle").style.left = percentage + "%";
        currentsong.currentTime = ((currentsong.duration) * percentage) / 100
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    document.querySelector(".Close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index > 0) {
            playMusic(songs[index - 1])
        }
    })
    Next.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if (index < songs.length - 1) {
            playMusic(songs[index + 1])
        }
    })

    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100
    })

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes( "volume.svg")) {
            e.target.src = e.target.src.replace("volume.svg","mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0
        }
        else{
            e.target.src = e.target.src.replace("mute.svg","volume.svg")
            currentsong.volume = 0.1
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10
        }
    })


}
document.addEventListener("DOMContentLoaded", () => {
    main();
});


