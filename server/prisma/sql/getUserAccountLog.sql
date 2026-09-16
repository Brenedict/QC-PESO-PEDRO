-- @param {DateTime} $1:startDate?
-- @param {DateTime} $2:endDate?
-- @param {Role} $3:role?
-- @param {Status} $4:status?
-- @param {String} $5:search?
SELECT
      account."id",
      account."fullName",
      account."role",
      COUNT(accountLog."logOut")::int AS "loginCount",
      MAX(accountLog."logOut") AS "lastLogin",
      account."status"
FROM "User" account
LEFT JOIN "AccountLog" accountLog ON
  account."id" = accountLog."userId"
  AND ($1::timestamp IS NULL OR accountLog."logIn" >= $1::timestamp)
  AND ($2::timestamp IS NULL OR accountLog."logIn" <= $2::timestamp)
WHERE ($3::"Role" IS NULL OR account."role" = $3::"Role")
  AND ($4::"Status" IS NULL OR account."status" = $4::"Status")
  AND ($5::text IS NULL OR account."fullName" ILIKE '%' || $5::text || '%')
GROUP BY account."id"
ORDER BY account."fullName" ASC;
