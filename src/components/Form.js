import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Form = ({ getFlashCards }) => {
  const categoryRef = useRef(null);
  const amountRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const decodeString = (str) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  };
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountRef.current.value,
          category: categoryRef.current.value,
        },
      })
      .then((res) => {
        // console.log(res.data)
        getFlashCards(
          res.data.results.map((data, ind) => {
            const correctAns = decodeString(data.correct_answer);
            const options = [
              correctAns,
              ...data.incorrect_answers.map((a) => decodeString(a)),
            ];
            return {
              id: `${ind}-${Date.now()}`,
              question: decodeString(data.question),
              answer: correctAns,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  };

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  return (
    <form className="header" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryRef}>
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Number of questions</label>
        <input
          type="number"
          id="amount"
          min="1"
          step="1"
          defaultValue="10"
          ref={amountRef}
        />
      </div>

      <div className="form-group">
        <button className="button">Generate</button>
      </div>
    </form>
  );
};

export default Form;
