package com.krisztavasas.db_library.dto.book;

import java.util.List;

public record BulkBookUploadResultDto(
        int totalRows,
        int successCount,
        int skippedCount,
        String message,
        List<SkippedRowDto> skippedRows
) {
    public record SkippedRowDto(
            int rowNumber,
            String bookTitle,
            String isbn,
            String reason,
            List<String> missingGenres,
            List<String> validationErrors
    ) {}
}
