export interface UserPrivacySettings {
  privateProfile: boolean;
  showEmail: boolean;
  allowComments: boolean;
}

export interface UserEmailNotificationSettings {
  enabled: boolean;
  newComments: boolean;
  newFollowers: boolean;
}

export interface UserNotificationSettings {
  email: UserEmailNotificationSettings;
  push: {
    enabled: boolean;
  };
}

export interface UserSettings {
  _id: string;
  user: string;
  privacy: UserPrivacySettings;
  notifications: UserNotificationSettings;
  createdAt: string;
  updatedAt: string;
}

export type UpdateUserSettingsInput = Partial<Record<string, boolean>>;
