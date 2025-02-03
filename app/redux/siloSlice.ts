import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mockSilos, Silo } from "@/app/data/mockData";

type SiloState = {
  silos: Silo[];
};

const initialState: SiloState = {
  silos: JSON.parse(JSON.stringify(mockSilos)),
};

export const siloSlice = createSlice({
  name: "silo",
  initialState,
  reducers: {
    reserveSilo: (state, { payload }: PayloadAction<number>) => {
      const silo = state.silos.find((s) => s.id === payload);
      if (silo && silo.status === "free") {
        silo.status = "reserved";
        silo.remaining_time = 2;
      }
    },
    freeSilo: (state, { payload }: PayloadAction<number>) => {
      const silo = state.silos.find((s) => s.id === payload);
      if (silo && silo.status === "reserved") {
        silo.status = "free";
        silo.remaining_time = 2;
      }
    },
    updateTimer: (state) => {
      state.silos.forEach((silo) => {
        if (silo.status === "reserved" && silo.remaining_time > 0) {
          silo.remaining_time -= 1;
        }
      });
    },
    updateFreeTimers: (state) => {
      state.silos.forEach((silo) => {
        if (silo.status === "free" && silo.remaining_time > 1) {
          if (Math.random() > 0.8) {
            silo.remaining_time -= 1;
          }
        }
      });
    },
  },
});

export const { reserveSilo, freeSilo, updateTimer, updateFreeTimers } = siloSlice.actions;
export default siloSlice.reducer;
