const menuList = document.querySelector(".menu");
const loading = document.querySelector(".loading-text");
const buttons_container = document.querySelector(".buttons-container");
const search_input = document.getElementById("search-input");

search_input.addEventListener("input", searchItemsByName);

let menu_item = [];
const fetchMenuItems = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
    );
    const data = await response.data;
    menu_item = data.meals;

    const categories = menu_item.reduce(
      (acc, item) => {
        if (item.strCategory && !acc.includes(item.strCategory)) {
          acc.push(item.strCategory);
        }
        return acc;
      },
      ["all"]
    );

    createbtncategory(categories);

    loading.style.display = "none";
    displayMenuItems(menu_item);
  } catch (error) {
    menuList.innerHTML = `<h2 class='not-found-text'>${error.message}</h2>`;
  }
};

const displayMenuItems = (items) => {
  menuList.innerHTML = "";

  if (items.length === 0) {
    menuList.innerHTML = `<h2 class='not-found-text'>item dosent exist !!! </h2>`;
  }

  items.map((item) => {
    const menuItem = `
    <a href="food.html?id=${item.idMeal}">
      <div class="menu-item">
        <img src="${item.strMealThumb}" alt="${item.strMeal}" class="menu-img">
        <h3>${item.strMeal}</h3>
      </div>
    </a>
    `;

    menuList.innerHTML += menuItem;
    console.log(item);
  });
};

function searchItemsByName() {
  const searchText = search_input.value.toLowerCase().trim();

  const filteredItem = menu_item.filter((item) => {
    const matchedItem = item.strMeal.toLowerCase().includes(searchText);
    return matchedItem;
  });

  displayMenuItems(filteredItem);
}

const createbtncategory = (categories) => {
  categories.map((category) => {
    const btn = `
      <button type="button" data-category='${category}' onclick='filterItemsByCategoty(this)' class="filter-btn">${category}</button>
    `;
    buttons_container.innerHTML += btn;
  });
};

const filterItemsByCategoty = (btn) => {
  const category = btn.dataset.category;
  if (category === "all") {
    displayMenuItems(menu_item);
  } else {
    const filteredItems = menu_item.filter((item) => {
      const matchedItem =
        item.strCategory.toLowerCase() === category.toLowerCase();
      return matchedItem;
    });
    console.log(filteredItems);
    search_input.value = "";
    displayMenuItems(filteredItems);
  }
};

fetchMenuItems();
