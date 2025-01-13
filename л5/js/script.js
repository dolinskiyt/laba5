// 2
const base = 10;
const height = 5;

function calculateParallelogramArea(base, height) {
  return base * height;
}

const area = calculateParallelogramArea(base, height);

const block5 = document.querySelector(".block-5");
const resultElement = document.createElement("p");
resultElement.textContent = `Площа паралелограма: ${area} кв. одиниць`;
block5.appendChild(resultElement);

// 3
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}

const savedValue = getCookie("maxDigit");
if (savedValue) {
  alert(
    `Збережене значення: ${savedValue}. Натискання кнопки "ОК" видалить дані.`
  );
  deleteCookie("maxDigit");
  alert("Cookies видалено. Сторінка буде перезавантажена.");
  location.reload();
} else {
  const block5 = document.querySelector(".block-5");

  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Введіть натуральне число";
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Обчислити";

  form.appendChild(input);
  form.appendChild(button);
  block5.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const number = input.value;

    const maxDigit = Math.max(...number.split("").map(Number));
    alert(`Максимальна цифра: ${maxDigit}`);

    setCookie("maxDigit", maxDigit, 1);
  });
}

// 4
document.addEventListener("DOMContentLoaded", () => {
  const blocks = {
    block2: document.querySelector(".block-2"),
    block4: document.querySelector(".block-4"),
    block5: document.querySelector(".block-5"),
  };

  const form = document.createElement("form");
  form.innerHTML = `
      <label><input type="radio" name="block" value="block2"> Блок 2</label><br>
      <label><input type="radio" name="block" value="block4"> Блок 4</label><br>
      <label><input type="radio" name="block" value="block5"> Блок 5</label><br>
    `;

  document.body.appendChild(form);

  Object.keys(blocks).forEach((block) => {
    const alignment = localStorage.getItem(block);
    if (alignment === "right") {
      blocks[block].style.textAlign = "right";
    }
  });

  form.addEventListener("mouseout", () => {
    const selectedRadio = form.querySelector("input[name='block']:checked");
    if (selectedRadio) {
      const selectedBlock = selectedRadio.value;
      blocks[selectedBlock].style.textAlign = "right";
      localStorage.setItem(selectedBlock, "right");
    }
  });
});

// 5
document.addEventListener("DOMContentLoaded", () => {
  const contentBlocks = document.querySelectorAll(
    ".block-2, .block-4, .block-5"
  );

  const form = document.createElement("form");
  form.innerHTML = `
      <label>Виберіть блок для списку:
        <select id="blockSelector">
          <option value="block-2">Блок 2</option>
          <option value="block-4">Блок 4</option>
          <option value="block-5">Блок 5</option>
        </select>
      </label>
      <br>
      <label>Введіть пункт списку:
        <input type="text" id="listItemInput" placeholder="Новий пункт" required>
      </label>
      <button type="button" id="addItemButton">Додати</button>
      <button type="button" id="saveListButton">Зберегти</button>
    `;
  document.body.insertBefore(form, document.body.firstChild);

  const blockSelector = document.getElementById("blockSelector");
  const listItemInput = document.getElementById("listItemInput");
  const addItemButton = document.getElementById("addItemButton");
  const saveListButton = document.getElementById("saveListButton");

  window.addEventListener("beforeunload", () => {
    localStorage.clear();
  });

  addItemButton.addEventListener("click", () => {
    const selectedBlock = document.querySelector(`.${blockSelector.value}`);
    const listItemText = listItemInput.value.trim();

    if (listItemText) {
      let list = selectedBlock.querySelector("ol");
      if (!list) {
        list = document.createElement("ol");
        selectedBlock.appendChild(list);
      }

      const listItem = document.createElement("li");
      listItem.textContent = listItemText;
      list.appendChild(listItem);

      listItemInput.value = "";
    }
  });

  saveListButton.addEventListener("click", () => {
    const selectedBlock = blockSelector.value;
    const blockContent = document.querySelector(`.${selectedBlock}`);
    const list = blockContent.querySelector("ol");

    if (list) {
      const items = Array.from(list.querySelectorAll("li")).map(
        (item) => item.textContent
      );
      localStorage.setItem(selectedBlock, JSON.stringify(items));
    }
  });

  contentBlocks.forEach((block) => {
    const blockClass = block.className;
    const savedList = JSON.parse(localStorage.getItem(blockClass));

    if (savedList) {
      const list = document.createElement("ol");
      savedList.forEach((itemText) => {
        const listItem = document.createElement("li");
        listItem.textContent = itemText;
        list.appendChild(listItem);
      });
      block.appendChild(list);
    }
  });
});
