import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { ThemeContext } from "./../../App";

const Details = () => {
  const { state } = useLocation();
  const [wordDetails, setWordDetails] = useState<any>(null);

  const { theme, themeToggle } = useContext(ThemeContext);
  useEffect(() => {
    const getWordDetails = async () => {
      try {
        const result = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${state}`
        );
        setWordDetails(result.data[0]);
      } catch (error) {
        alert("No details found.");
      }
    };

    getWordDetails();
  }, [state]);
  return (
    <div className="detailsContainer">
      {wordDetails && (
        <div className="details">
          <h1 className="wordHeading" data-testid="word-name">
            {wordDetails.word}
          </h1>
          {wordDetails.phonetics.map((phonetic: any, index: number) => (
            <div key={index} className="phonetics">
              <p data-testid="word-phonetics">{phonetic.text}</p>
              {phonetic.audio && (
                <audio controls>
                  <source src={phonetic.audio} type="audio/mpeg" />
                </audio>
              )}
            </div>
          ))}
          {wordDetails.meanings.map((meaning: any, index: number) => (
            <div key={index} className="meanings">
              <h3 className="partOfSpeech" data-testid="word-pos">
                {meaning.partOfSpeech}
              </h3>
              {meaning.definitions.map((definition: any, index: number) => (
                <div key={index} className="defineWExample">
                  <p
                    className="definitionParagraph"
                    data-testid="word-definition"
                  >
                    {definition.definition}
                  </p>
                  {definition.example && (
                    <p className="example" data-testid="word-example">
                      <em>Example:</em> {definition.example}
                    </p>
                  )}
                  {definition.synonyms && (
                    <p className="synonyms">
                      <em>Synonyms:</em> {definition.synonyms.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Details;
