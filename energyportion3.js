const tasks = [
    "take a deep breath.",
    "Put your hands up.",
    "Smile showing your teeth",
    "Drink a sip of water",
    "Strech your whole body",
    "Try touching your nose with your tounge",
    "Wiggle your toes",
    "Take two turn arounds",
    "Think about a dog playing with you",
    "Think about your favourite food",
    "Close your eyes and take a moment to relax.",
    "Sing your favourite song",
    "Hug yourself tightly",
    "Listen to your favourite song",
    "Close your eyes for a moment",
    // Add more tasks here
  ];
  
  let taskIndex = 0;
  let liquidFill = 0;
  let isGameFinished = false;
  
  function onOptionClick(option) {
    if (!isGameFinished) {
      if (option === "better") {
        liquidFill += 10;
        if (liquidFill >= 100) {
          liquidFill = 100;
          isGameFinished = true;
          triggerBubbles();
        }
      } else if (option === "worse") {
        liquidFill -= 5;
        if (liquidFill < 0) {
          liquidFill = 0;
        }

      }
  
      updateLiquidLevel();
      hideTaskText();
      showNextTask();
    }

    if (isGameFinished === true){
      if (option === "restart"){
        liquidFill=0;
        isGameFinished=false;
       taskIndex=0; 
      }

      if (option === "worse") {
        liquidFill -= 5;
        isGameFinished=false;
        if (liquidFill < 0) {
          liquidFill = 0;
        }
      }
      updateLiquidLevel();

    }

  }
  
  function updateLiquidLevel() {
    const liquidElement = document.querySelector(".liquid");
    gsap.to(liquidElement, {
      height: `${liquidFill}%`,
      duration: 0.5,
      ease: "power1.out",
      onComplete: function () {
        if (liquidFill === 100) {
          triggerBubbles();
          showRestartButton();
          isGameFinished = true;
          hideButtons();
        }
      }
    });
  }
  
  function showNextTask() {
    if (taskIndex < tasks.length) {
      const taskTextElement = document.getElementById("task-text");
      gsap.to(taskTextElement, {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: function () {
          taskTextElement.textContent = tasks[taskIndex++];
          gsap.to(taskTextElement, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: function () {
              setTimeout(() => {
                hideTaskText();
                showOptions();S
                //taskIndex++;
              }, 1000); // Show options after 1 second
            }
          });
        }
      });
    }
  }
  
  function hideTaskText() {
    const taskTextElement = document.getElementById("task-text");
    gsap.to(taskTextElement, { opacity: 0, duration: 0.5, ease: "power1.inOut" });
  }
  
  function showOptions() {
    const optionsElement = document.querySelector(".options");
    optionsElement.style.display = "flex";
  }
  
  function hideButtons() {
    const betterButton = document.getElementById("betterBtn");
    const worseButton = document.getElementById("worseBtn");
    betterButton.style.display = "none";
    worseButton.style.display = "none";
  }
  
  function triggerBubbles() {
    // Simulate bubble animation when the container fills up.
    for (let i = 0; i < 20; i++) {
      createBubble();
    }
  }
  
  function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "px";
    bubble.style.animationDuration = (Math.random() * 1 + 1) + "s";
    document.getElementById("greenliquid").appendChild(bubble);
    gsap.to(bubble, {
      y: -200,
      opacity: 0,
      duration: Math.random() * 1 + 1,
      onComplete: function () {
        bubble.remove();
      }
    });
  }
  
  // Initial setup
  updateLiquidLevel();
  