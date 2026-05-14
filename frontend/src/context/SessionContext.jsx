import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [draftAnswers, setDraftAnswers] = useLocalStorage("fbai_answers_draft", null);
  const [lastSessionId, setLastSessionId] = useLocalStorage("fbai_last_session_id", null);

  const value = useMemo(
    () => ({
      draftAnswers,
      setDraftAnswers,
      lastSessionId,
      setLastSessionId
    }),
    [draftAnswers, lastSessionId, setDraftAnswers, setLastSessionId]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}

