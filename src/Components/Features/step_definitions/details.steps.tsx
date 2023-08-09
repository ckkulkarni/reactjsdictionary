import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import Details from "../../Dictionary/Details";

const feature = loadFeature("src/Components/Features/details.feature");

defineFeature(feature, (test) => {
  test("User views word details with phonetics and meanings", ({
    given,
    when,
    then,
  }) => {
    let screen: any;
    beforeEach(() => {
      jest.clearAllMocks();
    });

    given("The user is on the Details page", () => {
      screen = render(
        <MemoryRouter initialEntries={["/details/testWord"]}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      );
    });

    when("The user views the details for a word", async () => {
      screen = render(
        <MemoryRouter initialEntries={["/details/testWord"]}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      );
      jest.spyOn(axios, "get").mockResolvedValueOnce({
        data: [
          {
            word: "example",
            phonetics: [
              {
                text: "/ɪɡˈzæmpəl/",
                audio: "example-audio.mp3",
              },
            ],
            meanings: [
              {
                partOfSpeech: "noun",
                definitions: [
                  {
                    definition: "a representative form or pattern",
                    example: "I followed your example",
                    synonyms: ["model", "pattern", "prototype"],
                  },
                ],
              },
            ],
          },
        ],
      });
    });

    then("The word details should be displayed", async () => {
      screen = render(
        <MemoryRouter initialEntries={["/details/testWord"]}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      );
      jest.spyOn(axios, "get").mockResolvedValueOnce({
        data: [
          {
            word: "example",
            phonetics: [
              {
                text: "/ɪɡˈzæmpəl/",
                audio: "example-audio.mp3",
              },
            ],
            meanings: [
              {
                partOfSpeech: "noun",
                definitions: [
                  {
                    definition: "a representative form or pattern",
                    example: "I followed your example",
                    synonyms: ["model", "pattern", "prototype"],
                  },
                ],
              },
            ],
          },
        ],
      });
      await waitFor(() => {
        const wordName = screen.getAllByTestId("word-name");
        const wordPhonetics = screen.getAllByTestId("word-phonetics");
        const wordPos = screen.getAllByTestId("word-pos");
        const wordDef = screen.getAllByTestId("word-definition");
        const wordExample = screen.getAllByTestId("word-example");
        expect(wordName[0]).toHaveTextContent("example");
        expect(wordPhonetics[0]).toHaveTextContent("/ɪɡˈzæmpəl/");
        expect(wordPos[0]).toHaveTextContent("noun");
        expect(wordDef[0]).toHaveTextContent(
          "a representative form or pattern"
        );
        expect(wordExample[0]).toHaveTextContent("I followed your example");
      });
    });
  });
});
