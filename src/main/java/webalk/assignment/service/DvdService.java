package webalk.assignment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webalk.assignment.repository.DvdRepository;

@Service
public class DvdService {
    private final DvdRepository repo;

    @Autowired
    public DvdService(DvdRepository repo) {
        this.repo = repo;
    }

    public void delete(long id){
        repo.deleteById(id);
    }

}
