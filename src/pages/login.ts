import { userService } from "../services/index";
import { UserService } from "../services/user";
import { products } from "./shopping";
import { exitSvg } from "./shopping";
import { BtnLogin } from "./shopping";
// import { yourChoice } from "./shopping";
const loginHTML = `<div style="height: 100vh" class="container d-flex justify-content-center align-items-center">
<form class="w-50">
 <h2>Login Form</h2>
 <div class="mb-3">
  <label for="phone" class="form-label">Phone number</label>
  <input type="tel" placeholder="Enter phone number" class="form-control" id="phone" />
 </div>
 <div class="mb-3">
  <label for="password" class="form-label">Password</label>
  <input
   type="password"
   placeholder="Enter password"
   class="form-control"
   id="password"
  />
 </div>
 <div style="cursor: pointer" class="mb-3 text-secondary" id="navigate-register">
  Don't you have an account ?
 </div>
 <button type="submit" class="btn-login btn btn-primary">Login</button>
</form>
</div>`;

export const login = () => {
  document.body.innerHTML = loginHTML;
  const form = document.querySelector("form") as HTMLFormElement;
  const phone = form.querySelector("#phone") as HTMLInputElement;
  const password = form.querySelector("#password") as HTMLInputElement;
  form.onsubmit = (e) => {
    e.preventDefault();

    const { phone, password } = form.elements as unknown as Record<
      string,
      HTMLInputElement
    >;

    const user = userService.login(phone.value, password.value);
    products();
    exitSvg();
    BtnLogin();
    let ava:HTMLDivElement = document.querySelector(".User-avatar");
    ava.style.display = "flex";
    ava.innerHTML = phone.value.toString().slice(0,1);
    // yourChoice()
  };
};
