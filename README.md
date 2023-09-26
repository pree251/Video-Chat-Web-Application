# Video-Chat-Web-Application
The main objective of this project is to build a Real-Time Video Chat Web Application using WebRTC, which will allow us to establish peer-to-peer connection between 2 or more browsers. This application should enable a chat/messaging option to the user and the user should also be able to stream his/her video and see the video streamed by the other users. Apart from the video streaming feature, the user should also be able to mute/unmute and turn on/turn off his/her video. To add more functionalities to the application, the option of changing the way the user’s video appears, i.e., the addition of filters/effects should be implemented in the application. Screen-sharing and screen-recording features are also available. 

### Tech Stack Used:
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="41" width="60" alt="html5 logo"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="41" width="60" alt="css3 logo"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="41" width="60" alt="javascript logo"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="41" width="60" alt="nodejs logo"  />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="41" width="60" alt="express logo"  />
</div>

### Why was this particular Tech stack used?

1.	Embedded JavaScript - EJS is used for integrating Frontend and Backend. It is basically a template engine used by Node JS to create HTML template with minimal code.

2.	Nodejs/Express - It is used for server framework. Express will be the backbone of our application. Express is one of the most popular web application frameworks for Node.js.

3.	Simple-Peer (WebRTC) - Captures and optionally streams audio and/or video. This will be incorporated by the PeerJS library. 

4.	Socket.io - It enables real-time, bidirectional communication between web clients and servers. 

5.	CSS - CSS is used to add style to a webpage by dictating how a site is displayed on a browser.

**Password to access the application:
dcn123**

### IMPLEMENTATION:

- When the user runs the application, this is the first page that they can see - Homepage/Login page:

![image](https://github.com/pree251/Video-Chat-Web-Application/assets/68124103/4f53ebe1-20d0-4246-9da7-5a03e8015258)

- When the user enters the wrong password, an alert message alerts the user that they have entered an Invalid Password:
  
![image](https://github.com/pree251/Video-Chat-Web-Application/assets/68124103/cdc8b041-2870-484b-a9c1-af167025588e)

- When the user enters the correct password, they can access the video chat web application as shown below. Three people have joined the video chat room and are able to communicate with one another:
  
![image](https://github.com/pree251/Video-Chat-Web-Application/assets/68124103/9a615c05-9ad2-4cad-9038-861aeaf9758a)

- Here, we have shown the implementation of the filters/effects feature (we have chosen B&W) and the implementation of our chat window where users can communicate with one another:
  
![image](https://github.com/pree251/Video-Chat-Web-Application/assets/68124103/25fc6e0f-4e60-47ac-97e1-4b2ec90c8b3d)

- Here, we have shown the implementation of the recording feature. When the user clicks on ‘start recording’, they are asked to choose which screen they want to record and then the recording starts immediately:
  
![image](https://github.com/pree251/Video-Chat-Web-Application/assets/68124103/bfb44e00-2d9b-459d-a401-477ef4ca8fdd)

- When the user clicks on ‘stop recording’, they are asked to enter a filename under which they wish to save the recording. Once that is done, the recording is saved under that name and downloaded immediately:
  
![image](https://github.com/pree251/Video-Chat-Web-Application/assets/68124103/28786dca-a424-4e22-bad2-c58db190062c)

- When the user clicks on ‘leave meeting’, they are redirected to this page where it gives them the option to either re-join the meeting or to return to the homepage. It also includes a star rating feedback for the user:
  
![image](https://github.com/pree251/Video-Chat-Web-Application/assets/68124103/2941f354-9a36-45f9-9948-d6a333ca5ee5)

---

The Real-Time Video Chat Web Application has been deployed on Heroku App. The Heroku App link which is generated during the deployment can be used by other users to join the server on which the WebRTC has been deployed.

---

Check out the project:
https://fathomless-cliffs-47472.herokuapp.com/
