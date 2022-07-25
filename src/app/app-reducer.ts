import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"


// thunks
export const initializeAppTC = createAsyncThunk("app/initialize", async (params, {dispatch}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    const res = await authAPI.me();
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: "succeeded"}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    }
});


const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false
    } as initialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(initializeAppTC.fulfilled, (state) => {
            state.isInitialized = true;
        });
    }
});

export const appReducer = slice.reducer;
export const {setAppErrorAC, setAppStatusAC} = slice.actions;

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>




