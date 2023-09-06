import { login } from "./login";
import { UserService } from "../services/user";
import { userService } from "../services/index";

const registerHTML = `<div style="height: 100vh" class="container d-flex justify-content-center align-items-center">
<form class="w-50" id="register-form">
 <h2>Register Form</h2>
 <div class="mb-3">
  <label for="firstName" class="form-label">First Name</label>
  <input placeholder="Enter first name" class="form-control" id="firstName" required  />
 </div>
 <div class="mb-3">
  <label for="lastName" class="form-label">Last Name</label>
  <input placeholder="Enter last name" class="form-control" id="lastName" required />
 </div>
 <div class="mb-3">
  <label for="phone" class="form-label">Phone number</label>
  <input type="tel" placeholder="Enter phone number" class="form-control" id="phone"  required />
 </div>
 <div class="mb-3">
  <label for="password" class="form-label">Password</label>
  <input type="password" placeholder="Enter password" class="form-control" id="password" required  />
 </div>
 <div style="cursor: pointer" class="mb-3 text-secondary" id="navigate-login">
  Do you have an account ?
 </div>
 <button type="submit" class="btn btn-primary">Register</button>
</form>
</div>`;

export const register = () => {
	document.body.innerHTML = registerHTML;

	const form = document.querySelector("form") as HTMLFormElement;
	const navigateRegister = form.querySelector("#navigate-login") as HTMLDivElement;
	navigateRegister.onclick = () => login();
	const { firstName, lastName, phone, password } = form.elements as unknown as Record<
		string,
		HTMLInputElement
	>;

	form.onsubmit = (e) => {
		e.preventDefault();

		const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
		submitBtn.innerText = "Loading...";
		submitBtn.disabled = true;

		const user = userService.register(firstName.value, lastName.value, phone.value, password.value);


		setTimeout(() => {
			submitBtn.innerText = "Register";
			submitBtn.disabled = false;
			login();
		}, 1000);
	};
};
