import { useState, useEffect, useLayoutEffect } from "react";
import { apiJson } from "../api/actionService";

function useShiftLogId() {
    const [shiftLogId, setShiftLogId] = useState<number | null>(null);

    useEffect(() => {
        let isCurrent = true;

        async function fetchShift() {
            const res = await apiJson("/shift/me", { method: "GET" });
            const { shiftLogId } = await res.json();

            if (isCurrent) {
                setShiftLogId(shiftLogId);
            }
        }

        fetchShift();

        return () => {
            isCurrent = false;
        };
    }, []);

    return shiftLogId;
}

export default useShiftLogId;
