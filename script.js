const socket = io('/');
const videoGrid = document.getElementById('video-grid');

//creating a video element in which we can play our video stream in
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer();

undefined, {
    path: '/peerjs',
    host: '/',
    port: '443'
}

let myVideoStream
navigator.mediaDevices.getUserMedia({   //helps us get video and audio output from chrome
    video: true,
    audio: true
}).then(stream => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', (userId) => {
        connectToNewUser(userId, stream);
    })


    let text = $('input')

    $('html').keydown((e) => {
        if(e.which == 13 && text.val().length !== 0)
        {
            socket.emit('message', text.val());
            text.val('');
        }
    });

    socket.on('createMessage', message => {
        $('ul').append(`<li class="message"><b>user</b><br/>${message}</li>`)
        scrollToBottom()
    })
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})


const connectToNewUser = (userId, stream) => {
     const call = peer.call(userId, stream) //calling the user id and sending our stream to them
     const video = document.createElement('video') //create a new video element for the other user
     call.on('stream', userVideoStream => {
         addVideoStream(video, userVideoStream) //when we receive someone else's video stream, we are going to add it to our stream
     })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();   //plays the video once all the data has been loaded
        filter.addEventListener('change', (event) => {  //filter

            currentFilter = event.target.value
      
            video.style.filter = currentFilter
      
            SendFilter(currentFilter)
      
            event.preventDefault
      
        })
    })
    videoGrid.append(video);
}

const showchat = () => {

    if (chat.hidden == false) {
  
        chat.hidden = true;
  
    } else {
  
        chat.hidden = false;
  
    }
  
  };

const scrollToBottom = () => {
    var d = $('.main_chat_window');
    d.scrollTop(d.prop("scrollHeight"));
}

// Mute-Unmute functionality

const muteUnmute = () => {
    const enabled = myVideoStream.getAudioTracks()[0].enabled;
    if(enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton();
    }
    else {
        setMuteButton();
        myVideoStream.getAudioTracks()[0].enabled = true;
    }
}

const setMuteButton = () => {
    const html = `
    <i class ="mute fas fa-microphone"></i>
    <span>Mute</span>
    `
    document.querySelector('.main_mute_button').innerHTML = html;
}

const setUnmuteButton = () => {
    const html = `
    <i class ="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
    `
    document.querySelector('.main_mute_button').innerHTML = html;
}

// Stop-Play-Video functionality
const playStop = () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    if(enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        setPlayVideo()
    }
    else {
        setStopVideo()
        myVideoStream.getVideoTracks()[0].enabled = true;
    }
}

const setStopVideo = () => {
    const html = `
    <i class="play fas fa-video"></i>
    <span>Stop Video</span>
    `
    document.querySelector('.main_video_button').innerHTML = html;
}

const setPlayVideo = () => {
    const html = `
    <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
    `
    document.querySelector('.main_video_button').innerHTML = html;
}

// ADDING SCREEN RECORDING FUNCTIONALITY
let start = document.getElementById('start'),
    stop  = document.getElementById('stop'),
    mediaRecorder;

start.addEventListener('click', async function(){
    let stream = await recordScreen();
    let mimeType = 'video/webm';
    mediaRecorder = createRecorder(stream, mimeType);
//   let node = document.createElement("p");
//     node.textContent = "Started recording";
//     document.body.appendChild(node);
})

stop.addEventListener('click', function(){
    mediaRecorder.stop();
    // let node = document.createElement("p");
    // node.textContent = "Stopped recording";
    // document.body.appendChild(node);
})

async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
        audio: true, 
        video: { mediaSource: "screen"}
    });
}

function createRecorder (stream, mimeType) {
  // the stream data is stored in this array
  let recordedChunks = []; 

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }  
  };
  mediaRecorder.onstop = function () {
     saveFile(recordedChunks);
     recordedChunks = [];
  };
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
}

function saveFile(recordedChunks){

   const blob = new Blob(recordedChunks, {
      type: 'video/webm'
    });
    let filename = window.prompt('Recording has been stopped. To save your recording, please enter the name by which you wish to save it:'),
        downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${filename}.webm`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(blob); // clear from memory
    document.body.removeChild(downloadLink);
}

// ADDING THE SCREEN SHARING FUNCTIONALITY

const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start1");
const stopElem = document.getElementById("stop1");

// Options for getDisplayMedia()

var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function(evt) {
  startCapture();
}, false);

stopElem.addEventListener("click", function(evt) {
  stopCapture();
}, false);

async function startCapture() {
  
    try {
      videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      dumpOptionsInfo();
    } catch(err) {
      console.error("Error: " + err);
    }
  }

  function stopCapture(evt) {
    let tracks = videoElem.srcObject.getTracks();
  
    tracks.forEach(track => track.stop());
    videoElem.srcObject = null;
  }

  function dumpOptionsInfo() {
    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
  
    console.info("Track settings:");
    console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
    console.info("Track constraints:");
    console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
  }

