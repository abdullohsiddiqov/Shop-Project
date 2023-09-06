import { User } from "../entites/user";
import { choise } from "./choise";
import { login } from "./login";
import { register } from "./register";

const productHTML = `
    <nav class="navbar bg-body-tertiary p-position-sticky t-0">
      <div class="container-fluid">
        <a class="navbar-brand">SHOP</a>
        <div class="d-flex gap-3">
          <button
            type="button"
            class="btn btn-outline-primary position-relative d-none"
          >
            <i class="bi bi-cart4"></i>
            <span
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger visually-hidden" id="badge"
            >
              99+
            </span>
          </button>
          <button id="choise" class=" btn btn-outline-primary" style="border-color:blue;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
        </svg> Your choise</button>
        <div class = "red"><span class="quantity" style="background-color:red;border-radius:50%;display:flex;justify-content:center; align-items:center;height:20px;color:#fff;position:relative;right:30px;bottom:10px;padding:5px 5px;">0</span></div>
          <button class="btn-login btn btn-outline-primary" style="display:block;" id="logIn">Log in</button>
          <svg id="exit"; class=" btn btn-outline-primary" style="width:50px; height:50px; display:none;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg>
        </div>
      </div>
    </nav> 

    <div class="container mt-5">
      <div class="row row-cols-1 row-cols-md-4 g-4" id="cards"></div>
    </div>
`;
const createCardHTML = (
  title: string,
  thumbnail: string | number,
  price: string
) => `
  <div class="col">
    <div class="card h-100" style="box-shadow: 0 10px 10px #757676;");
    ">
      <div class="card-img-top card__img";
      " ><img style="position:relative; left:20px; width :250px; height:170px;border-radius:10px;" src="${thumbnail}" alt=""></div>
      <div class="card-body" id="card__body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">$${price}</p>
        <button class="btn btn-primary card__btn">Add to basket</button>
      </div>
    </div>
  </div>
`;

export const products = async () => {
  document.body.innerHTML = productHTML;

  const container = document.querySelector("#cards") as HTMLDivElement;
  const badge = document.querySelector("#badge") as HTMLSpanElement;
  let counter = 0;

  try {
    const response = await fetch("https://dummyjson.com/products?limit=90");
    const json = await response.json();
    console.log(json.products);

    for (const product of json.products) {
      container.innerHTML += createCardHTML(
        product.title,
        product.thumbnail,
        product.price
      );
      console.log(product.thumbnail);
    }

    container.addEventListener("click", (event) => {
      const target = event.target as HTMLButtonElement;
      let quantity:HTMLSpanElement = document.querySelector(".quantity") as HTMLSpanElement;
      if (target.classList.contains("card__btn")) {
        target.disabled = true;

        counter++;
        quantity.innerHTML = counter.toString();
        

        badge.innerText = `${counter > 50 ? "50+" : counter}`;
        badge.classList.remove("visually-hidden");
      }
    });

    const signUpButton = document.querySelector("#logIn") as HTMLButtonElement;
    signUpButton.addEventListener("click", () => {
      signUpButton.style.display = "none"; // Set the display property to 'none'
      register();
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  const choisButton = document.querySelector("#choise") as HTMLButtonElement;
  choisButton.addEventListener("click", () => {
    choise();
  });
  const exitButton = document.getElementById("exit") as HTMLButtonElement;
  exitButton.addEventListener("click", () => {
    register();

  });

};

products();

export function exitSvg(){ 
  let exit:HTMLOrSVGImageElement = document.querySelector("#exit") as HTMLOrSVGImageElement
  exit.style.display = "block";
}
export function BtnLogin(){ 
  const btn_login:HTMLButtonElement = document.querySelector(".btn-login");
  btn_login.style.display = "none";
}
