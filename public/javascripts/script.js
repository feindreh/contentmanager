const dropDown = document.querySelector('#dropdown');
const menu = document.querySelector('#menu');

function dropItDown() {
  menu.style.visibility = 'visible';
}
function closeDropDown() {
  menu.style.visibility = 'hidden';
}

dropDown.addEventListener('click', () => {
  dropItDown();
});
dropDown.addEventListener('mouseover', () => {
  dropItDown();
});
dropDown.addEventListener('mouseleave', () => {
  closeDropDown();
});
