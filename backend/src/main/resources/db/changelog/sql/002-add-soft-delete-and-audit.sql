-- ==================================================================
-- Bookshop Database Schema - Soft Delete and Audit Support
-- ==================================================================

-- ==================================================================
-- 1. Add soft delete to Users table
-- ==================================================================
ALTER TABLE users ADD COLUMN deleted_at TIMESTAMP DEFAULT NULL;

-- Index for soft delete queries
CREATE INDEX idx_users_deleted_at ON users(deleted_at);

-- ==================================================================
-- 2. Hibernate Envers - Revision Info Table
-- ==================================================================
CREATE SEQUENCE revinfo_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE revinfo (
    rev INTEGER PRIMARY KEY DEFAULT nextval('revinfo_seq'),
    revtstmp BIGINT NOT NULL
);

-- ==================================================================
-- 3. Hibernate Envers - Orders Audit Table
-- ==================================================================
CREATE TABLE orders_aud (
    id UUID NOT NULL,
    rev INTEGER NOT NULL,
    revtype SMALLINT,
    external_id BIGINT,
    user_id UUID,
    order_date TIMESTAMP,
    total_amount DECIMAL(12,2),
    discount_amount DECIMAL(12,2),
    status VARCHAR(20),
    shipping_address JSONB,
    payment_info JSONB,
    updated_at TIMESTAMP,
    PRIMARY KEY (id, rev),
    FOREIGN KEY (rev) REFERENCES revinfo(rev)
);

-- Index for audit queries
CREATE INDEX idx_orders_aud_rev ON orders_aud(rev);
CREATE INDEX idx_orders_aud_id ON orders_aud(id);
