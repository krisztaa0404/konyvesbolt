-- ==================================================================
-- Create Audit Table for order_items
-- ==================================================================
-- Hibernate Envers requires this table since OrderItem entity is @Audited

CREATE TABLE order_items_aud (
    id UUID NOT NULL,
    rev INTEGER NOT NULL,
    revtype SMALLINT,
    order_id UUID,
    book_id UUID,
    format VARCHAR(20),
    quantity INTEGER,
    unit_price DECIMAL(12,2),
    subtotal DECIMAL(12,2),
    PRIMARY KEY (id, rev),
    FOREIGN KEY (rev) REFERENCES revinfo(rev)
);

-- Create index for efficient audit queries
CREATE INDEX idx_order_items_aud_rev ON order_items_aud(rev);
CREATE INDEX idx_order_items_aud_id ON order_items_aud(id);
