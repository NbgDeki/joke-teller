const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// passing joke to voicerss api
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: '02b16be7e79142aab9fba213551f50c2',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
};

// get jokes from joke api
const getJokes = async () => {
  let joke = '';
  const apiUrl = `https://v2.jokeapi.dev/joke/Dark`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    // text to speech
    tellMe(joke);
    // disable button
    toggleButton();
  } catch (error) {
    console.log('whooops', error);
  }
};

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
