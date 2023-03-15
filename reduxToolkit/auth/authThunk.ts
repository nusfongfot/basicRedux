import { getCurrentAccount } from "@/services/auth.service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentAccountThunk = createAsyncThunk(
    "auth/getCurrentAccountThunk",
    async (userId: string | null) => {
        try {
           const account = await getCurrentAccount(userId!)
           return account 
        } catch (error) {
            throw error
        }
    }
)