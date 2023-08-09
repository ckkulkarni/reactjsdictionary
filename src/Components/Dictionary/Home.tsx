import {
  Box,
  Button,
  Select,
  TextField,
  MenuItem,
  Switch,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addWord } from "../Redux/reducers/wordSlice";
import { ThemeContext } from "./../../App";
const Home = () => {
  const [word, setWord] = useState<string>("");
  const dispatch = useDispatch();
  const { theme, themeToggle } = useContext(ThemeContext);
  const { words } = useSelector((state: any) => state.words);
  const [definitions, setDefinitions] = useState<string[]>([]);
  const mounted = useRef(false);
  const navigation = useNavigate();
  const memoizedDefinition = useMemo(() => {
    return definitions.map((defintion, index) => (
      <li key={index}>{defintion}</li>
    ));
  }, [definitions]);
  const memoizedWordAndDefinition = useMemo(() => {
    return (
      <>
        <p className="word">Word: {word}</p>
        <p className="definition" data-testid="definitionP">
          Definitions:
        </p>
        <ul>{memoizedDefinition}</ul>
      </>
    );
  }, [word, memoizedDefinition]);
  useEffect(() => {
    const getWord = async () => {
      const result = await axios.get(
        `https://random-word-api.herokuapp.com/word`
      );
      setWord(result.data[0]);
    };

    if (!mounted.current) {
      getWord();
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    const getDefinition = async () => {
      try {
        const result = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        const meanings = result.data[0].meanings;
        const definitionsArray: string[] = [];
        meanings.forEach((meaning: any) => {
          if (meaning.definitions[0]) {
            definitionsArray.push(meaning.definitions[0].definition);
          }
        });
        setDefinitions(definitionsArray);
      } catch (error) {
        alert("No definition found.");
        setDefinitions(["Enter a valid word."]);
      }
    };
    if (word !== "") {
      getDefinition();
    }
  }, [word]);

  const formik = useFormik({
    initialValues: {
      inputWord: "",
    },
    onSubmit: (values) => {
      setWord(values.inputWord);
      dispatch(addWord(values.inputWord));
    },
  });

  const handleNavigation = () => {
    navigation(`/details/${word}`, { state: word });
  };
  return (
    <div>
      <div className="homeContainer" data-testid="homeContainer">
        <em>Click on the definition for more information</em>
        <div
          onClick={handleNavigation}
          className="wordAndDefinition"
          data-testid="definitionContainer"
        >
          {memoizedWordAndDefinition}
        </div>
        <form onSubmit={formik.handleSubmit} className="homeForm">
          <TextField
            id="wordInput"
            name="inputWord"
            type="text"
            variant="outlined"
            onChange={formik.handleChange}
            placeholder="Example: example"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
        <form onSubmit={formik.handleSubmit} className="homeForm">
          <Select
            id="previousWords"
            disabled={words.length == 0}
            name="inputWord"
            value={formik.values.inputWord}
            onChange={formik.handleChange}
            placeholder="Previous Words"
          >
            {words.map((word: string) => (
              <MenuItem value={word} key={word}>
                {word}
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            variant="contained"
            disabled={words.length == 0}
            id="selectPrevious"
          >
            Select
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
