package webalk.assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import webalk.assignment.service.DvdService;

@RestController
@RequestMapping("/api")
public class DvdController {
    private final DvdService service;

    @Autowired
    public DvdController(DvdService service) {
        this.service = service;
    }

    @GetMapping("/dvd/{id}")
    private void getDvd(@PathVariable("id") long id){
        service.delete(id);
    }


    @GetMapping("/hello")
    public String hello(){
        return "Hello Sir!";
    }
}
