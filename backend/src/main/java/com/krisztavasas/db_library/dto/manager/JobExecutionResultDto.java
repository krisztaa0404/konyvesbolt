package com.krisztavasas.db_library.dto.manager;

import java.time.LocalDateTime;

public record JobExecutionResultDto(
    String jobName,
    String status,
    String message,
    LocalDateTime executedAt,
    Long durationMs
) {}
