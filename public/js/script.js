const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const socket = io();

recognition.lang = 'en-US';
recognition.interimResults = false;

document.querySelector('button').addEventListener('click', () => {
   recognition.start();
});

recognition.addEventListener('result', (e) => {
   let last = e.results.length - 1;
   let text = e.results[last][0].transcript;
   socket.emit('chat message', text);

   console.log('Confidence: ' + e.results[0][0].confidence);
});

io.on('connection', function(socket) {
   socket.on('chat message', (text) => {
      let apiaiReq = apiai.textRequest(text, {
         sessionId: APIAI_SESSION_ID
      });

      apiaiReq.on('response', (response) => {
         let aiText = response.result.fulfillment.speech;
         socket.emit('bot reply', aiText);
      });

      apiaiReq.on('error', (error) => {
         console.log(error);
      });

      apiaiReq.end();
   });
});