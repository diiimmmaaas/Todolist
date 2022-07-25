import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


export const fetchTodolistsTC = createAsyncThunk("todolist/fetchTodolist", async (param, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    try {
        const res = await todolistsAPI.getTodolists();
        dispatch(setAppStatusAC({status: "succeeded"}));
        return {todolists: res.data};
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});
export const removeTodolistTC = createAsyncThunk("todolist/removeTodolist", async (param: { todolistId: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    dispatch(changeTodolistEntityStatusAC({id: param.todolistId, status: "loading"}));
    const res = await todolistsAPI.deleteTodolist(param.todolistId);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}));
            return {id: param.todolistId};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});
export const addTodolistTC = createAsyncThunk("todolist/addTodolist", async (param: { title: string }, {
    dispatch,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: "loading"}));
    const res = await todolistsAPI.createTodolist(param.title);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatusAC({status: "succeeded"}));
            return {todolist: res.data.data.item};
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});
export const changeTodolistTitleTC = createAsyncThunk("todolist/changeTodolist", async (param: { id: string, title: string }, {
    dispatch,
    rejectWithValue
}) => {
    const res = await todolistsAPI.updateTodolist(param.id, param.title);
    try {
        if (res.data.resultCode === 0) {
            return param;
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return rejectWithValue(null);
    }
});


const slice = createSlice({
    name: "todolist",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].entityStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}));
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            if (index > 1) {
                state.splice(index, 1);
            }
        });
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"});
        });
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id);
            state[index].title = action.payload.title;
        });
    }
});


export const todolistsReducer = slice.reducer;
export const {
    changeTodolistFilterAC, changeTodolistEntityStatusAC
} = slice.actions;


// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
