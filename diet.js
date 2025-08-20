// Get query params
const urlParams = new URLSearchParams(window.location.search);
const weight = parseInt(urlParams.get('weight'));
const goal = urlParams.get('goal');
const exercise = urlParams.get('exercise');

let calorieNeed;

// Calculate base calories
if (goal === 'weight_loss') {
  calorieNeed = weight * (exercise === 'regular' ? 27 : exercise === 'light' ? 24 : 20);
} else {
  calorieNeed = weight * (exercise === 'regular' ? 40 : exercise === 'light' ? 35 : 30);
}

// Meal Breakdown
const mealPlan = [
  { name: 'Breakfast', ratio: 0.25 },
  { name: 'Lunch', ratio: 0.30 },
  { name: 'Snack', ratio: 0.15 },
  { name: 'Dinner', ratio: 0.30 },
];

const outputDiv = document.getElementById("dietOutput");

mealPlan.forEach(meal => {
  const cal = Math.round(calorieNeed * meal.ratio);
  const protein = Math.round((cal * 0.25) / 4); // 25% protein, 4 cal/g
  const carbs = Math.round((cal * 0.50) / 4);
  const fat = Math.round((cal * 0.25) / 9); // 25% fat, 9 cal/g

  const mealDiv = document.createElement("div");
  mealDiv.className = "meal-block";
  mealDiv.innerHTML = `
    <h3>${meal.name}</h3>
    <p>Calories: ${cal} kcal</p>
    <p>Protein: ${protein}g</p>
    <p>Carbs: ${carbs}g</p>
    <p>Fats: ${fat}g</p>
  `;
  outputDiv.appendChild(mealDiv);
});

const totalDiv = document.createElement("div");
totalDiv.innerHTML = `<h3>Total Daily Calories: ${calorieNeed} kcal</h3>`;
outputDiv.appendChild(totalDiv);
