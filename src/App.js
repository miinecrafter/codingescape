import { useRef, useEffect, useState } from 'react';
import BackgroundImg from './BackgroundImg.js';
import TextBox from './TextBox.js';
import './App.css';

function App() {

  const slideData = [null, null, 
    ["AHAHAHAHA, you have foolishly walked into my mansion, and now you are TRAPPED. There is a key to get out but don’t waste your time, you’ll NEVER find it.", "Gorgon the ghost"], 
    [" ", " "], 
    ["pssst, he can’t hear us talking if we whisper. We have access to the source code for the website. Click Ctrl+i to open dev tools. The key has to be somewhere in there. Try changing the door’s id from “closed” to “open using the setDoor function", "Oliver"], 
    [" ", " "],
    ["do you see that sheet of cardboard, it's sealed tight to the wall. It must be covering something important. I'll remove the bottom sheet. Try setting the CSS of the board from \"block\" to “none” to reveal what is under it.", "Oliver"], 
    ["Hmm... can you figure out the pattern? There has to be a place to put that code...", "Oliver"], 
    ["Maybe we should try the enterCode() function. Try putting your code inside the parenthesis", "Oliver"], 
    ["WOW! You did it!", "Oliver"], 
    ["Thanks to you we are free!", "Oliver"], 
    ["Wait not yet, Gargon the Ghost could still be lurking around, we need to get out of here as fast as possible", "Oliver"], 
    ["Ugh, wait a minute. We still dont have the key! That's the only way we can get out!", "Oliver"],
    ["Let's stay here and look for it, it has to be somewhere", "Oliver"],
    ["HAHHAAHAHA, YOU THOUGHT YOU COULD ESCAPE", "Gargon the Ghost"], 
    ["Oh no! attack him with the attack() function!", "Oliver"], 
    ["YOU CANT KILL ME, YOU NEED THE KEY AND I HID IT IN A PLACE YOULL NEVER FIND IT", "Gargon the Ghost"], 
    ["Ugh hes right! we cant kill him yet! We need the code!", "Oliver"], 
    ["But wait! If hes this bad at cybersecurity, maybe he has left us a function to get the key, try to console.log the key!", "Oliver"], 
    ["great now we need to put it in, try a placeKey function!", "Oliver"],
    ["WE ESCAPED YAY!!!!!", "Oliver"]];


  window.attack = attack;

  let key = Math.floor(Math.random() * 1000000);
  window.key = key;
  window.setDoor = setDoor;
  window.enterCode = enterCode;
  window.placeKey = placeKey;

  const [code, setCode] = useState("enter-code-here");
  const [doorBool, setDoorBool] = useState("closed");
  const [gargonHealth, setGargonHealth] = useState(20);
  const [speaker, setSpeaker] = useState("Gargon the Ghost");
  const [text, setText] = useState("Hello MLH");
  const [currentSlide, setCurrentSlide] = useState(2);

  const idRef = useRef<HTMLDivElement>(null);

  function setDoor(word){
    if(word == "open"){
      setCurrentSlide(6);
    }
    else console.log("We're trying to get out of here, OPEN the door!");
  }

  function enterCode(ans) {
    setCode(ans);
    if(code == 64){
      console.log("correct");
      setCurrentSlide(9);
    }
    else{
      console.log("wrong code!");
    }
  }

  function placeKey(keyEntered){
    if(keyEntered == key){
      console.log("Nice! thats the answer");
      setCurrentSlide((currentSlide) => 20);
    }
    else{
      console.log("wrong key, correct key is " + key);
    }
  }

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'id') {
                const newId = mutation.target.id;
                setCode(newId);
                console.log(`ID changed to: ${newId}`);
            }
        });
    });

    // Start observing the div for attribute changes
    if (idRef.current) {
        observer.observe(idRef.current, { attributes: true });
    }

    // Cleanup observer on component unmount
    return () => {
        observer.disconnect();
    };
}, []);

  useEffect(() => {
    if(code == 64) setCurrentSlide(8);
  }, [code])

  function attack() {
    if(gargonHealth > 0) setGargonHealth((gargonHealth) => (gargonHealth - 5));
    console.log("Gargon the Ghost's Health: " + gargonHealth);
  }

  useEffect(() => {
    if(gargonHealth == 5) setCurrentSlide((currentSlide) => 16);
  }, [gargonHealth])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && currentSlide <= 20) {
        // Log the current slide before updating
        console.log('Current slide before update: ', currentSlide);

        // Update the current slide and log the new value
        setCurrentSlide((prevSlide) => {
          const newSlide = prevSlide + 1; // Calculate the new slide value
          console.log('Enter key pressed! New slide is: ', newSlide); // Log the updated slide value
          return newSlide; // Return the new value for state update
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setText(slideData[currentSlide][0]);
    setSpeaker(slideData[currentSlide][1]);
  }, [currentSlide]);

  useEffect(() => {
    console.log("use effect running");
    if (idRef.current) {
      console.log("id of idRef is " + idRef.current.id);
    }
  }, []); // Dependency array added

  return (
    <div className="App">
      <div style={{display: 'block'}}><div className="board"></div></div>
      {/* <div id={code} ref={idRef}></div> */}
      <div className="textbox">
        <TextBox text={text} 
                  speaker={speaker} />
      </div>
      <div className="bgimg">
        <BackgroundImg slide={currentSlide} />
      </div>
    </div>
  );
}

export default App;