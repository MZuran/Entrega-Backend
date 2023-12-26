const sendButton = document.getElementById("sendButton")
const textInput = document.getElementById("textInput")
const messageContainer = document.getElementById("message-container")

let chatRoomUsername

//User Login
askUserName()

//WebSocket Code
const socket = io()

console.log("Script Loaded")

const testMessage = {
  "_id": "658ad4a2065bb9ddda2e2715",
  "user": "Matías",
  "contents": "Hola!",
  "date": "2023-12-26T13:16:54.000Z",
  "__v": 0
}

socket.on('messages', (messages) => {

  messageContainer.innerHTML = ""
  
  if (messages) {
    messages.forEach(message => {
      console.log(makeMessage(message))
      messageContainer.innerHTML += makeMessage(message)
    });
  }
})

//Events
sendButton.addEventListener("click", () => {
  const message = textInput.value
  const currentTime = new Date();

  if (message) {
    socket.emit("messageSent", {user: chatRoomUsername, contents: message, date: currentTime})
    textInput.value = ""
  }
})

//Functions
function formatDate(time) {
  const currentTime = new Date(time)
  return `${currentTime.getDate().toString().padStart(2, '0')}/${(currentTime.getMonth() + 1).toString().padStart(2, '0')}/${currentTime.getFullYear().toString().slice(-2)}`
}

function formatTime(time) {
  const currentTime = new Date(time);
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Format the components to ensure they have two digits
  const formattedHours = (hours < 10) ? `0${hours}` : hours;
  const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

function makeMessage(message) {
  return (
    `<li class='clearfix'>
        <div class='message-data'>
          <span class='message-data-time'>
            ${escapeHtml(message.user)} <small><em>${formatTime(message.date)}  ${formatDate(message.date)}</em></small>
          </span>
        </div>
        <div class='message my-message'>
          ${escapeHtml(message.contents)}
        </div>
      </li>`
  );
}

function escapeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

function askUserName() {
  Swal.fire({
    title: 'Enter your username',
    input: 'text',
    inputPlaceholder: 'Username',
    showCancelButton: false, // Remove cancel button
    confirmButtonText: 'Submit',
    inputValidator: (value) => {
      // Validate the input
      if (!value) {
        return 'Username cannot be blank!';
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const username = result.value;
      // Do something with the username, for example, log it to the console
      chatRoomUsername = username;
    }
  });
}

