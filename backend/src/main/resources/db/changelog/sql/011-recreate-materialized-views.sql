-- Recreate materialized views with deleted_at timestamp column instead of deleted boolean

CREATE MATERIALIZED VIEW mv_genre_statistics AS
SELECT
    g.id AS genre_id,
    g.name AS genre_name,
    g.description,
    COUNT(DISTINCT b.id) AS book_count,
    COALESCE(AVG(b.price), 0) AS avg_price,
    COALESCE(SUM(b.sales_count), 0) AS total_sales
FROM genres g
LEFT JOIN book_genres bg ON g.id = bg.genre_id
LEFT JOIN books b ON bg.book_id = b.id AND b.deleted_at IS NULL
GROUP BY g.id, g.name, g.description;

CREATE UNIQUE INDEX idx_mv_genre_stats_id ON mv_genre_statistics(genre_id);

CREATE MATERIALIZED VIEW mv_top_books_weekly AS
SELECT
    b.id,
    b.title,
    b.authors,
    b.price,
    b.isbn,
    (b.metadata->>'cover_image_url') AS cover_image_url,
    b.stock_quantity,
    b.sales_count,
    COUNT(oi.id) AS order_count,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.subtotal) AS total_revenue
FROM books b
INNER JOIN order_items oi ON b.id = oi.book_id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '7 days'
  AND o.status NOT IN ('CANCELLED')
  AND b.deleted_at IS NULL
GROUP BY b.id, b.title, b.authors, b.price, b.isbn, b.metadata, b.stock_quantity, b.sales_count
ORDER BY units_sold DESC
LIMIT 100;

CREATE UNIQUE INDEX idx_mv_top_weekly_id ON mv_top_books_weekly(id);

CREATE MATERIALIZED VIEW mv_top_books_monthly AS
SELECT
    b.id,
    b.title,
    b.authors,
    b.price,
    b.isbn,
    (b.metadata->>'cover_image_url') AS cover_image_url,
    b.stock_quantity,
    b.sales_count,
    COUNT(oi.id) AS order_count,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.subtotal) AS total_revenue
FROM books b
INNER JOIN order_items oi ON b.id = oi.book_id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
  AND o.status NOT IN ('CANCELLED')
  AND b.deleted_at IS NULL
GROUP BY b.id, b.title, b.authors, b.price, b.isbn, b.metadata, b.stock_quantity, b.sales_count
ORDER BY units_sold DESC
LIMIT 100;

CREATE UNIQUE INDEX idx_mv_top_monthly_id ON mv_top_books_monthly(id);

CREATE MATERIALIZED VIEW mv_book_recommendations AS
SELECT
    oi1.book_id AS book_id,
    oi2.book_id AS recommended_book_id,
    COUNT(DISTINCT oi1.order_id) AS co_purchase_count
FROM order_items oi1
INNER JOIN order_items oi2 ON oi1.order_id = oi2.order_id
    AND oi1.book_id <> oi2.book_id
INNER JOIN books b1 ON oi1.book_id = b1.id
INNER JOIN books b2 ON oi2.book_id = b2.id
WHERE b1.deleted_at IS NULL AND b2.deleted_at IS NULL
GROUP BY oi1.book_id, oi2.book_id;

CREATE INDEX idx_mv_recommendations_book_id ON mv_book_recommendations(book_id, co_purchase_count DESC);
CREATE INDEX idx_mv_recommendations_recommended_id ON mv_book_recommendations(recommended_book_id);
