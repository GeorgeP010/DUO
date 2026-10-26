window.addEventListener('load', function () {
    const loadingScreen = document.querySelector('.loading-screen');
    const coinsContainer = document.querySelector('.coins-container');
    const navbar = document.querySelector('.navbar');
  
    let coinCount = 0;
    const maxCoins = 4;
  
    function createCoin() {
      if (coinCount >= maxCoins) return;
  
      const coin = document.createElement('div');
      coin.classList.add('coin');
      coinsContainer.appendChild(coin);
  
      coinCount++;
  
      setTimeout(() => {
        coin.remove();
        coinCount--;
      }, 2000);
    }
  
    const coinInterval = setInterval(createCoin, 200);
  
    setTimeout(() => {
      clearInterval(coinInterval);
      loadingScreen.style.display = 'none'; 
      navbar.style.visibility = 'visible';  
    }, 4600);
  });
  