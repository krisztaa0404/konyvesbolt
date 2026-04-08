package com.krisztavasas.db_library.controller;

import com.krisztavasas.db_library.dto.manager.DashboardMetricsDto;
import com.krisztavasas.db_library.facade.DashboardFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final DashboardFacade dashboardFacade;

    @GetMapping("/dashboard/metrics")
    @PreAuthorize("hasAnyRole('MANAGER', 'ADMIN')")
    public DashboardMetricsDto getMetrics() {
        return dashboardFacade.getMetrics();
    }
}
