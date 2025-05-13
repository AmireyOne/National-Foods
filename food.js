const urlParams = new URLSearchParams(window.location.search);
const container = document.querySelector(".container");

// دریافت مقدار یک پارامتر خاص
const id = urlParams.get("id");




let menu_items = [];

const fetchMenuItems = async () => {
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?s"
    );
    const data = await response.data;
    menu_items = data.meals;
    show(menu_items);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};
fetchMenuItems();

const show = (items) => {
  items.forEach((item) => {
    if (item.idMeal === id) {
      document.title = `${item.strMeal} - Recipe Details`;

      let ingredients_measure = [];
      

      for (let i = 1; i <= 20; i++) {
        const ingredient = item[`strIngredient${i}`];
        const measure = item[`strMeasure${i}`];

        // اگر ماده‌ای وجود داشت آن را اضافه می‌کنیم
        if (ingredient && ingredient.trim() !== "" && measure && measure.trim() !== "") {
          ingredients_measure.push([ingredient , measure]);
        }
        
      }
      console.log(ingredients_measure);

      container.innerHTML = `
            <div class="img-food">
                <img id="img" src="${item.strMealThumb}" alt="">
            </div>
            <h1>Food Name : ${item.strMeal}</h1>
            <h2>Food Area : ${item.strArea}</h2>
            <h2>Food Category : ${item.strCategory}</h2>
            <h2>Necessary materials :</h2>
            <ul class="list">
               
            </ul>
            <h2>Recipe :</h2>
            <p>${item.strInstructions}</p>


        `;

        const list = document.querySelector(".list")

        ingredients_measure.forEach(itm=>{
            list.innerHTML += `<li>${itm[0]} / ${itm[1]} </li>`
        })
    }
  });
};
