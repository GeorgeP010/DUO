window.addEventListener('load', function () {
    const coinsContainer = document.querySelector('.coins-container');
  
    let coinCount = 0;
    const maxCoins = 2; // Aantal munten dat we willen laten vallen in de 5 seconden
  
    function createCoin() {
      if (coinCount >= maxCoins) return;
  
      const coin = document.createElement('div');
      coin.classList.add('coin'); // Voeg de 'coin' class toe zodat de munt de animatie heeft
      coinsContainer.appendChild(coin);
  
      coinCount++;
  
      // Verwijder de munt na 2 seconden zodat het niet blijft opstapelen
      setTimeout(() => {
        coin.remove();
        coinCount--;
      }, 2000); // Verwijder de munt na 2 seconden
    }
  
    // Maak munten in een oneindige lus voor 5 seconden
    const coinInterval = setInterval(createCoin, 200); // Maak elke 200 ms een munt
  
    setTimeout(() => {
      clearInterval(coinInterval); // Stop na 5 seconden
    }, 5000);
  });
  