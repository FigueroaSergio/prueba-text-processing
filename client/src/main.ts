import { AppRouter, RouterOutput } from "../../server";
import "./style.css";
import { trpc } from "./trpc";

const Render = (r: RouterOutput["text"]["result"]) => {
  document.querySelector<HTMLFormElement>("#details")!.innerHTML =
    DetailsFile(r);
};
document
  .querySelector<HTMLFormElement>("#form")!
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = document.querySelector<HTMLInputElement>("#path")!;
    const path = data.value;

    const result = await trpc.text.query({ path });
    Render(result.result);
  });

const DetailsFile = (value: RouterOutput["text"]["result"]) => {
  console.log("hey");

  let rows = value.topWords
    .map(
      (v) => `
      <tr>
  <td>${v.word}</td>
  <td>${v.frequency}</td> 
  </tr>`
    )
    .reduce((prev, c) => prev + c, "");
  console.log(rows);
  return `
  <div><strong>Number of letters:</strong>${value.numLetters}</div>
  <div><strong>Number of words:</strong>${value.numWords}</div>
  <div><strong>Number of spaces:</strong>${value.numSpaces}</div>
  <table>
    <thead>
        <th>
          Word
        </th>
        <th>
          Freq
        </th>
    </thead>
    <tbody>
        ${rows}
    </tbody>
</table>
  `;
};
