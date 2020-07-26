import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState(
    "Эти методы не являются частью спецификации JavaScript."
  );

  /* let text = "Эти методы не являются частью спецификации JavaScript. Но большинство сред выполнения JS-кода имеют внутренний планировщик и предоставляют доступ к этим методам. В частности, они поддерживаются во всех браузерах и Node.js.".repeat(
    1000
  ); */

  let arrOfWords = text.split(" ");

  const [play, setPlay] = useState(false);
  const [wpm, setWpm] = useState(50);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(
    () => {
      let timerId;
      if (play) {
        window.addEventListener("keydown", Key);
        timerId = setTimeout(
          () => setWordIndex((index) => index + 1),
          60000 / wpm
        );
      }
      return () => {
        window.removeEventListener("keydown", Key);
        clearTimeout(timerId);
      };
    } /* , [wpm, play, wordIndex] */
  );

  function Key(event) {
    if (event.key === "ArrowUp") {
      setWpm((prev) => prev + 50);
    } else if (event.key === "ArrowDown" && wpm > 50) {
      setWpm((prev) => prev - 50);
    }
  }
  /*
  useEffect(() => {
    window.addEventListener("keydown", Key);
    return () => {
      window.removeEventListener("keydown", Key);
    };
  }, []);
*/
  function handleBegin() {
    setPlay((prev) => !prev);
  }

  function handleChange(e) {
    /* e.persist();
    console.log(e); */

    const reader = new FileReader();
    reader.onload = (event) => {
      setText(event.target.result);
      console.log(event.target.result);
      console.log(event);
    };
    //console.log(reader.readAsText(e.target.files[0]));
  }
  return (
    <div className="menu">
      <label className="loadButton">
        Загрузите файл
        <input type="file" name="file" onChange={handleChange} multiple />
      </label>
      <p>
        {
          "Управление скоростью чтения осуществляется с помощью стрелок на клавиатуре:"
        }
      </p>
      <p>
        {
          '"Вверх"- скорость увеличавается, и стрелки "Вниз" - скорость уменьшается'
        }
      </p>

      <div className="showWords">
        <button type="button" className="Begin" onClick={handleBegin}>
          {play ? "Остановить" : "Начать"}
        </button>
        <div className="Words">{arrOfWords[wordIndex]}</div>
      </div>
    </div>
  );
}

export default App;
