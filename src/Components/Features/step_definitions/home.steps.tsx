import React from "react";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { store } from "../../Redux/store";
import routes from "./../../utils/Routes";
import Home from "../../Dictionary/Home";
import Details from "../../Dictionary/Details";
import axios from "axios";

const feature = loadFeature("src/Components/Features/home.feature");

defineFeature(feature, (test) => {
  test("The component renders and a random word is fetched", ({
    given,
    when,
    then,
    and,
  }) => {
    given("The user is on the Home page", () => {
      const screen = render(
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/search" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="*" element={<Navigate to="/search" replace />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      );
      expect(screen.getByTestId("homeContainer")).toBeInTheDocument();
    });
    when("The user inputs a word and submits it", async () => {
      const screen = render(
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/search" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="*" element={<Navigate to="/search" replace />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      );
      const input = screen.getAllByPlaceholderText("Example: example");
      fireEvent.change(input[0], { target: { value: "example" } });
    });

    then("the definition of the word is fetched and displayed", async () => {
      const screen = render(
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/search" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="*" element={<Navigate to="/search" replace />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      );
      const mockAxios = jest.spyOn(require("axios"), "get");
      mockAxios.mockResolvedValueOnce({
        data: [
          {
            meanings: [
              {
                definitions: [
                  { definition: "a thing characteristic of its kind" },
                ],
              },
            ],
          },
        ],
      });
      await screen.findByText("a thing characteristic of its kind");
      expect(
        screen.getByText("a thing characteristic of its kind")
      ).toBeInTheDocument();
    });
    and(
      "clicking on the definition takes the user to the Details page for that word",
      async () => {
        const screen = render(
          <Provider store={store}>
            <BrowserRouter>
              <Routes>
                <Route path="/search" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="*" element={<Navigate to="/search" replace />} />
              </Routes>
            </BrowserRouter>
          </Provider>
        );
        const input = screen.getAllByPlaceholderText("Example: example");
        fireEvent.change(input[0], { target: { value: "example" } });
        const mockAxios = jest.spyOn(require("axios"), "get");
        mockAxios.mockResolvedValueOnce({
          data: [
            {
              meanings: [
                {
                  definitions: [
                    { definition: "a thing characteristic of its kind" },
                  ],
                },
              ],
            },
          ],
        });
        const def = screen.getAllByTestId("definitionContainer");
        fireEvent.click(def[1]);
        await waitFor(() => {
          expect(window.location.pathname).toMatch(/^\/details\/.*/);
        });
      }
    );
  });
});
