import * as z from 'zod';
export const TransactionCreateManyResultSchema = z.object({
  count: z.number()
});