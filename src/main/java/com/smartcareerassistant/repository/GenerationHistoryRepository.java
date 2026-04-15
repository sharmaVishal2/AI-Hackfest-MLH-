package com.smartcareerassistant.repository;

import com.smartcareerassistant.entity.GenerationHistory;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GenerationHistoryRepository extends MongoRepository<GenerationHistory, String> {

    List<GenerationHistory> findByUserIdOrderByTimestampDesc(String userId);
}
