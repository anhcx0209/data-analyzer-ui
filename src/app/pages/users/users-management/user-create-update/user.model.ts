export class User {
  id: number;
  username: string;
  email: string;
  updated_at: string;
  created_at: string;
  role: string;
  status: string;

  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.updated_at = user.updated_at;
    this.created_at = user.created_at;
    this.role = user.role;
    this.status = user.status;
  }
}
