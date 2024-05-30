import React from "react";

import Main from "./components/Main"

const dicionarioApiUrl = "https://api.dicionario-aberto.net/random";

export default function App() {

    const [anagram, setAnagram] = React.useState({
        originalWord: "",
        guessingWord: "",
        anagramWord: "",
        right: false,
        wrong: false
    });


    function getRandomWordFromApi() {
        return fetch(dicionarioApiUrl)
          .then((res) => res.json())
          .then(d => {
            setAnagram(prevAnagram => {                
                return {
                    ...prevAnagram,
                    originalWord: d.word,
                    anagramWord: anagrameWord(d.word)
                }
                
            })
        })
    }

    React.useEffect(() => {
        getRandomWordFromApi();
    }, []);

    function checkWord(e) {
        e.preventDefault()
        if (anagram.originalWord == anagram.guessingWord) {
            setAnagram(prevAnagram => {return {...prevAnagram, right: true}})
        } else {
            setAnagram(prevAnagram => {return {...prevAnagram, wrong: true}})
        }
    }

    function checkInputChange(e) {        
        setAnagram(prevAnagram => {return {...prevAnagram, guessingWord: e.target.value, wrong: false, right: false}});
    }

    function generateNewWord() {
        getRandomWordFromApi();
        setAnagram(prevAnagram => {return {...prevAnagram, guessingWord: ""}})
    }

    function anagrameWord(word) {
        const wordArr = word.split("");
        let newWord = "";
        for (let i = 0; wordArr.length != 0; i++) {
            let randomIndex = Math.floor(Math.random() * wordArr.length)
            newWord += wordArr[randomIndex];
            wordArr.splice(randomIndex, 1);
        }
        console.log(word)
        return newWord;
    }

    function setAnagrameWord() {
        setAnagram(prevAnagram => {return {...prevAnagram, anagramWord: anagrameWord(prevAnagram.originalWord)}})
    }

    return (
        <>            
            <Main 
                anagram={anagram.anagramWord}
                checkWord={checkWord}
                guessingWord={anagram.guessingWord}
                checkInputChange={checkInputChange}
                generateNewWord={generateNewWord}
                anagrameWord={setAnagrameWord}
                right={anagram.right}
                wrong={anagram.wrong}
            />
        </>
    )
}