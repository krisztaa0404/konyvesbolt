package com.krisztavasas.db_library.scheduler;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class MaterializedViewRefreshScheduler {

    private final JdbcTemplate jdbcTemplate;

    @Scheduled(cron = "${app.scheduler.mv-book-recommendations}")
    public void refreshBookRecommendations() {
        log.info("Refreshing materialized view: mv_book_recommendations");
        try {
            jdbcTemplate.execute("REFRESH MATERIALIZED VIEW CONCURRENTLY mv_book_recommendations");
            log.info("Successfully refreshed mv_book_recommendations");
        } catch (Exception e) {
            log.error("Failed to refresh mv_book_recommendations", e);
        }
    }

    @Scheduled(cron = "${app.scheduler.mv-genre-statistics}")
    public void refreshGenreStatistics() {
        log.info("Refreshing materialized view: mv_genre_statistics");
        try {
            jdbcTemplate.execute("REFRESH MATERIALIZED VIEW CONCURRENTLY mv_genre_statistics");
            log.info("Successfully refreshed mv_genre_statistics");
        } catch (Exception e) {
            log.error("Failed to refresh mv_genre_statistics", e);
        }
    }

    @Scheduled(cron = "${app.scheduler.mv-top-books-monthly}")
    public void refreshTopBooksMonthly() {
        log.info("Refreshing materialized view: mv_top_books_monthly");
        try {
            jdbcTemplate.execute("REFRESH MATERIALIZED VIEW CONCURRENTLY mv_top_books_monthly");
            log.info("Successfully refreshed mv_top_books_monthly");
        } catch (Exception e) {
            log.error("Failed to refresh mv_top_books_monthly", e);
        }
    }

    @Scheduled(cron = "${app.scheduler.mv-top-books-weekly}")
    public void refreshTopBooksWeekly() {
        log.info("Refreshing materialized view: mv_top_books_weekly");
        try {
            jdbcTemplate.execute("REFRESH MATERIALIZED VIEW CONCURRENTLY mv_top_books_weekly");
            log.info("Successfully refreshed mv_top_books_weekly");
        } catch (Exception e) {
            log.error("Failed to refresh mv_top_books_weekly", e);
        }
    }
}
