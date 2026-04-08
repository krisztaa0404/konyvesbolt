package com.krisztavasas.db_library;

import com.krisztavasas.db_library.config.TestcontainersConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import(TestcontainersConfig.class)
class DbLibraryApplicationTests {

	@Test
	void contextLoads() {
	}

}
