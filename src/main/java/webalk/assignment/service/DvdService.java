package webalk.assignment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import webalk.assignment.model.Dvd;
import webalk.assignment.repository.DvdRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class DvdService {
    private final DvdRepository repo;

    @Autowired
    public DvdService(DvdRepository repo) {
        this.repo = repo;
    }

    public List<Dvd> getAllDvd() {
        List <Dvd> dvds = new ArrayList<Dvd>();
        repo.findAll().forEach(dvd -> dvds.add(dvd));
        return dvds;
    }

    public void addDvd(Dvd dvd){
        repo.save(dvd);
    }

    public Dvd getDvdById(long id){
        return repo.findById(id).get();
    }

    public void delete(long id){
        repo.deleteById(id);
    }

}
