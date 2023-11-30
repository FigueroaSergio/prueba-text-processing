import "./style.css";
import { trpc } from "./trpc";

document
  .querySelector<HTMLFormElement>("#form")!
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = document.querySelector<HTMLInputElement>("#path")!;
    const path = data.value;

    const result = await trpc.text.query({ path });
    console.log(result);
  });
