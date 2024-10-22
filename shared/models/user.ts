export interface User {
  telegramUserId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  bio?: string;
}
