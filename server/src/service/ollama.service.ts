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

interface OllamaOptions {
    model?: string;
    timeoutMs?: number;
    format?: string | Record<string, unknown>;
    temperature?: number;
}

// ----------------------------- PUBLIC FUNCTIONS --------------------------------------------------
export default {
    /**
     * Sends a chat request to a local Ollama instance and returns the model's reply.
     * Throws if Ollama is unreachable or responds with a non-2xx status, so callers
     * (the controller) decide how to surface that to the client.
     */
    async chat(messages: OllamaChatMessage[], options?: OllamaOptions): Promise<string> {
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
                    ...(options?.format !== undefined && { format: options.format }),
                    ...(options?.temperature !== undefined && {
                        options: { temperature: options.temperature },
                    }),
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
    async generateAnalyticsInsight(analytics: unknown, focus: Record<string, string>): Promise<Record<string, string>> {
        const labels = Object.keys(focus);
        const focusPrompts = Object.entries(focus)
            .map(([label, desc]) => `- ${label}: ${desc}`)
            .join("\n");

        const schema = {
            type: "object",
            properties: Object.fromEntries(
                labels.map((label) => [
                    label,
                    {
                        type: "string",
                        description:
                            "2-4 sentence plain-text paragraph. No heading, no title, no label, no markdown — starts directly with a sentence about the data.",
                    },
                ])
            ),
            required: labels,
            additionalProperties: false,
        };

        const messages: OllamaChatMessage[] = [
            {
                role: "system",
                content:
                    "You are a data analyst for a PESO (Public Employment Service Office) operations " +
                    "dashboard. You are given pre-aggregated JSON analytics where 'current' means this " +
                    "month and 'previous' means last month.\n" +
                    "\n" +
                    "The reader already sees the raw numbers in a chart next to your text — do NOT " +
                    "restate every figure. Your job is interpretation, not transcription. A bad insight " +
                    "just lists counts in sentence form. A good insight tells the reader something they " +
                    "couldn't see at a glance: which category is over- or under-performing relative to " +
                    "the others, what proportion or rate that represents, whether it's a good or bad " +
                    "sign operationally, and what it might mean for staffing, process, or follow-up.\n" +
                    "\n" +
                    "For each focus area, write exactly ONE paragraph (2-4 sentences) that:\n" +
                    "- Leads with the single most notable comparison or standout figure — not the totals.\n" +
                    "- Uses a derived ratio or rate (e.g. 'roughly 1 in 3', '41% of walk-ins') rather than " +
                    "  two raw counts side by side, when it strengthens the point.\n" +
                    "- States the operational implication — is this good, concerning, worth investigating?\n" +
                    "- Only cites raw counts when the number itself IS the insight (e.g. a stat that was " +
                    "  zero last month and isn't now).\n" +
                    "- Rewrites snake_case or ALL_CAPS keys into human-readable labels.\n" +
                    "- Starts directly with a sentence about the data — never a heading, bold label, " +
                    "  restated focus name, or bullet point.\n" +
                    "- References 'this month' / 'last month' only when the comparison itself is the point.\n" +
                    "- Never invents numbers not present in the data.\n" +
                    "- Do not overcomplicate concepts, use common words instead.\n" +
                    "\n" +
                    "Respond only with a JSON object matching the given schema — no other text.",
            },
            {
                role: "user",
                content: `Focus areas:\n${focusPrompts}\n\nAnalytics data:\n${JSON.stringify(analytics)}`,
            },
        ];

        const raw = await this.chat(messages, { format: schema, temperature: 0 });

        let parsed: Record<string, string>;
        try {
            parsed = JSON.parse(raw);
        } catch {
            throw new Error(`Model returned invalid JSON for analytics insight: ${raw.slice(0, 200)}`);
        }

        const result: Record<string, string> = {};
        for (const label of labels) {
            result[label] = (parsed[label] ?? "").trim();
        }
        return result;
    },
};
