import { User } from "../entites/user";
export class UserRepository {
	private userList: Array<User> = []; // HM_0003

	private clone(user: User): User {
		return Object.assign(Object.create(User.prototype), user);
	}

	protected create(...users: User[]) {
		for (const user of users) {
			if (this.isExist(user.phoneNumber)) {
				throw new Error(`User already exists (${user.phoneNumber})`);
			}


			this.userList.push(this.clone(user));
		}
	}

	protected delete(userId: string) {
		const currentUser = this.getById(userId);
		this.userList = this.userList.filter((user) => user !== currentUser);
	}

	private isExist(userPhoneNumber: string): boolean {
		return !!this.userList.find((user) => user.phoneNumber === userPhoneNumber);
	}

	getList() {
		return this.userList;
	}

	getById(userId: string) {
		const user = this.userList.find((user) => user.getId() === userId);
		if (!user) {
			throw new Error(`User not found (${userId})`);
		}

		return user;
	}

	protected update(user: User) {
		const userIdx = this.userList.findIndex((c) => c.getId() === user.getId());

		if (userIdx === -1) throw new Error(`User not found (${user.getId()})`);

		this.userList.splice(userIdx, 1, user);
	}

	protected getUserByPhoneNumber(phoneNumber: string) {
		const user = this.userList.find((user) => user.phoneNumber === phoneNumber);
		if (!user) throw new Error(`User not found with (${phoneNumber})`);

		return user;
	}
}

export { User };
