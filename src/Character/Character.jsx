import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { getRandomHexColor, getRandomElementOfArray } from "./utils";
import { API_URL } from "./consts";

const Character = () => {
  const [visibility, setVisibility] = useState(true);

  if (!visibility) {
    return null;
  }

  return <CharacterContent setVisibility={setVisibility} />;
};

const CharacterContent = ({ setVisibility }) => {
  const intervalRef = useRef(undefined);
  const [character, setCharacter] = useState({ name: "Undefined" });
  const randomColor = getRandomHexColor();

  useEffect(() => {
    console.log("Component: Mount");
    getRandomCharacter();

    intervalRef.current = setInterval(() => {
      console.log("setInterval");
      getRandomCharacter();
    }, 3000);

    return () => {
      console.log("Component: Unmount");
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    console.log("Component: Render");
  });

  const getRandomCharacter = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        // Гарри Поттер API возвращает массив напрямую
        const characters = data;
        const randomCharacter = getRandomElementOfArray(characters);
        setCharacter({ name: randomCharacter.name });
      })
      .catch((error) => {
        console.error("Ошибка при загрузке персонажа:", error);
        setCharacter({ name: "Ошибка загрузки" });
      });
  };
  const getRandomCharacterHandler = () => {
    getRandomCharacter();
    console.log("getRandomCharacterHandler");
  };

  const hideComponentHandler = () => {
    setVisibility(false);
  };

  // Охранное условие: если имя "Undefined", показываем "Loading..."
  if (character.name === "Undefined") {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <button onClick={hideComponentHandler}>Hide Component</button>
      <h2 className="Character" style={{ backgroundColor: randomColor }}>
        Character: {character.name}
      </h2>
      <button onClick={getRandomCharacterHandler}>Get Random Character</button>
    </>
  );
};

export default Character;
