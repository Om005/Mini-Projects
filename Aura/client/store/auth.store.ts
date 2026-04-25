import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/lib/axios';
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

interface AuthState {
    id: string | null;
    email: string | null;
    name: string | null;
    isAuthenticated: boolean;
    isAuthLoading: boolean;
    isLoading: boolean;
    tempEmail: string | null;
}

const signupUser = createAsyncThunk(
    'auth/signupUser',
        async ({ email, password, recaptchaToken }: { email: string; password: string; recaptchaToken: string }, thunkAPI) => {
            try {
                console.log('Signup payload:', { email, password, recaptchaToken });
                const response = await api.post(`/api/auth/register`, 
                    { email, password, recaptchaToken },
                );
                return response.data;
            } catch (error: any) {
                return thunkAPI.rejectWithValue(error.response?.data || 'Signup failed');
            }
        }
);

const verifyUserAccount = createAsyncThunk(
    'auth/verifyUserAccount',
    async ({ uid, token }: { uid: string; token: string }, thunkAPI) => {
        try {
            const response = await api.post(`/api/auth/verify-account`, 
                { uid, token }, 
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Account verification failed');
        }
    }
);

const signinUser = createAsyncThunk(
    'auth/signinUser',
    async ({ email, password, recaptchaToken }: { email: string; password: string; recaptchaToken: string }, thunkAPI) => {   
        try {
            const response = await api.post(`/api/auth/signin`, 
                { email, password, recaptchaToken },
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Signin failed');
        }
    }
);

const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, thunkAPI) => {    
        try {
            const response = await api.post(`/api/auth/refresh-token`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Token refresh failed');
        }
    }
);

const checkAuthentication = createAsyncThunk(
    'auth/checkAuthentication',
    async (_, thunkAPI) => {
        try {
            const response = await api.post(`/api/auth/is-authenticated`);
            console.log("checking response in checkAuthentication:", response);
            return response.data;
        } catch (error: any) {
            const response = error?.response?.data || null;
            if(response && 'error' in response && response.error=="ACCESS_TOKEN_EXPIRED"){
                const refreshResponse = await thunkAPI.dispatch<any>(refreshToken());
                console.log("Refresh response in checkAuthentication:", refreshResponse);
                return refreshResponse.payload;
            }
            return thunkAPI.rejectWithValue(error.response?.data || 'Authentication check failed');
        }
    }
);

const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
        try {
            const response = await api.post(`/api/auth/logout`);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Logout failed');
        }
    }
);

const resetPasswordRequest = createAsyncThunk(
    'auth/resetPasswordRequest',
    async ({ email }: { email: string }, thunkAPI) => { 
        try {
            const response = await api.post(`/api/auth/password-reset-request`, 
                { email },
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Password reset request failed');
        }
    }
);

const validatePasswordResetLink = createAsyncThunk(
    'auth/validatePasswordResetLink',
    async ({ uid, token }: { uid: string; token: string }, thunkAPI) => {
        try {
            const response = await api.post(`/api/auth/validate-password-reset-link`, 
                { uid, token },
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Password reset link validation failed');
        }
    }
);

const resetPasswordConfirm = createAsyncThunk(
    'auth/resetPasswordConfirm',
    async ({ uid, token, newPassword }: { uid: string; token: string; newPassword: string }, thunkAPI) => {
        try {
            const response = await api.post(`/api/auth/password-reset-confirm`, 
                { uid, token, newPassword },
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Password reset confirmation failed');
        }
    }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        id: null,
        email: null,
        name: null,
        isAuthenticated: false,
        isAuthLoading: true,
        isLoading: false,
        tempEmail: null,
    } as AuthState,
    reducers: {
        setUserData(state, action) {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
        setTempEmail(state, action) {
            state.tempEmail = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state, action) => {
                state.tempEmail = action.meta.arg.email;
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tempEmail = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(verifyUserAccount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyUserAccount.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyUserAccount.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(signinUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true
                state.id = action.payload.data.user.id;
                state.email = action.payload.data.user.email;
                state.name = action.payload.data.user.name;
            })
            .addCase(signinUser.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(checkAuthentication.pending, (state) => {
                state.isAuthLoading = true;
            })
            .addCase(checkAuthentication.fulfilled, (state, action) => {
                state.isAuthLoading = false;
                console.log("sdfsfsdfs",action.payload)
                if(action.payload?.success == true) {
                    state.isAuthenticated = true;
                    state.id = action.payload?.data?.user.id || null;
                    state.email = action.payload?.data?.user.email || null;
                    state.name = action.payload?.data?.user.name || null;
                }
            })
            .addCase(checkAuthentication.rejected, (state) => {
                state.isAuthLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.id = null;
                state.email = null;
                state.name = null;
            });
    },
});

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["tempEmail"],
}


export const { setUserData, setTempEmail } = authSlice.actions;
export { signupUser, verifyUserAccount, signinUser, refreshToken, checkAuthentication, logoutUser, resetPasswordRequest, validatePasswordResetLink, resetPasswordConfirm };
export const authReducer = persistReducer(authPersistConfig, authSlice.reducer);