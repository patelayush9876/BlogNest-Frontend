import type { UpdateUserSettingsInput } from "../interfaces/userSettingsInterface";
import api from "./api";

export const getMySettings = async () => {
  const response = await api.get("/settings/me");
  return response.data;
};

export const updateMySettings = async (data: UpdateUserSettingsInput) => {
  const response = await api.patch("/settings/me", data);
  return response.data;
};

// Privacy toggles
export const togglePrivateProfile = async (value: boolean) =>
  updateMySettings({ "privacy.privateProfile": value });

export const toggleShowEmail = async (value: boolean) =>
  updateMySettings({ "privacy.showEmail": value });

export const toggleAllowComments = async (value: boolean) =>
  updateMySettings({ "privacy.allowComments": value });

// Email notifications
export const toggleEmailNotifications = async (value: boolean) =>
  updateMySettings({ "notifications.email.enabled": value });

export const toggleNewCommentEmails = async (value: boolean) =>
  updateMySettings({ "notifications.email.newComments": value });

export const toggleNewFollowerEmails = async (value: boolean) =>
  updateMySettings({ "notifications.email.newFollowers": value });

// Push notifications
export const togglePushNotifications = async (value: boolean) =>
  updateMySettings({ "notifications.push.enabled": value });
