import * as z from 'zod';
export const TransactionDeleteManyResultSchema = z.object({
  count: z.number()
});