package com.krisztavasas.db_library.exception;

public class BookInActiveOrdersException extends RuntimeException {
    public BookInActiveOrdersException(String message) {
        super(message);
    }
}
