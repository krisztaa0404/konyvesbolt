package com.krisztavasas.db_library.facade;

import com.krisztavasas.db_library.dto.manager.JobExecutionResultDto;
import com.krisztavasas.db_library.scheduler.MaterializedViewRefreshScheduler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobManagementFacade {

    private final MaterializedViewRefreshScheduler viewRefreshScheduler;

    public JobExecutionResultDto refreshBookRecommendations() {
        return executeJob(
            "book-recommendations",
            "Successfully refreshed book recommendations materialized view",
            viewRefreshScheduler::refreshBookRecommendations
        );
    }

    public JobExecutionResultDto refreshGenreStatistics() {
        return executeJob(
            "genre-statistics",
            "Successfully refreshed genre statistics materialized view",
            viewRefreshScheduler::refreshGenreStatistics
        );
    }

    public JobExecutionResultDto refreshTopBooksMonthly() {
        return executeJob(
            "top-books-monthly",
            "Successfully refreshed top books monthly materialized view",
            viewRefreshScheduler::refreshTopBooksMonthly
        );
    }

    public JobExecutionResultDto refreshTopBooksWeekly() {
        return executeJob(
            "top-books-weekly",
            "Successfully refreshed top books weekly materialized view",
            viewRefreshScheduler::refreshTopBooksWeekly
        );
    }

    private JobExecutionResultDto executeJob(String jobName, String successMessage, Runnable jobTask) {
        log.info("Manual trigger: {} job", jobName);
        long startTime = System.currentTimeMillis();
        LocalDateTime executedAt = LocalDateTime.now();

        jobTask.run();
        long duration = System.currentTimeMillis() - startTime;
        log.info("Manual job execution completed: {} in {}ms", jobName, duration);

        return new JobExecutionResultDto(
            jobName,
            "success",
            successMessage,
            executedAt,
            duration
        );
    }
}
