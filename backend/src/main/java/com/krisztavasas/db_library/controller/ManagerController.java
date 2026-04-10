package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.manager.DashboardMetricsDto;
import com.krisztavasas.db_library.dto.manager.JobExecutionResultDto;
import com.krisztavasas.db_library.facade.DashboardFacade;
import com.krisztavasas.db_library.facade.JobManagementFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final DashboardFacade dashboardFacade;
    private final JobManagementFacade jobManagementFacade;

    @GetMapping("/dashboard/metrics")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public DashboardMetricsDto getMetrics() {
        return dashboardFacade.getMetrics();
    }

    @PostMapping("/jobs/refresh/book-recommendations")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public JobExecutionResultDto refreshBookRecommendations() {
        return jobManagementFacade.refreshBookRecommendations();
    }

    @PostMapping("/jobs/refresh/genre-statistics")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public JobExecutionResultDto refreshGenreStatistics() {
        return jobManagementFacade.refreshGenreStatistics();
    }

    @PostMapping("/jobs/refresh/top-books-monthly")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public JobExecutionResultDto refreshTopBooksMonthly() {
        return jobManagementFacade.refreshTopBooksMonthly();
    }

    @PostMapping("/jobs/refresh/top-books-weekly")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public JobExecutionResultDto refreshTopBooksWeekly() {
        return jobManagementFacade.refreshTopBooksWeekly();
    }
}
