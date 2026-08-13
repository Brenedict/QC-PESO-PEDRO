import * as z from 'zod';
import type { Prisma } from '../../../../shared/prisma/browser';
import { ShiftLogScalarWhereInputObjectSchema as ShiftLogScalarWhereInputObjectSchema } from './ShiftLogScalarWhereInput.schema';
import { ShiftLogUpdateManyMutationInputObjectSchema as ShiftLogUpdateManyMutationInputObjectSchema } from './ShiftLogUpdateManyMutationInput.schema';
import { ShiftLogUncheckedUpdateManyWithoutUserInputObjectSchema as ShiftLogUncheckedUpdateManyWithoutUserInputObjectSchema } from './ShiftLogUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ShiftLogScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => ShiftLogUpdateManyMutationInputObjectSchema), z.lazy(() => ShiftLogUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const ShiftLogUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.ShiftLogUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ShiftLogUpdateManyWithWhereWithoutUserInput>;
export const ShiftLogUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
