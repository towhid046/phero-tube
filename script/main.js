const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );

  const data = await res.json();
  const categories = data.data
  displayMainHandelar(categories)
};

// display main handelar:
const displayMainHandelar = (categories) => {
    const cardsContainer = document.getElementById('cards_container');
    categories.forEach(category => {
    const {thumbnail, title, authors, others  } = category;
        
    const div = document.createElement('div');
    div.classList = `card bg-base-100 shadow-xl`

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
    ` ;
    cardsContainer.appendChild(div);   
    });

}

loadData()