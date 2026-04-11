package com.example.backend;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@Disabled("PostgreSQL is not running in the pipeline/test environment yet")
@SpringBootTest
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
