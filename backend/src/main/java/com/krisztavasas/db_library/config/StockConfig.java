package com.krisztavasas.db_library.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app.stock")
@Getter
@Setter
public class StockConfig {
    private int lowThreshold = 5;
}