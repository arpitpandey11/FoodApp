document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.getElementById("searchBox");
  const resultsContainer = document.getElementById("results");

  fetch("foodData.json")
    .then((response) => response.json())
    .then((data) => {
      searchBox.addEventListener("input", function () {
        const query = searchBox.value.toLowerCase();
        const filtered = data.filter((item) =>
          item.name.toLowerCase().includes(query)
        );

        resultsContainer.innerHTML = "";

        filtered.forEach((item) => {
          const div = document.createElement("div");
          div.classList.add("food-item");

          div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Weight: ${item.weight}</p>
            <p>Calories: ${item.calories}</p>
            <p>Protein: ${item.protein}g</p>
            <p>Carbs: ${item.carbs}g</p>
            <p>Fat: ${item.fat}g</p>
            <p style="color:${item.health_tag?.color || 'gray'}">
              ${item.health_tag?.label || 'Unknown'}
            </p>
          `;

          resultsContainer.appendChild(div);
        });
      });
    })
    .catch((error) => {
      resultsContainer.innerHTML = "<p>Error loading food data.</p>";
      console.error("Error loading JSON:", error);
    });
});
document.getElementById('dietForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const weight = parseInt(document.getElementById('weight').value);
  const goal = document.getElementById('goal').value;
  const exercise = document.getElementById('exercise').value;

  let multiplier = 30; // base calorie multiplier per kg
  if (goal === 'loss') multiplier -= 5;
  else if (goal === 'gain') multiplier += 5;

  switch (exercise) {
    case 'none': multiplier -= 2; break;
    case 'light': multiplier += 0; break;
    case 'moderate': multiplier += 2; break;
    case 'heavy': multiplier += 5; break;
  }

  const dailyCalories = weight * multiplier;

  // Macros distribution (example: 40% carb, 30% protein, 30% fat)
  const protein = Math.round((dailyCalories * 0.3) / 4); // 1g protein = 4 cal
  const carbs = Math.round((dailyCalories * 0.4) / 4);
  const fat = Math.round((dailyCalories * 0.3) / 9); // 1g fat = 9 cal

  const mealPlan = `
    <h3>Your Daily Target: ${dailyCalories} kcal</h3>
    <p><strong>Protein:</strong> ${protein}g</p>
    <p><strong>Carbs:</strong> ${carbs}g</p>
    <p><strong>Fat:</strong> ${fat}g</p>
    <hr>
    <h4>Meal-wise Split:</h4>
    <ul>
      <li><strong>Breakfast:</strong> ${Math.round(dailyCalories * 0.25)} kcal</li>
      <li><strong>Lunch:</strong> ${Math.round(dailyCalories * 0.35)} kcal</li>
      <li><strong>Dinner:</strong> ${Math.round(dailyCalories * 0.30)} kcal</li>
      <li><strong>Snacks:</strong> ${Math.round(dailyCalories * 0.10)} kcal</li>
    </ul>
  `;

  document.getElementById('dietPlanOutput').innerHTML = mealPlan;
});
document.getElementById("generatePlanBtn").addEventListener("click", function () {
  const weight = document.getElementById("userWeight").value;
  const goal = document.getElementById("goal").value;
  const exercise = document.getElementById("exercise").value;

  if (weight && goal && exercise) {
    const url = `diet-plan.html?weight=${weight}&goal=${goal}&exercise=${exercise}`;
    window.location.href = url;
  } else {
    alert("Please fill all details to generate plan.");
  }
});
