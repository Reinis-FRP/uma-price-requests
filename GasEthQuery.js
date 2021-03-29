// This is a helper method to create a GASETH BQ query with time arguments.
function createQuery(earlierTimeBound, laterTimeBound) {
  const query = `
  WITH
    sorted AS(
    SELECT
      gas_price,
      SUM(CAST(receipt_gas_used AS NUMERIC)) OVER(ORDER BY gas_price) AS gas_until
    FROM
      \`bigquery-public-data.crypto_ethereum.transactions\`
    WHERE
      block_timestamp >= TIMESTAMP('${earlierTimeBound}', 'UTC')
      AND block_timestamp < TIMESTAMP('${laterTimeBound}', 'UTC') ),
    sorted_and_weighted AS (
    SELECT
      gas_price,
      gas_until,
      gas_until / (
      SELECT
        gas_until / (
      FROM
        sorted
      ORDER BY
        gas_until DESC
      LIMIT
        1) AS gas_until_percentage
    FROM
      sorted )
  SELECT
    *
  FROM
    sorted_and_weighted
  WHERE
    gas_until_percentage > 0.5
  ORDER BY
    gas_until_percentage ASC
  LIMIT 1;
  `;

  return query;
}

module.exports = {
  createQuery
};
