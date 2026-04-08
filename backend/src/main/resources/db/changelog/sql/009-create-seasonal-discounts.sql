-- ==================================================================
-- Seasonal Discounts System
-- ==================================================================

-- ==================================================================
-- Table: seasonal_discounts (Szezonális kedvezmények)
-- ==================================================================
CREATE TABLE seasonal_discounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    percentage DECIMAL(5,2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
    valid_from TIMESTAMP NOT NULL,
    valid_to TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    scope_type VARCHAR(20) NOT NULL CHECK (scope_type IN ('SPECIFIC_BOOKS', 'ALL_BOOKS')),

    -- Usage limits
    max_usage_count INTEGER CHECK (max_usage_count IS NULL OR max_usage_count > 0),
    current_usage_count INTEGER DEFAULT 0 NOT NULL,
    minimum_order_amount DECIMAL(12,2) DEFAULT 0 NOT NULL CHECK (minimum_order_amount >= 0),

    -- Audit fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,

    -- Constraints
    CONSTRAINT check_date_range CHECK (valid_from < valid_to),
    CONSTRAINT check_usage_count CHECK (current_usage_count <= max_usage_count OR max_usage_count IS NULL)
);

-- Indexek a seasonal_discounts táblához
CREATE INDEX idx_seasonal_discounts_dates ON seasonal_discounts(valid_from, valid_to);
CREATE INDEX idx_seasonal_discounts_active ON seasonal_discounts(is_active, valid_from, valid_to);
CREATE INDEX idx_seasonal_discounts_scope_type ON seasonal_discounts(scope_type);
CREATE INDEX idx_seasonal_discounts_usage ON seasonal_discounts(max_usage_count, current_usage_count)
    WHERE max_usage_count IS NOT NULL;

-- ==================================================================
-- Table: discount_books (Kedvezmény - könyv kapcsolótábla)
-- ==================================================================
CREATE TABLE discount_books (
    discount_id UUID NOT NULL,
    book_id UUID NOT NULL,
    PRIMARY KEY (discount_id, book_id),
    FOREIGN KEY (discount_id) REFERENCES seasonal_discounts(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Indexek a discount_books táblához
CREATE INDEX idx_discount_books_book ON discount_books(book_id);
CREATE INDEX idx_discount_books_discount ON discount_books(discount_id);
