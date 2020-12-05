package webalk.assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import webalk.assignment.model.Dvd;
import webalk.assignment.service.DvdService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DvdController {
    private final DvdService service;

    @Autowired
    public DvdController(DvdService service) {
        this.service = service;
    }

    @GetMapping("/list")
    public List<Dvd> getAllDvd() {
        return service.getAllDvd();
    }

    @PostMapping("/insert")
    private Long insertDvd(@RequestBody Dvd dvd) {
        service.addDvd(dvd);
        return dvd.getId();
    }

    @GetMapping("/finddvd/{id}")
    private Dvd getDvd(@PathVariable long id) {
        return service.getDvdById(id);
    }

    @DeleteMapping("/delete/{id}")
    private void deleteDvd(@PathVariable long id) {
        service.deleteDvd(id);
    }


    @GetMapping("/hello")
    public String hello() {
        return "Hello Sir!";
    }
}
