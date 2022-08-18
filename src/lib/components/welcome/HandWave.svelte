<span>👋</span>

<style>
  span {
    display: inline-block;
    transform-origin: 70% 70%;

    animation: 2.5s ease-in 1.2s 1 normal both running waveAnimation;
  }

  @keyframes waveAnimation {
    0% {
      transform: rotate(0deg);
    }
    5% {
      transform: rotate(16deg);
    }
    10% {
      transform: rotate(-12deg);
    }
    15% {
      transform: rotate(20deg);
    }
    20% {
      transform: rotate(-6deg);
    }
    25% {
      transform: rotate(16deg);
    }
    30% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
