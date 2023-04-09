import { Account } from "@/app-types/accTypes";
import { getCurrentAccount, updateAccount } from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentAccountThunk = createAsyncThunk(
  "auth/getCurrentAccountThunk",
  async (userId: string) => {
    try {
      const account = await getCurrentAccount(userId);
      return account;
    } catch (error) {
      throw error;
    }
  }
);

export type argsUpdateAccountType = {
  userId?: string;
  acc?: Account;
};

export const updateAccountThunk = createAsyncThunk(
  "auth/updateAccountThunk",
  async (args: argsUpdateAccountType) => {
    try {
      const { userId, acc } = args;
      await updateAccount(userId!, acc!);
    } catch (error) {
      throw error;
    }
  }
);
