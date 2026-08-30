SELECT 
    COALESCE(
        AVG(
            EXTRACT(
                EPOCH FROM ("lastVerifiedAt" - "timeOut")
            )
        ),
        0
    ) AS "averageSeconds"
FROM "ShiftLog"
WHERE "status" = 'APPROVED'
  AND "timeIn" >= $1
  AND "timeIn" <= $2
  AND "timeOut" IS NOT NULL
  AND "lastVerifiedAt" IS NOT NULL
  AND "lastVerifiedAt" >= "timeOut";

