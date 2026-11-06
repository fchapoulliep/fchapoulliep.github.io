import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";
import App from "./components/App";
import { redirectLegacyHashUrl } from "./services/hashRedirectService";

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));

/**
 * Opens a page of the site, as a visitor typing its address
 */
const visit = (path: string) =>
  window.history.replaceState(null, "", import.meta.env.BASE_URL + path);

beforeEach(() => {
  visit("");
  document.documentElement.classList.remove("dark");
  window.localStorage.clear();
});

test("renders the home page with its navigation", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { level: 1, name: "Florian Chapoullié-Pino" })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Retour à l'accueil" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 3, name: "Leveria" })
  ).toBeInTheDocument();
});

test("the home page indexes the school projects without telling them", () => {
  render(<App />);

  const index = screen.getByRole("link", { name: "09 Tableau associatif" });
  expect(index).toHaveAttribute(
    "href",
    `${import.meta.env.BASE_URL}retours-experience#tableau-associatif`
  );
  expect(
    screen.queryByRole("heading", { level: 3, name: "Tableau associatif" })
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Tous les retours d'expérience" })
  ).toHaveAttribute("href", `${import.meta.env.BASE_URL}retours-experience`);
});

test("an entry of the index opens the reports page at its section", async () => {
  const scrolled: string[] = [];
  vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(
    function (this: Element) {
      scrolled.push(this.id);
    }
  );
  render(<App />);

  await userEvent.click(
    screen.getByRole("link", { name: "07 Symfony" })
  );

  expect(window.location.pathname).toBe(
    `${import.meta.env.BASE_URL}retours-experience`
  );
  expect(
    screen.getByRole("heading", { level: 1, name: "Retours d'expérience" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 3, name: "Symfony" })
  ).toBeInTheDocument();
  expect(scrolled).toEqual(["symfony"]);
  vi.restoreAllMocks();
});

test("the reports page tells all nine projects, each with its PDF", () => {
  visit("retours-experience");
  render(<App />);

  expect(document.title).toBe("Retours d'expérience | Florian Chapoullié-Pino");
  expect(screen.getAllByRole("article")).toHaveLength(9);
  expect(
    screen.getAllByRole("link", { name: "Lire le retour d'expérience" })
  ).toHaveLength(9);
  // Reached from the home page only: the navigation bar does not list it
  expect(
    screen.queryByRole("link", { name: /Retours d'expérience/ })
  ).not.toBeInTheDocument();
});

test("the contact form points out the missing fields and sends nothing", async () => {
  visit("contact");
  render(<App />);

  await userEvent.click(screen.getByRole("button", { name: "Envoyer" }));

  expect(screen.getByText("Veuillez entrer votre nom")).toBeInTheDocument();
  expect(
    screen.getByText("Veuillez entrer votre adresse e-mail")
  ).toBeInTheDocument();
  expect(screen.getByText("Veuillez entrer votre message")).toBeInTheDocument();
  expect(screen.getByLabelText("Nom")).toHaveFocus();
  expect(emailjs.send).not.toHaveBeenCalled();
});

test("the theme toggle switches to dark and remembers it", async () => {
  render(<App />);

  await userEvent.click(
    screen.getByRole("button", { name: "Passer au thème sombre" })
  );

  expect(document.documentElement).toHaveClass("dark");
  expect(window.localStorage.getItem("theme")).toBe("dark");
  expect(
    screen.getByRole("button", { name: "Passer au thème clair" })
  ).toBeInTheDocument();
});

test("the theme toggle gives the browser's bar the color of the theme", async () => {
  document.documentElement.classList.add("dark");
  const bar = document.createElement("meta");
  bar.name = "theme-color";
  bar.content = "#121212";
  document.head.append(bar);
  render(<App />);

  await userEvent.click(
    screen.getByRole("button", { name: "Passer au thème clair" })
  );

  expect(document.documentElement).not.toHaveClass("dark");
  expect(window.localStorage.getItem("theme")).toBe("light");
  expect(bar.content).toBe("#fafafa");
  bar.remove();
});

test("an old #/ link opens its page at the address without the hash", () => {
  visit("#/contact");
  redirectLegacyHashUrl();
  render(<App />);

  expect(window.location.pathname).toBe(`${import.meta.env.BASE_URL}contact`);
  expect(window.location.hash).toBe("");
  expect(screen.getByRole("button", { name: "Envoyer" })).toBeInTheDocument();
});
