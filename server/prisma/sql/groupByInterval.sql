SELECT DATE_TRUNC($1, "createdAt") AS bucket,
    COUNT(*) AS count
FROM "Transaction"
WHERE "createdAt" >= $2 AND "createdAt" < $3
  AND (
      NULLIF($4, '')::"TransactionType" IS NULL
      OR "transactionType" = NULLIF($4, '')::"TransactionType"
  )

  AND (
      NULLIF($5, '')::"Outcome" IS NULL
      OR "transactionOutcome" = NULLIF($5, '')::"Outcome"
  )

  AND (
      NULLIF($6, '')::"Demographic" IS NULL
      OR NULLIF($6, '')::"Demographic" = ANY("demographics")
  )
GROUP BY bucket
ORDER BY bucket
