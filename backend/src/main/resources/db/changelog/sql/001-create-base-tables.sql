-- ==================================================================
-- Bookshop Database Schema - Base Tables
-- ==================================================================

-- ==================================================================
-- Table: users (Felhasználók)
-- ==================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id BIGSERIAL UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    is_loyalty_member BOOLEAN DEFAULT FALSE,
    loyalty_discount_percent DECIMAL(5,2) DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    address_data JSONB,
    preferences JSONB
);

-- Indexek a users táblához
CREATE INDEX idx_users_external_id ON users(external_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_loyalty ON users(is_loyalty_member);
CREATE INDEX idx_users_address_data ON users USING GIN(address_data);

-- ==================================================================
-- Table: genres (Műfajok)
-- ==================================================================
CREATE TABLE genres (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id BIGSERIAL UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

-- Indexek a genres táblához
CREATE INDEX idx_genres_external_id ON genres(external_id);
CREATE INDEX idx_genres_name ON genres(name);

-- ==================================================================
-- Table: books (Könyvek)
-- ==================================================================
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id BIGSERIAL UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    publisher VARCHAR(255) NOT NULL,
    publication_year INTEGER,
    pages INTEGER,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    description TEXT,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    sales_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    authors TEXT[],
    tags TEXT[],
    available_formats TEXT[] NOT NULL,
    metadata JSONB
);

-- Indexek a books táblához
CREATE INDEX idx_books_external_id ON books(external_id);
CREATE INDEX idx_books_price ON books(price);
CREATE INDEX idx_books_isbn ON books(isbn);
CREATE INDEX idx_books_publication_year ON books(publication_year DESC);
CREATE INDEX idx_books_title ON books USING GIN(to_tsvector('hungarian', title));
CREATE INDEX idx_books_sales ON books(sales_count DESC);
CREATE INDEX idx_books_stock ON books(stock_quantity);

-- Array indexek (GIN index array kereséshez)
CREATE INDEX idx_books_authors ON books USING GIN(authors);
CREATE INDEX idx_books_tags ON books USING GIN(tags);
CREATE INDEX idx_books_available_formats ON books USING GIN(available_formats);

-- JSONB index
CREATE INDEX idx_books_metadata ON books USING GIN(metadata);

-- ==================================================================
-- Table: book_genres (Könyv-műfaj kapcsolótábla)
-- ==================================================================
CREATE TABLE book_genres (
    book_id UUID NOT NULL,
    genre_id UUID NOT NULL,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- Indexek a book_genres táblához
CREATE INDEX idx_book_genres_book ON book_genres(book_id);
CREATE INDEX idx_book_genres_genre ON book_genres(genre_id);

-- ==================================================================
-- Table: orders (Rendelések)
-- ==================================================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id BIGSERIAL UNIQUE NOT NULL,
    user_id UUID NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(12,2) NOT NULL CHECK (total_amount >= 0),
    discount_amount DECIMAL(12,2) DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED')),
    shipping_address JSONB NOT NULL,
    payment_info JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexek az orders táblához
CREATE INDEX idx_orders_external_id ON orders(external_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_date ON orders(order_date DESC);
CREATE INDEX idx_orders_status ON orders(status);

-- ==================================================================
-- Table: order_items (Rendelési tételek)
-- ==================================================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL,
    book_id UUID NOT NULL,
    format VARCHAR(20) NOT NULL CHECK (format IN ('physical', 'ebook', 'audiobook')),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Indexek az order_items táblához
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_book ON order_items(book_id);
CREATE INDEX idx_order_items_format ON order_items(format);
