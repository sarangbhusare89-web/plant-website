/* =========================================================
   PLANT FINDER JAVASCRIPT
   ========================================================= */

// 1. PLANT DATASET
const plantDatabase = [
  {
    id: "snake-plant",
    name: "Snake Plant (Sansevieria)",
    category: "Indoor Air Purifier",
    environment: "indoor",
    sunlight: ["low", "medium", "bright"],
    watering: "low",
    maintenance: "easy",
    purpose: ["air-purifying", "beginner", "decoration"],
    image: "../images/snake-plant.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1599598425947-0206455429d5?q=80&w=600&auto=format&fit=crop",
    description: "Hardy, air-purifying plant that thrives on neglect. Perfect for bedrooms and dimly lit corners.",
    lightText: "Low to Bright Indirect",
    waterText: "Water Every 2-3 Weeks",
    careText: "Super Easy",
    link: "../productpage/snakelant.html"
  },
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    category: "Tropical Indoor Feature",
    environment: "indoor",
    sunlight: ["medium", "bright"],
    watering: "moderate",
    maintenance: "easy",
    purpose: ["decoration", "beginner"],
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600&auto=format&fit=crop",
    description: "Famous for its Swiss-cheese split leaves. Adds a dramatic tropical aesthetic to bright living spaces.",
    lightText: "Medium to Bright Indirect",
    waterText: "Water Weekly",
    careText: "Easy Care",
    link: "../plantshop/plantshop.html"
  },
  {
    id: "areca-palm",
    name: "Areca Palm",
    category: "Outdoor / Indoor Palm",
    environment: "indoor",
    sunlight: ["medium", "bright"],
    watering: "moderate",
    maintenance: "moderate",
    purpose: ["air-purifying", "decoration"],
    image: "../images/areca-palm.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=600&auto=format&fit=crop",
    description: "Feathery tropical fronds that naturally humidify and purify indoor air or bright sheltered balconies.",
    lightText: "Bright Indirect Light",
    waterText: "Water 1-2 Times a Week",
    careText: "Moderate",
    link: "../productpage/areca-palm.html"
  },
  {
    id: "peace-lily",
    name: "Peace Lily",
    category: "Flowering Air Purifier",
    environment: "indoor",
    sunlight: ["low", "medium"],
    watering: "moderate",
    maintenance: "easy",
    purpose: ["air-purifying", "decoration", "beginner"],
    image: "../images/peace-lily.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?q=80&w=600&auto=format&fit=crop",
    description: "Elegant white blooms with glossy dark foliage.",
    lightText: "Low to Medium Shade",
    waterText: "Keep Moist / Weekly",
    careText: "Easy Care",
    link: "../productpage/peace-lily.html"
  },
  {
    id: "pothos",
    name: "Golden Pothos",
    category: "Trailing Vine",
    environment: "indoor",
    sunlight: ["low", "medium", "bright"],
    watering: "low",
    maintenance: "easy",
    purpose: ["beginner", "decoration", "air-purifying"],
    image: "../images/pothos.jpg",
    fallbackImage: "https://images.unsplash.com/photo-1596724809804-94982635905c?q=80&w=600&auto=format&fit=crop",
    description: "Fast-growing trailing vine ideal for hanging planters or shelves.",
    lightText: "Low to Bright Light",
    waterText: "Water When Top Soil Dries",
    careText: "Beginner Friendly",
    link: "../productpage/pothos.html"
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    category: "Medicinal Succulent",
    environment: "outdoor",
    sunlight: ["bright"],
    watering: "low",
    maintenance: "easy",
    purpose: ["beginner", "air-purifying"],
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=600&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=600&auto=format&fit=crop",
    description: "Sun-loving succulent known for its soothing gel.",
    lightText: "Direct Bright Sun",
    waterText: "Water Sparingly",
    careText: "Super Easy",
    link: "../plantshop/plantshop.html"
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    category: "Statement Tree",
    environment: "indoor",
    sunlight: ["bright"],
    watering: "moderate",
    maintenance: "high",
    purpose: ["decoration"],
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop",
    description: "Architectural favorite with broad violin-shaped leaves.",
    lightText: "Bright Consistent Light",
    waterText: "Water Weekly",
    careText: "High Attention",
    link: "../plantshop/plantshop.html"
  },
  {
    id: "bougainvillea",
    name: "Bougainvillea",
    category: "Outdoor Flowering Climber",
    environment: "outdoor",
    sunlight: ["bright"],
    watering: "moderate",
    maintenance: "moderate",
    purpose: ["decoration"],
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=600&auto=format&fit=crop",
    fallbackImage: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=600&auto=format&fit=crop",
    description: "Vibrant outdoor bloomer that loves hot sunny balconies and gardens.",
    lightText: "Full Outdoor Sunlight",
    waterText: "Moderate Water",
    careText: "Moderate Care",
    link: "../plantshop/plantshop.html"
  }
];

// 2. USER PREFERENCES
const currentPreferences = {
  environment: null,
  sunlight: null,
  watering: null,
  maintenance: null,
  purpose: null
};

// 3. PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  const quizGroups = document.querySelectorAll(".quiz-group");

  quizGroups.forEach((group) => {
    const questionKey = group.getAttribute("data-question");
    const buttons = group.querySelectorAll(".quiz-btn");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("active");
        });

        btn.classList.add("active");

        const value = btn.getAttribute("data-value");

        if (questionKey && value) {
          currentPreferences[questionKey] = value;
        }
      });
    });
  });

  // Find button
  const findBtn = document.getElementById("findPlantsBtn");

  if (findBtn) {
    findBtn.addEventListener("click", () => {
      findAndRenderRecommendations();

      const results = document.getElementById("results");

      if (results) {
        results.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  }

  // Reset button
  const resetBtn = document.getElementById("resetQuizBtn");

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      currentPreferences.environment = null;
      currentPreferences.sunlight = null;
      currentPreferences.watering = null;
      currentPreferences.maintenance = null;
      currentPreferences.purpose = null;

      document.querySelectorAll(".quiz-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
    });
  }
});

// 4. FIND RECOMMENDED PLANTS
function findAndRenderRecommendations() {
  const hasSelections = Object.values(currentPreferences)
    .some((value) => value !== null);

  if (!hasSelections) {
    alert("Please select at least one preference.");
    return;
  }

  const scoredPlants = plantDatabase.map((plant) => {
    let score = 0;

    // Environment
    if (
      currentPreferences.environment &&
      plant.environment === currentPreferences.environment
    ) {
      score += 35;
    }

    // Sunlight
    if (
      currentPreferences.sunlight &&
      plant.sunlight.includes(currentPreferences.sunlight)
    ) {
      score += 25;
    }

    // Watering
    if (
      currentPreferences.watering &&
      plant.watering === currentPreferences.watering
    ) {
      score += 20;
    }

    // Maintenance
    if (
      currentPreferences.maintenance &&
      plant.maintenance === currentPreferences.maintenance
    ) {
      score += 10;
    }

    // Purpose
    if (
      currentPreferences.purpose &&
      plant.purpose.includes(currentPreferences.purpose)
    ) {
      score += 10;
    }

    return {
      plant: plant,
      score: score
    };
  });

  const matchingResults = scoredPlants
    .filter((item) => item.score > 20)
    .sort((a, b) => b.score - a.score);

  renderPlantCards(matchingResults);
}

// 5. DISPLAY PLANT CARDS
function renderPlantCards(results) {
  const container = document.getElementById("recommendationsGrid");

  if (!container) return;

  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = `
      <div class="empty-results">
        <h3>No Plant Found</h3>
        <p>Try different preferences.</p>
      </div>
    `;
    return;
  }

  results.forEach((item) => {
    const plant = item.plant;
    const card = document.createElement("div");

    card.className = "recommend-card";

    card.innerHTML = `
      <div class="recommend-image-wrapper">
        <span class="recommend-match-badge">
          ${Math.min(100, Math.max(70, item.score))}% Match
        </span>

        <img 
          src="${plant.image}" 
          alt="${plant.name}"
          onerror="this.onerror=null; this.src='${plant.fallbackImage}';"
        />
      </div>

      <div class="recommend-card-body">
        <span class="recommend-category">${plant.category}</span>

        <h3 class="recommend-title">${plant.name}</h3>

        <p class="recommend-desc">${plant.description}</p>

        <div class="recommend-specs">
          <span class="spec-badge">${plant.lightText}</span>
          <span class="spec-badge">${plant.waterText}</span>
          <span class="spec-badge">${plant.careText}</span>
        </div>

        <div class="recommend-card-footer">
          <a href="${plant.link}" class="btn-view-plant">
            View Plant Details →
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}