let selectedDoor = null;
let revealedGoatDoor = null;

function pickDoor(doorNumber) {
  if (selectedDoor === null) {
    selectedDoor = doorNumber;
    document.getElementById('message').innerHTML = `You picked Door ${doorNumber}. Do you want to switch?`;
    revealGoatDoor();
  }
}

function revealGoatDoor() {
  const remainingDoors = [1, 2, 3].filter(door => door !== selectedDoor);
  revealedGoatDoor = remainingDoors[Math.floor(Math.random() * 2)]; // Randomly reveal a goat door
}

function switchDoor() {
  if (selectedDoor !== null) {
    const remainingDoor = [1, 2, 3].filter(door => door !== selectedDoor && door !== revealedGoatDoor)[0];
    const outcome = remainingDoor === 1 ? 'Car' : 'Goat'; // Simulated outcome based on remaining door

    let message = '';
    if (outcome === 'Car') {
      message = 'Congratulations! You switched and won a car!';
    } else {
      message = 'Sorry! You switched and got a goat!';
    }

    document.getElementById('message').innerHTML = message;
    document.getElementById('switch-btn').style.display = 'none';
  }
}
