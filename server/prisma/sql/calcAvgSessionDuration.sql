
-- @param {DateTime} $1:startDate? 
-- @param {DateTime} $2:endDate? 
SELECT
  COALESCE(
      AVG(
          EXTRACT(EPOCH FROM ("logOut" - "logIn"))
      ),
      0
  ) AS "averageSeconds"
FROM "AccountLog"
WHERE ($1::timestamp IS NULL OR "logIn" >= $1::timestamp)
AND ($2::timestamp IS NULL OR "logIn" <= $2::timestamp)
AND "logOut" IS NOT NULL;

