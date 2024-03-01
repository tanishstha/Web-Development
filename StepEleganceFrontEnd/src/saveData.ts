interface User {
  userEmail: string;
  password: string;
}

let users: User[] = []; // In-memory array to store user objects

// Create a new user
function createUser(newUser: User): void {
  users.push(newUser);
}

// Read all users
function readAllUsers(): User[] {
  return users;
}

// Read a user by userEmail
function readUserByEmail(userEmail: string): User | undefined {
  return users.find(user => user.userEmail === userEmail);
}

// Update a user's password by userEmail
function updateUserPassword(userEmail: string, newPassword: string): void {
  const userIndex = users.findIndex(user => user.userEmail === userEmail);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
  }
}

// Delete a user by userEmail
function deleteUserByEmail(userEmail: string): void {
  users = users.filter(user => user.userEmail !== userEmail);
}

// Check if a user exists by userEmail
function userExists(userEmail: string): boolean {
  return users.some(user => user.userEmail === userEmail);
}

// Example usage:
createUser({ userEmail: "example@example.com", password: "password123" });
console.log(readAllUsers());
console.log(readUserByEmail("example@example.com"));
updateUserPassword("example@example.com", "newpassword456");
console.log(readAllUsers());
deleteUserByEmail("example@example.com");
console.log(readAllUsers());
console.log(userExists("example@example.com")); // Should return false
