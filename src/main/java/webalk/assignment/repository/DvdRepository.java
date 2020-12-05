package webalk.assignment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import webalk.assignment.model.Dvd;

public interface DvdRepository extends JpaRepository<Dvd, Long> {
}
