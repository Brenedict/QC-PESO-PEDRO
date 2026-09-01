// General Imports
import env from "../config/env.config";

// -----------------------------  TYPES -----------------------------------------------

interface OllamaChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

interface OllamaChatResponse {
    message: { role: string; content: string };
    done: boolean;
}

// ----------------------------- PUBLIC FUNCTIONS --------------------------------------------------
export default {
    /**
     * Sends a chat request to a local Ollama instance and returns the model's reply.
     * Throws if Ollama is unreachable or responds with a non-2xx status, so callers
     * (the controller) decide how to surface that to the client.
     */
    async chat(messages: OllamaChatMessage[], options?: { model?: string; timeoutMs?: number }): Promise<string> {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), options?.timeoutMs ?? 90_000);

        try {
            const res = await fetch(`${process.env.OLLAMA_BASE_URL}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: options?.model ?? process.env.OLLAMA_MODEL,
                    messages,
                    stream: false,
                }),
                signal: controller.signal,
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`Ollama request failed (${res.status}): ${text || res.statusText}`);
            }

            const data = (await res.json()) as OllamaChatResponse;
            return data.message?.content ?? "";
        } finally {
            clearTimeout(timeout);
        }
    },

    /**
     * Builds the system + user messages for narrating a resolved analytics payload,
     * then sends it through `chat`. Keeps prompt-shaping out of the controller.
     */
    async generateAnalyticsInsight(analytics: unknown, focus?: string): Promise<string> {
        const messages: OllamaChatMessage[] = [
            {
                role: "system",
                content:
                    "You are a data analyst for a PESO (Public Employment Service Office) operations " +
                    "dashboard. You are given pre-aggregated JSON analytics — counts, groupings, and " +
                    "time-series buckets. Summarize the notable trends, spikes, or drop-offs in 3-5 " +
                    "concise sentences. Do not invent numbers that are not present in the data.",
            },
            {
                role: "user",
                content: focus
                    ? `Focus specifically on: ${focus}\n\nAnalytics data:\n${JSON.stringify(analytics)}`
                    : `Analytics data:\n${JSON.stringify(analytics)}`,
            },
        ];

        return this.chat(messages);
    },
};
