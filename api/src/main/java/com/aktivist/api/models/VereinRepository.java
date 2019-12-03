package com.aktivist.api.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VereinRepository extends CrudRepository<Verein, Long> {

}
