SELECT
    DATE_TRUNC($1, "createdAt") AS bucket,
    CASE $2
        WHEN 'applicantFullName' THEN "applicantFullName"::text
        WHEN 'applicantSex' THEN "applicantSex"::text
        WHEN 'transactionType' THEN "transactionType"::text
        WHEN 'transactionOutcome' THEN "transactionOutcome"::text
        WHEN 'demographics' THEN demographic::text
    END AS "groupValue",
    COUNT(*) AS count
FROM "Transaction"

LEFT JOIN LATERAL (
    SELECT unnest("Transaction"."demographics") AS demographic

) d ON $2 = 'demographics'
WHERE "createdAt" >= $3 AND "createdAt" < $4
  AND (
      NULLIF($5, '')::"TransactionType" IS NULL
      OR "transactionType" = NULLIF($5, '')::"TransactionType"
  )
  AND (
      NULLIF($6, '')::"Outcome" IS NULL
      OR "transactionOutcome" = NULLIF($6, '')::"Outcome"
  )
  AND (
      NULLIF($7, '')::"Demographic" IS NULL
      OR NULLIF($7, '')::"Demographic" = ANY("demographics")
  )
GROUP BY bucket, "groupValue"
ORDER BY bucket
