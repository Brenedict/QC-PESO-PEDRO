-- @param {DateTime} $1:startDate? 
-- @param {DateTime} $2:endDate? 
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
  AND "timeOut" IS NOT NULL
  AND "lastVerifiedAt" IS NOT NULL
  AND "lastVerifiedAt" >= "timeOut" 
AND (
    (
        ($1::timestamp IS NULL OR "timeIn" >= $1::timestamp)
        AND ($2::timestamp IS NULL OR "timeIn" <= $2::timestamp)
    ) OR 
    (
        ($1::timestamp IS NULL OR "timeOut" >= $1::timestamp)
        AND ($2::timestamp IS NULL OR "timeOut" <= $2::timestamp)
    )
);

