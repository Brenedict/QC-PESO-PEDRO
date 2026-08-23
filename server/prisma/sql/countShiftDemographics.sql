SELECT
    unnest(demographics) AS demographic,
    COUNT(*) AS count
FROM "Transaction"
WHERE "shiftLogId" = $1
GROUP BY "demographic";
