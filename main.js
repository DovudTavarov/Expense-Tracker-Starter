const balanceAmount = document.getElementById("balance");
const moneyPlusAmount = document.getElementById("money-plus");
const moneyMinusAmount = document.getElementById("money-minus");
const historyList = document.getElementById("list");
const addTransactionForm = document.getElementById("form");
const newTransactionText = document.getElementById("text");
const newTransactionAmount = document.getElementById("amount");

let totalPlus = 0;
let totalMinus = 0;
let totalBalance = 0;

function clickAddFn(event) {
  event.preventDefault();

  let amount = Number(newTransactionAmount.value);
  let text = newTransactionText.value;

  if (amount > 0) {
    totalPlus += amount;
    totalBalance += amount;
    moneyPlusAmount.innerHTML = `$
        ${totalPlus.toFixed(2)}`;
    historyList.innerHTML += `<li class="plus">
                              ${text}
                              <span>+${amount}</span>
                              <button data-amount="${amount}" data-type="plus" class="delete-btn">x</button>
                             </li>`;
  } else if (amount < 0) {
    totalMinus += amount;
    totalBalance += amount;
    moneyMinusAmount.innerHTML = `$
        ${totalMinus.toFixed(2)}`;
    historyList.innerHTML += `<li class="minus">
                            ${text}
                            <span>${amount}</span>
                            <button data-amount="${amount}" data-type="minus" class="delete-btn">x</button>
                             </li>`;
  }
  balanceAmount.innerHTML = `$${totalBalance.toFixed(2)}`;
  newTransactionText.value = "";
  newTransactionAmount.value = "";

  addDeleteEventListeners();
}

addTransactionForm.addEventListener("submit", clickAddFn);

function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");

  deleteButtons.forEach((button) => {
    button.removeEventListener("click", removeAddList);
    button.addEventListener("click", removeAddList);
  });
}

function removeAddList(event) {
  const listItem = event.target.parentElement;
  const amount = Number(event.target.getAttribute("data-amount"));
  const type = event.target.getAttribute("data-type");

  if (type === "plus") {
    totalPlus -= amount;
    totalBalance -= amount;
    moneyPlusAmount.innerHTML = `$${totalPlus.toFixed(2)}`;
  } else if (type === "minus") {
    totalMinus -= amount;
    totalBalance -= amount;
    moneyMinusAmount.innerHTML = `$${totalMinus.toFixed(2)}`;
  }

  balanceAmount.innerHTML = `$${totalBalance.toFixed(2)}`;

  listItem.remove();
}
