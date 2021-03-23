WITH
  cum_gas AS(
    SELECT
      CAST(gas_price AS int64) AS gas_price,
      CAST(SUM(gas_used) OVER (ORDER BY gas_price) AS int64) AS cum_sum
    FROM (
      SELECT
        CAST(gas_price AS int64) AS gas_price,
        CAST(SUM(receipt_gas_used) AS int64) AS gas_used
      FROM
        `bigquery-public-data.crypto_ethereum.transactions`
      WHERE block_timestamp
      BETWEEN TIMESTAMP('2021-01-02 00:00:00', 'UTC')
      AND TIMESTAMP('2021-02-01 00:00:00', 'UTC')
      GROUP BY
        gas_price)),
  halfway AS (
      SELECT
        CAST(DIV(MAX(cum_sum),2) AS int64) AS halfway
      FROM cum_gas)
SELECT
  cum_sum,
  gas_price
FROM cum_gas, halfway
WHERE
  cum_sum > halfway.halfway
ORDER BY
  gas_price
LIMIT 1;
