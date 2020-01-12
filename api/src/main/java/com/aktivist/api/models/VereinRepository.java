package com.aktivist.api.models;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VereinRepository extends CrudRepository<Verein, Long> {

    Optional<Verein> findByEmailIgnoreCase(String username);

}
