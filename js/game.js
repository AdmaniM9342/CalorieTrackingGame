// Add image paths to your food data
        // Put images in an "images" folder next to this HTML file
        const FOODS = [
            { name: "Cucumber", calories: 15, image: "images/cucumber.jpg" },
            { name: "Celery", calories: 16, image: "images/celery.jpg" },
            { name: "Lettuce", calories: 17, image: "images/lettuce.jpg" },
            { name: "Watermelon", calories: 30, image: "images/watermelon.jpg" },
            { name: "Strawberries", calories: 32, image: "images/strawberries.jpg" },
            { name: "Cantaloupe", calories: 34, image: "images/cantaloupe.jpg" },
            { name: "Peaches", calories: 39, image: "images/peaches.jpg" },
            { name: "Oranges", calories: 47, image: "images/oranges.jpg" },
            { name: "Apples", calories: 52, image: "images/apples.jpg" },
            { name: "Blueberries", calories: 57, image: "images/blueberries.jpg" },
            { name: "Cherries", calories: 63, image: "images/cherries.jpg" },
            { name: "Grapes", calories: 69, image: "images/grapes.jpg" },
            { name: "Pineapple", calories: 50, image: "images/pineapple.jpg" },
            { name: "Mango", calories: 60, image: "images/mango.jpg" },
            { name: "Bananas", calories: 89, image: "images/bananas.jpg" },
            { name: "Sweet Potato", calories: 86, image: "images/sweet-potato.jpg" },
            { name: "White Potato", calories: 77, image: "images/white-potato.jpg" },
            { name: "Corn", calories: 86, image: "images/corn.jpg" },
            { name: "Peas", calories: 81, image: "images/peas.jpg" },
            { name: "Carrots", calories: 41, image: "images/carrots.jpg" },
            { name: "Broccoli", calories: 34, image: "images/broccoli.jpg" },
            { name: "Spinach", calories: 23, image: "images/spinach.jpg" },
            { name: "Kale", calories: 35, image: "images/kale.jpg" },
            { name: "White Rice (cooked)", calories: 130, image: "images/white-rice.jpg" },
            { name: "Brown Rice (cooked)", calories: 112, image: "images/brown-rice.jpg" },
            { name: "Pasta (cooked)", calories: 131, image: "images/pasta.jpg" },
            { name: "Quinoa (cooked)", calories: 120, image: "images/quinoa.jpg" },
            { name: "Oatmeal (cooked)", calories: 71, image: "images/oatmeal.jpg" },
            { name: "White Bread", calories: 265, image: "images/white-bread.jpg" },
            { name: "Whole Wheat Bread", calories: 247, image: "images/wheat-bread.jpg" },
            { name: "Chicken Breast", calories: 165, image: "images/chicken.jpg" },
            { name: "Salmon", calories: 208, image: "images/salmon.jpg" },
            { name: "Tuna", calories: 130, image: "images/tuna.jpg" },
            { name: "Eggs", calories: 155, image: "images/eggs.jpg" },
            { name: "Greek Yogurt", calories: 59, image: "images/yogurt.jpg" },
            { name: "Milk (whole)", calories: 61, image: "images/milk.jpg" },
            { name: "Cheddar Cheese", calories: 403, image: "images/cheddar.jpg" },
            { name: "Mozzarella Cheese", calories: 280, image: "images/mozzarella.jpg" },
            { name: "Tofu", calories: 76, image: "images/tofu.jpg" },
            { name: "Black Beans (cooked)", calories: 132, image: "images/black-beans.jpg" },
            { name: "Chickpeas (cooked)", calories: 164, image: "images/chickpeas.jpg" },
            { name: "Lentils (cooked)", calories: 116, image: "images/lentils.jpg" },
            { name: "Almonds", calories: 579, image: "images/almonds.jpg" },
            { name: "Walnuts", calories: 654, image: "images/walnuts.jpg" },
            { name: "Peanuts", calories: 567, image: "images/peanuts.jpg" },
            { name: "Peanut Butter", calories: 588, image: "images/peanut-butter.jpg" },
            { name: "Avocado", calories: 160, image: "images/avocado.jpg" },
            { name: "Olive Oil", calories: 884, image: "images/olive-oil.jpg" },
            { name: "Butter", calories: 717, image: "images/butter.jpg" },
            { name: "Dark Chocolate", calories: 546, image: "images/chocolate.jpg" },
            { name: "Honey", calories: 304, image: "images/honey.jpg" },
            { name: "Sugar", calories: 387, image: "images/sugar.jpg" },
        ];

        let score = 0;
        let highScore = 0;
        let currentFood = null;
        let nextFood = null;
        let usedFoods = [];
        let showingAnswer = false;

        //from database
        export function setInitialHighScore(value) {
            highScore = value || 0;
            const el = document.getElementById('highScore');
            if (el) el.textContent = highScore;
          }
          
          import { updateProfileOnGameOver } from "./profile.js";

        function getRandomFood(excludeList = []) {
            const available = FOODS.filter(f => !excludeList.includes(f.name));
            if (available.length === 0) return null;
            return available[Math.floor(Math.random() * available.length)];
        }

        function startNewGame() {
            score = 0;
            usedFoods = [];
            showingAnswer = false;
            
            const first = getRandomFood();
            const second = getRandomFood([first.name]);
            
            currentFood = first;
            nextFood = second;
            usedFoods = [first.name, second.name];
            
            updateDisplay();
            document.getElementById('gameArea').classList.remove('hidden');
            document.getElementById('gameOverArea').classList.add('hidden');
            document.getElementById('buttonArea').classList.remove('hidden');
            const leaderboardArea = document.getElementById('leaderboardArea');
            if (leaderboardArea) leaderboardArea.classList.add('hidden');
        }

        function updateDisplay() {
            document.getElementById('score').textContent = score;
            document.getElementById('highScore').textContent = highScore;
            document.getElementById('currentFood').textContent = currentFood.name;
            document.getElementById('currentCalories').textContent = currentFood.calories;
            document.getElementById('currentImage').src = currentFood.image;
            document.getElementById('nextFood').textContent = nextFood.name;
            document.getElementById('nextImage').src = nextFood.image;
            
            const nextCard = document.getElementById('nextCard');
            nextCard.classList.remove('answer');
            
            if (showingAnswer) {
                const isMore = nextFood.calories > currentFood.calories;
                document.getElementById('nextCaloriesDisplay').innerHTML = `
                    <div class="calories-number">${nextFood.calories}</div>
                    <div class="calories-label">calories per 100g</div>
                    <div class="answer-text ${isMore ? 'correct' : 'incorrect'}">
                        ${isMore ? '✓ More calories!' : '✗ Less calories!'}
                    </div>
                `;
                nextCard.classList.add('answer');
            } else {
                document.getElementById('nextCaloriesDisplay').innerHTML = `
                    <div class="question-mark">?</div>
                    <div class="calories-label">Make your guess</div>
                `;
            }
        }

        function makeGuess(guess) {
            if (showingAnswer) return;
            
            const isCorrect = 
                (guess === 'more' && nextFood.calories > currentFood.calories) ||
                (guess === 'less' && nextFood.calories < currentFood.calories);
            
            showingAnswer = true;
            updateDisplay();
            document.getElementById('buttonArea').classList.add('hidden');
            
            setTimeout(() => {
                if (isCorrect) {
                    score++;
                    if (score > highScore) {
                        highScore = score;
                    }
                    
                    const next = getRandomFood(usedFoods);
                    if (next) {
                        currentFood = nextFood;
                        nextFood = next;
                        usedFoods.push(next.name);
                        showingAnswer = false;
                        updateDisplay();
                        document.getElementById('buttonArea').classList.remove('hidden');
                    } else {
                        showGameOver();
                    }
                } else {
                    showGameOver();
                }
            }, 1500);
        }

        function showGameOver() {
            document.getElementById('gameArea').classList.add('hidden');
            document.getElementById('gameOverArea').classList.remove('hidden');
            document.getElementById('finalScore').textContent = score;
            updateProfileOnGameOver(score).catch(console.error);
            
            const trophy = getTrophyLevel();
            if (trophy) {
                document.getElementById('trophyArea').classList.remove('hidden');
                document.getElementById('trophyIcon').className = `trophy trophy-${trophy.class}`;
                document.getElementById('trophyName').textContent = trophy.name + ' Trophy!';
                document.getElementById('trophyName').className = `trophy-name trophy-${trophy.class}`;
            } else {
                document.getElementById('trophyArea').classList.add('hidden');
            }
            
            const comparison = nextFood.calories > currentFood.calories ? 'more' : 'fewer';
            document.getElementById('explanation').textContent = 
                `${nextFood.name} (${nextFood.calories} cal) has ${comparison} calories than ${currentFood.name} (${currentFood.calories} cal)`;
        }

        // Leaderboard / game area toggles
        function showGameArea() {
            const gameArea = document.getElementById('gameArea');
            const gameOverArea = document.getElementById('gameOverArea');
            
            const leaderboardArea = document.getElementById('leaderboardArea');
            if (gameArea) gameArea.classList.remove('hidden');
            if (gameOverArea) gameOverArea.classList.add('hidden');
            if (leaderboardArea) leaderboardArea.classList.add('hidden');
        }

        function showLeaderboard() {
            const gameArea = document.getElementById('gameArea');
            const gameOverArea = document.getElementById('gameOverArea');
            const leaderboardArea = document.getElementById('leaderboardArea');

            // Refresh leaderboard data only when user explicitly opens it
            if (typeof window !== "undefined" && typeof window.loadLeaderboard === "function") {
                window.loadLeaderboard();
            }

            if (gameArea) gameArea.classList.add('hidden');
            if (gameOverArea) gameOverArea.classList.add('hidden');
            if (leaderboardArea) {
                leaderboardArea.classList.remove('hidden');
            }
        }

        function getTrophyLevel() {
            if (score >= FOODS.length - 1) return { name: "Champion", class: "champion" };
            if (score >= 20) return { name: "Gold", class: "gold" };
            if (score >= 10) return { name: "Silver", class: "silver" };
            if (score >= 5) return { name: "Bronze", class: "bronze" };
            return null;
        }
        
        // Start the game when page loads
        // NEW: initGame function that main.js will call
export function initGame() {
    // Make functions available to your HTML onclick handlers:
    // <button onclick="makeGuess('more')"> etc.
    window.makeGuess = makeGuess;
    window.startNewGame = startNewGame;
    window.showGameArea = showGameArea;
    window.showLeaderboard = showLeaderboard;

    // Start the first game
    startNewGame();
}