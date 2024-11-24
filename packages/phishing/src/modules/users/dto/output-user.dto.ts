import { User, UserDocument } from "../users.model";

export class OutputUser {
  email: string;

  constructor(user: UserDocument) {
    this.email = user.email;
  }
}
