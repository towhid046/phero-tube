const loadData = async (id, isSort) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();
    let categories = data.data;
    if (categories.length < 1) {
      throw "/images/error-page.png";
    } else {
      isSort && sortTheCatagories(categories);
      displayMainHandelar(categories);
    }
  } catch (error) {
    const cardsContainer = document.getElementById("cards_container");
    errorPage(error, cardsContainer);
  }
};

// display main handelar:
const displayMainHandelar = (categories) => {
  const cardsContainer = document.getElementById("cards_container");
  cardsContainer.innerHTML = "";

  categories.forEach((category) => {
    const { thumbnail, title, authors, others } = category;

    const div = document.createElement("div");
    div.classList = `card bg-base-100 shadow-xl`;

    div.innerHTML = `
        <figure>
            <img
            class="md:h-[200px] rounded-xl"
            src="${thumbnail}"
            alt="Image"
            />
        </figure>
        <div class="flex gap-3 p-5">
            <div>
            <img class="rounded-full w-12 h-12" src="${authors?.[0]?.profile_picture}" alt="Image Here" />
            </div>
            <div class="space-y-1">
            <h3 class="text-base font-semibold">${title}</h3>
            <p>${authors?.[0]?.profile_name}</p>
            <p>${others?.views} Views</p>
            </div>
        </div>
    `;
    cardsContainer.appendChild(div);
  });
};

// error page:
const errorPage = (error, cardsContainer) => {
  cardsContainer.innerHTML = `
    <div class="col-span-4 container text-center ">
        <img class="w-44 mb-6 mx-auto" src="${error}" alt="Error"/>
        <h2 class="text-2xl  font-bold">Opps! Sorry, Ther is no content here<h2/>
    </div>
    `;
};
// load buttons data:
const loadButtons = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const buttons = data.data;
  displayButtonsHandelar(buttons);
  //   set color to all for the first time
  setColorById("1000");
};

// display buttons:
const displayButtonsHandelar = (buttons) => {
  const buttonsContainer = document.getElementById("buttons_container");
  buttonsContainer.innerHTML = `
    <ul class="flex justify-center gap-5">
    ${buttons
      .map(
        (button) =>
          `<button onclick="categoryBtnClickHandelar(${button.category_id})" id="${button.category_id}" class="categories-btns btn font-semibold hover:bg-red-500">${button.category}</button>`
      )
      .join("")}
    </ul>
    `;
};

// category btn click handelar:
const categoryBtnClickHandelar = (buttonId) => {
  const categoriesBtns = document.querySelectorAll(".categories-btns");
  loadData(buttonId);
  removeColor(categoriesBtns);
  setColorById(buttonId);
};

const setColorById = (id) => {
  const element = document.getElementById(id);
  element.classList.add("bg-red-500");
  element.classList.add("text-white");
};

// const setColorAndBgById = (btn, id) => {}
const removeColor = (categoriesBtns) => {
  categoriesBtns.forEach((btn) => {
    btn.classList.remove("bg-red-500");
    btn.classList.remove("text-white");
  });
};

// sort by view button click handelar:
const sortViewBtnClickHandelar = () => {
  const isSort = true;
  loadData("1000", isSort);
};

// sort the categories
const sortTheCatagories = (categories) => {
  categories = categories.sort((e1, e2) =>
    parseFloat([e1.others.views].pop()) < parseFloat([e2.others.views].pop())
      ? 1
      : -1
  );
};

loadButtons();
loadData("1000");
