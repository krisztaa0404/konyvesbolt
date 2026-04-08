-- ==================================================================
-- Add applied_discount_id to orders table for audit trail
-- ==================================================================

-- Add column to main orders table
ALTER TABLE orders
ADD COLUMN applied_discount_id UUID;

-- Add column to audit table (Hibernate Envers)
ALTER TABLE orders_aud
ADD COLUMN applied_discount_id UUID;

-- Add foreign key constraint to main table
ALTER TABLE orders
ADD CONSTRAINT fk_orders_applied_discount
FOREIGN KEY (applied_discount_id)
REFERENCES seasonal_discounts(id)
ON DELETE SET NULL;

-- Add index for querying orders by discount
CREATE INDEX idx_orders_applied_discount ON orders(applied_discount_id);

-- Add comments for documentation
COMMENT ON COLUMN orders.applied_discount_id IS 'The seasonal discount that was applied to this order, if any. NULL means loyalty discount or no discount was applied.';
COMMENT ON COLUMN orders_aud.applied_discount_id IS 'Audit trail: The seasonal discount that was applied to this order at the time of the audit record.';
